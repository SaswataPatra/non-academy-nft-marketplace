/* eslint-disable @next/next/no-img-element */

import type { NextPage } from "next";

import nfts from "../content/meta.json";
import { NftMeta } from "@/types/nft";
import { BaseLayout } from "@/components/ui";
import NftList from "@/components/ui/nfts/list";
import { useweb3 } from "@/components/providers/web3";
import { useEffect, useState } from "react";
import { ethers,formatUnits} from "ethers";

const Home: NextPage = () => {
  const { ethereum, provider } = useweb3();

  const [accounts, setAccounts] = useState<string[] | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      if (provider){
        const res: string[] = await provider!.send("eth_requestAccounts", []);
        console.log(res);
        const signer = await provider.getSigner()
        console.log("SIGNER -", signer)
        console.log("ADDRESS ",signer.address)
        const bal = provider.getBalance(signer.address)
        console.log("BALANCE ",formatUnits(await bal,"ether"))
        setAccounts(res);
      }
    };
    fetchAccounts();
  }, [provider]);

  return (
    <BaseLayout>
      <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="absolute inset-0">
          <div className="bg-white h-1/3 sm:h-2/3" />
        </div>
        <div className="relative">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
              Amazing Creatures NFTs
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Mint a NFT to get unlimited ownership forever!
            </p>
          </div>
          <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            <NftList item={nfts as unknown as NftMeta[]} />
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Home;
