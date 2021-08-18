import React from "react";
import { StarIcon } from "@heroicons/react/solid";

const Coin = ({ erc, name, puan, buy, sell, buyPrice, sellPrice }) => {
  return (
    <>
      <div className="flex item-center justify-evenly my-4 text-white">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-row w-5">
            {erc ? <StarIcon className="h-5 w-5 text-yellow-300" /> : <></>}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row items-center justify-center w-20 md:w-28">
            <div className="flex items-center justify-center rounded-full bg-red-900 px-2 md:px-8 w-12 md:w-16">
              <h1 className="text-xs md:text-base">{name}</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row items-center justify-center w-24 md:w-48">
            <div
              className={`flex text-center items-center justify-center  rounded-full md:px-4 w-full object-cover font-bold ${
                buy == "BINANCE" ? "bg-yellow-400" : "bg-green-400"
              }`}
            >
              <h1 className="text-xs md:text-base text-black">
                {buyPrice} - TL
              </h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row items-center justify-center w-24 md:w-48">
            <div
              className={`flex text-center items-center justify-center rounded-full md:px-4 w-full object-cover font-bold ${
                sell == "BINANCE" ? "bg-yellow-400" : "bg-green-400"
              }`}
            >
              <h1 className="text-xs md:text-base text-black">
                {sellPrice} - TL
              </h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row items-center justify-center w-20 md:w-28">
            <div
              className={`
            flex items-center rounded-full px-2 md:px-10 ${
              puan > 0 ? "text-green-400" : "text-red-600"
            }`}
            >
              <h1 className="text-xs md:text-base">%{puan}</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coin;
