import AdminBlog from "@/components/modules/Blog/AdminBlog";
import { getMyBlog } from "@/services/blog/blogServices";

const MyBlogPage = async () => {
  const blogs = await getMyBlog();
  console.log(blogs);
  return (
    <div>
      <AdminBlog blogs={blogs} />
    </div>
  );
};

export default MyBlogPage;
