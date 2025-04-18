"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaCar } from "react-icons/fa";

const SearchAndSort = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("createdAt");
  const router = useRouter();
  const pathName = usePathname();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`${pathName}?searchTerm=${searchTerm}`);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;
    setSort(newSort);
    router.push(`${pathName}?sort=${newSort}`);
  };

  return (
    <div>
      <div className="flex gap-5 mb-10 justify-center flex-wrap">
        <form onSubmit={handleSearch} className="flex items-end">
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <FaCar />
            </div>
            <input
              placeholder="Search..."
              className="bg-gray-50 border border-[#424242] text-gray-900 text-sm rounded-l-lg focus:ring-cyan-900 focus:border-[#424242] block w-full ps-10 p-2.5"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-3 text-sm font-medium text-white bg-[#424242] rounded-r-lg border border-[#424242]"
          >
            Search
          </button>
        </form>

        <div className="relative group rounded-lg w-64 bg-cyan-900 overflow-hidden before:absolute before:w-12 before:rounded-full before:blur-lg before:[box-shadow:-60px_20px_10px_10px_#F9B0B9]">
          <svg
            y={0}
            xmlns="http://www.w3.org/2000/svg"
            x={0}
            width={100}
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
            height={100}
            className="w-8 z-50 h-8 absolute right-0 -rotate-45 stroke-white top-1.5 group-hover:rotate-0 duration-300"
          >
            <path
              strokeWidth={4}
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="none"
              d="M60.7,53.6,50,64.3m0,0L39.3,53.6M50,64.3V35.7m0,46.4A32.1,32.1,0,1,1,82.1,50,32.1,32.1,0,0,1,50,82.1Z"
              className="svg-stroke-primary"
            />
          </svg>
          <select
            onChange={handleSortChange}
            value={sort}
            className="appearance-none text-white bg-[#424242] ring-0 outline-none border border-neutral-500 text-sm font-bold rounded-lg focus:ring-cyan-900 focus:border-cyan-900 block w-full p-2.5 pr-10"
          >
            <option value="createdAt">Ascending</option>
            <option value="-createdAt">Demanding</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchAndSort;
