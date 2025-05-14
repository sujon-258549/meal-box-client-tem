import AdminBlog from "@/components/modules/Blog/AdminBlog";
import { getMyBlog } from "@/services/blog/blogServices";

const MyBlogPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const blogs = await getMyBlog(page);
  console.log(blogs);
  return (
    <div>
      <AdminBlog blogs={blogs} />
    </div>
  );
};

export default MyBlogPage;
