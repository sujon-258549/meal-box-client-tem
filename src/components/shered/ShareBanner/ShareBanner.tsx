import React from "react";

const ShareBanner = ({
  heading,
  paragraph,
}: {
  heading: string;
  paragraph: string;
}) => {
  return (
    <div>
      <div className="py-10 md:py-20  bg-[#424242]">
        <h1 className=" text-2xl md:text-4xl text-white text-center font-bold pb-5 border-b-2 border-[#424242]">
          {heading}
        </h1>
        <p className="text-xl text-center text-white">{paragraph}</p>
      </div>
    </div>
  );
};

export default ShareBanner;
