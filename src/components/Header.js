import React from "react";
export const Header = ({ text, bg, count }) => {
  return (
    <div
      className={`${bg} flex gap-4 items-center justify-center h-12 pl-4 rounded-md uppercase text-sm text-white`}
    >
      <p className="mt-3">{text}</p>
      <div className="ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center">
        {count}
      </div>
    </div>
  );
};
