"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface UserInfo {
  fullName: string;
  profileImage: string;
  role: string;
  createdAt: string;
  phoneNumber?: string;
  email?: string;
}

interface BlogPost {
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  readTime?: string;
  imageUrl?: string;
  authorId: UserInfo;
}

export function ReadMoreModal({
  post,
  children,
}: {
  post: BlogPost;
  children?: React.ReactNode;
}) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Dialog>
      <DialogTrigger className="text-indigo-400" asChild>
        {children || (
          <Button variant="link" className="p-0 h-auto">
            Read more
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start gap-4">
            <div>
              <DialogTitle className="text-2xl">{post.title}</DialogTitle>
              <DialogDescription className="mt-2">
                {post.excerpt}
              </DialogDescription>
            </div>
            <div className="text-sm text-gray-500 text-right">
              <span>{formatDate(post.date)}</span>
              {post.readTime && (
                <span className="ml-2">• {post?.readTime} read</span>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          {/* authorId Information Section */}
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="relative h-14 w-14 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={post?.authorId?.profileImage}
                alt={post?.authorId?.fullName}
                className="object-cover"
                sizes="56px"
              />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">
                {post.authorId.fullName}
              </h4>
              <p className="text-sm text-gray-600 mb-1">
                {post?.authorId?.role}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                {post?.authorId?.email && (
                  <span>Email: {post?.authorId?.email}</span>
                )}
                {post?.authorId?.phoneNumber && (
                  <span>Phone: {post.authorId?.phoneNumber}</span>
                )}
                <span>Joined: {formatDate(post?.authorId?.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Blog Image */}
          {post.imageUrl && (
            <div className="relative w-full h-64 rounded-lg overflow-hidden">
              <Image
                src={post?.imageUrl}
                alt={post?.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          )}

          {/* Category */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
              {post?.category}
            </span>
          </div>

          {/* Blog Content */}
          <div className="prose max-w-none">
            {post?.content?.split("\n").map((paragraph, i) => (
              <p key={i} className="mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
