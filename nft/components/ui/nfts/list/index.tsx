import { FunctionComponent } from "react";

import { NftMeta } from "@/types/nft";
import NftItem from "../item";

// interface NftImageProps {
//   item: {
//     description: string;
//     image: string;
//     name: string;
//     attributes: { trait_type: string; value: string }[];
//   }[];
// }

interface NftImageProps {
  item: NftMeta[];
}
// interface NftImageProps {
//     item : any
// }

const NftList: FunctionComponent<NftImageProps> = ({ item }) => {
  return (
    <>
      {item.map((nft) => (
        <div key={nft.image} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
          <NftItem item={nft}/>
        </div>
      ))}
      
    </>
  );
};
export default NftList;
