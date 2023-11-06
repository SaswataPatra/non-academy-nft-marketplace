import { FunctionComponent} from "react";
import NftItem from "../item";
import { NftMeta } from "@/types/nft";

// interface NftImage {
//   description: string;
//   image: string;
//   name: string;
//   attributes: {
//     trait_type: string;
//     value: string;
//   }[];
// }

interface NftImagesProps {
  nftImages: NftMeta[];
}

// type NftImagesProps = {
//     nftImages : any[]
// }

const NftList: FunctionComponent<NftImagesProps> = ({ nftImages }) => {
  return (
    <>
      <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
        {nftImages.map(nft =>
             <div key={nft.image} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
             <NftItem item ={nft}/>
           </div>
            )}
       
      </div>
    </>
  );
};

export default NftList;
