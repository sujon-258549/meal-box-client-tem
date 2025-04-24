"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import "./paginaciton.css";
export default function Pagination({ total }: { total: number }) {
  const router = useRouter();
  const pathName = usePathname();
  const [currentPage, setCurrentPage] = useState(1);

  function handlePageChange(page: number) {
    setCurrentPage(page);
    router.push(`${pathName}?page=${page}`);
  }

  return (
    <ResponsivePagination
      total={total}
      current={currentPage}
      onPageChange={handlePageChange}
    />
  );
}
