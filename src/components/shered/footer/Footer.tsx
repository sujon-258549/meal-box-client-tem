import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaVoicemail,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div style={{ boxShadow: "1px 1px 10px" }}>
      <footer className="bg-[#424242]  dark:bg-gray-900">
        <div className="mx-auto w-full max-w-5xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between items-center">
            <div className="mb-6 md:mb-0">
              <a href="https://flowbite.com/" className="flex items-center">
                <img src="/logo.png" className="h-8 me-3" alt="FlowBite Logo" />
                <span className="self-center text-2xl text-white font-semibold whitespace-nowrap dark:text-white">
                  Meal Box
                </span>
              </a>
            </div>

            <div className="flex gap-3 text-white">
              <Link href={"/"}>Home</Link>

              <Link href={"/"}>About Us</Link>

              <Link href={"/"}>Contact</Link>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-white sm:text-center dark:text-gray-400">
              © 2023{" "}
              <a href="https://flowbite.com/" className="hover:underline">
                Sadcn
              </a>
              . All Rights Reserved.
            </span>
            <div className="flex mt-4 sm:justify-center sm:mt-0">
              <div className="flex gap-3 text-white">
                <Link href={"/"}>
                  <FaFacebookF className="border-white border rounded-full text-[26px] p-1" />
                </Link>
                <Link href={"/"}>
                  <FaTwitter className="border-white border rounded-full text-[26px] p-1" />
                </Link>
                <Link href={"/"}>
                  <FaLinkedinIn className="border-white border rounded-full text-[26px] p-1" />
                </Link>
                <Link href={"/"}>
                  <FaInstagram className="border-white border rounded-full text-[26px] p-1" />
                </Link>
                <Link href={"/"}>
                  <FaVoicemail className="border-white border rounded-full text-[26px] p-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
