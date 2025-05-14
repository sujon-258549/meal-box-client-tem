import Image from "next/image";
import Link from "next/link";
import React from "react";
import ShareBanner from "../shered/ShareBanner/ShareBanner";
import Pagination from "../ui/paginaciton";
import { ReadMoreModal } from "./ReadMoreModal";

const AllBlogs = ({ blogs }: { blogs: any }) => {
  const otherPosts = blogs.data;
  console.log(otherPosts);
  return (
    <div className="">
      <ShareBanner heading="All Blog post" paragraph="Home / All Blog post" />
      <div className="container">
        <div className="grid  py-10 md:py-16 grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {otherPosts.map((post: any) => (
            <div
              key={post._id}
              className="bg-black text-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={post?.imageUrl}
                  alt={post?.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                    {post?.category}
                  </span>
                  <span className="text-xs text-gray-200">
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block text-[16px] font-semibold  mb-2"
                >
                  {post.title.slice(0, 15)}
                </Link>
                <p className="text-gray-200 text-sm mb-4 ">
                  {post.excerpt.slice(0, 20)}
                </p>

                <ReadMoreModal post={post} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pb-5 pd:pb-12">
        <Pagination total={blogs?.meta?.totalPage} />
      </div>
    </div>
  );
};

export default AllBlogs;
