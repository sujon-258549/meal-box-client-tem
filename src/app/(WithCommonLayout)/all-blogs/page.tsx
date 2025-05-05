import AllBlogs from "@/components/blogs/AllBlogs";
import { allBlog } from "@/services/blog/blogServices";
import React from "react";

const AllBlogPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const blogs = await allBlog(page);
  return (
    <div>
      <AllBlogs blogs={blogs} />
    </div>
  );
};

export default AllBlogPage;
