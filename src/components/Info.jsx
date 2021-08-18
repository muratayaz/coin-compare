import React from "react";

const Info = ({ handleLogout }) => {
  return (
    <>
      <div className="flex item-center justify-end text-white">
        <div className="flex flex-col">
          <button
            className="text-base md:text-xl mt-4 pr-5"
            onClick={handleLogout}
          >
            Çıkış Yap
          </button>
        </div>
      </div>
      <div className="flex item-center justify-center text-white">
        <div className="flex flex-col">
          <h1 className="text-xl my-3">Kripto Borsası Karşılaştırma</h1>
        </div>
      </div>
      <div className="flex items-center justify-evenly border-b border-solid">
        <div className="flex flex-col mt-4 mb-2">
          <div className="flex flex-row items-center justify-center w-5">
            <div className="flex justify-center items-center text-white ">
              <h1 className="text-sm md:text-base">ERC</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-4 mb-2">
          <div className="flex flex-row items-center justify-center w-20 md:w-28">
            <div className="flex items-center justify-center text-white ">
              <h1 className="text-sm md:text-base">Coin İsmi</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-4 mb-2">
          <div className="flex flex-row items-center justify-center w-24 md:w-48">
            <div className="flex justify-center items-center text-white ">
              <h1 className="text-sm md:text-base">Alım Fiyatı</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-4 mb-2">
          <div className="flex flex-row items-center justify-center w-24 md:w-48">
            <div className="flex justify-center items-center text-white ">
              <h1 className="text-sm md:text-base">Satış Fiyatı</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-4 mb-2">
          <div className="flex flex-row items-center justify-center w-20 md:w-28">
            <div className="flex justify-center items-center text-white ">
              <h1 className="text-sm md:text-base">Kar Yüzdesi</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Info;
