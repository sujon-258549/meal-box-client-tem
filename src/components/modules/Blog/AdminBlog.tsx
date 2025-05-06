"use client";

import Swal from "sweetalert2";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteMyBlog } from "@/services/blog/blogServices";
import Pagination from "../../ui/paginaciton";
import { ReadMoreModal } from "@/components/blogs/ReadMoreModal";

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  slug: string;
  imageUrl?: string;
  authorId?: {
    fullName: string;
    email: string;
  };
}

interface BlogListResponse {
  data: Blog[];
  meta: {
    totalPage: number;
  };
}

const AdminBlog = ({ blogs }: { blogs: BlogListResponse }) => {
  const router = useRouter();
  const hasBlogs = blogs?.data?.length > 0;

  const handleDeleteBlog = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const result = await deleteMyBlog(id);
          if (result?.success) {
            toast.success(result?.message, { duration: 3000 });
            router.refresh();
          } else {
            toast.error(result?.message, { duration: 3000 });
          }
        } catch (error: any) {
          toast.error("An error occurred while deleting the blog.", {
            duration: 2000,
          });
          console.error(error);
        }
      }
    });
  };

  return (
    <div className="m-5 p-2 rounded-md shadow-sm overflow-x-auto">
      {hasBlogs ? (
        <>
          <div className="mt-5">
            <Table className="min-w-full">
              <TableCaption>A list of your recent blog posts.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Featured Image</TableHead>
                  <TableHead className="min-w-[150px]">Title</TableHead>
                  <TableHead className="min-w-[120px]">Category</TableHead>
                  <TableHead className="min-w-[100px]">Date</TableHead>
                  <TableHead className="min-w-[120px]">Author</TableHead>
                  <TableHead className="min-w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogs.data.map((post) => (
                  <TableRow key={post._id}>
                    <TableCell>
                      <Avatar>
                        <AvatarImage src={post?.imageUrl} />
                        <AvatarFallback>
                          {post.title.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="font-bold">{post.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {post.excerpt.substring(0, 50)}...
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs">
                        {post.category}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(post.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {post.authorId?.fullName || "Unknown"}
                      <div className="text-sm text-muted-foreground">
                        {post.authorId?.email}
                      </div>
                    </TableCell>
                    <TableCell className="flex gap-2">
                      {/* @ts-expect-error post */}
                      <ReadMoreModal post={post} />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          router.push(
                            `/dashboard/admin/blog/update-blog/${post._id}`
                          )
                        }
                      >
                        Edit
                      </Button>

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteBlog(post._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Pagination total={blogs.meta.totalPage} />
        </>
      ) : (
        <Card className="p-6 text-center my-4">
          <h3 className="text-lg font-medium">No Blog Posts Found</h3>
          <p className="text-muted-foreground mt-2">
            You don,t have any blog posts yet. When you create one, it will
            appear here.
          </p>
        </Card>
      )}
    </div>
  );
};

export default AdminBlog;
