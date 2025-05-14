"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { ReadMoreModal } from "../blogs/ReadMoreModal";

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readTime?: string;
  imageUrl: string;
  slug: string;
}

interface BlogSectionProps {
  blogs: {
    data: BlogPost[];
    success: boolean;
    message?: string;
  };
}

const BlogSection = ({ blogs }: BlogSectionProps) => {
  if (!blogs?.success || !blogs.data?.length) {
    return (
      <section className="pb-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Latest From Our Blog
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            No blog posts available at the moment. Please check back later.
          </p>
        </div>
      </section>
    );
  }

  const featuredPost = blogs.data[0];
  const otherPosts = blogs.data.slice(0, 5);
  console.log(otherPosts);
  return (
    <section className="pb-16">
      <div className="">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Latest From Our Blog
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover helpful tips, recipes, and nutrition advice from our
            experts
          </p>
        </div>

        {/* Featured Blog Post */}
        <div className="mb-16">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="relative md:h-64 lg:h-80 h-full">
                  <Image
                    src={featuredPost.imageUrl}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              <div className="p-8 md:w-1/2">
                <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold mb-1">
                  {featuredPost.category}
                </div>
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="block mt-1 text-2xl font-medium text-gray-900 hover:text-indigo-600 transition-colors"
                >
                  {/* {featuredPost.title} */}
                </Link>
                <p className="mt-2 text-gray-600">
                  {featuredPost.excerpt}Discover helpful tips, recipes, and
                  nutrition advice from our experts
                </p>
                <div className="mt-4 flex items-center">
                  <div className="text-sm text-gray-500">
                    <span>
                      {new Date(featuredPost.date).toLocaleDateString()}
                    </span>
                    {featuredPost.readTime && <span className="mx-2">•</span>}
                    {featuredPost.readTime && (
                      <span>{featuredPost.readTime} read</span>
                    )}
                  </div>
                </div>
                <div className="mt-6">
                  {/* @ts-expect-error post */}
                  <ReadMoreModal post={featuredPost} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Blog Posts */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
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
                  {post?.excerpt?.slice(0, 20)}
                </p>

                <ReadMoreModal post={post} />
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/all-blogs">
            <Button> View All Blog Posts</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
