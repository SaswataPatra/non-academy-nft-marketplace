// SPDX-License-Identifier: MIT
pragma solidity <=0.8.19;
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
contract NftMarketplace is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _listedItems;
    mapping(string => bool) private _usedTokenURIs;


    address payable owner;
    uint256 _listingPrice = 0.001 ether;

    constructor() ERC721("NftMarketplace", "NFM") {
        owner = payable(msg.sender);
    }

    struct ListedToken {   
        uint256 tokenId;
        uint256 price;
        address payable owner;
        address payable seller;
        bool currentlyListed;
    }
    event TokenListedSuccess(
        uint256 indexed tokenId,
        address owner,
        address seller,
        uint256 price,
        bool currentlyListed
    );

    mapping(uint256=>ListedToken) private idToListedToken;


  function getNftItem(uint tokenId) public view returns (ListedToken memory) {
    return idToListedToken[tokenId];
  }

    function updateListedPrice(uint256 _listPrice)public{
        require(msg.sender == owner,"Only owners can update listing price");
        _listingPrice = _listPrice;
    }

    function getListPrice() public view returns(uint256){
        return _listingPrice;   
    }

    function getLatestToIdToken() public view returns(ListedToken memory){
        uint256 currentId = _tokenIds.current();
        return idToListedToken[currentId];
    }

  function tokenURIExists(string memory tokenURI) public view returns (bool) {
    return _usedTokenURIs[tokenURI] == true;
  }
    function createToken(string memory tokenURI, uint256 price) public payable returns(uint256){
        require(!tokenURIExists(tokenURI), "Token URI already exists");
        require(msg.value >= _listingPrice, "Price must be equal to listing price");


        _tokenIds.increment();
        _listedItems.increment();
        uint256 newTokenId = _tokenIds.current();

        _usedTokenURIs[tokenURI] = true;

        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        createListedToken(newTokenId,price);

        return newTokenId;
    }
    
    

    function createListedToken(uint256 tokenId, uint256 price)private{
        require(msg.value >= _listingPrice,"Not enough funds to list ");
        require(price>0,"Price of an NFT cannot be zero");

        idToListedToken[tokenId] = ListedToken(
        tokenId,
        price,
        payable(address(this)),
        payable(msg.sender),
        true
        );

        safeTransferFrom(msg.sender, address(this), tokenId);
        emit TokenListedSuccess(
        tokenId,
        address(this),
        msg.sender,
        price,
        true
        );
        
    }
    function getAllNfts() public view returns(ListedToken[] memory){
        uint256 nftCount = _tokenIds.current();
        ListedToken[] memory tokens = new ListedToken[](nftCount); 

        for(uint i =0;i<nftCount;i++){
            // ListedToken memory currentItem = idToListedToken[i+1];
            tokens[i] = idToListedToken[i+1];
        }
        return tokens;
    }

    function getMyNfts() public view returns(ListedToken[] memory){
        uint256 totalItemCount = _tokenIds.current();
        
        uint256 count=0;
        for( uint i =0;i<totalItemCount;i++){
            if(idToListedToken[i+1].owner==msg.sender){
                count+=1;
            }
        }
        ListedToken[] memory tokens = new ListedToken[](count);
        for(uint i =0;i<totalItemCount ; i++){
            if(idToListedToken[i+1].owner==msg.sender){
                tokens[i] = idToListedToken[i+1];
            }
        }
        return tokens;
    }

    function buyNft(uint256 tokenId)public payable{

        require(msg.sender==idToListedToken[tokenId].owner,"You are already an owner of this NFT");
        require(msg.value>=idToListedToken[tokenId].price,"Not enough funds");
        idToListedToken[tokenId].currentlyListed = false;
        _listedItems.decrement();
        safeTransferFrom(owner, msg.sender, tokenId);
    }


}