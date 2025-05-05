import UpdateBlog from "@/components/modules/Blog/UpdateBlog";
import { singleBlog } from "@/services/blog/blogServices";
import React from "react";

const UpdateBlogPage = async ({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) => {
  const { blogId } = await params;
  console.log(blogId);
  const { data } = await singleBlog(blogId);
  return (
    <div>
      <UpdateBlog data={data} />
    </div>
  );
};

export default UpdateBlogPage;
