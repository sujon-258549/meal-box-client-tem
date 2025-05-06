import { AllMenu } from "@/components/allMenu/AllMenu";
import { getAllMenus } from "@/services/Menu/menuServices";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "All Menu",
  description:
    "Our restaurant offers a cozy and welcoming atmosphere where guests can enjoy delicious, freshly prepared meals. We take pride in using quality ingredients and serving a diverse menu that caters to all tastes. Whether you're here for a casual lunch or a special dinner, we ensure a memorable dining experience.",
};

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const data = await getAllMenus(page);

  return (
    <div className="">
      <AllMenu data={data} />
    </div>
  );
};

export default page;

// import { AllMenu } from "@/components/allMenu/AllMenu";
// import { getAllMenus } from "@/services/Menu/menuServices";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "All Menu",
//   description:
//     "Our restaurant offers a cozy and welcoming atmosphere where guests can enjoy delicious, freshly prepared meals. We take pride in using quality ingredients and serving a diverse menu that caters to all tastes. Whether you're here for a casual lunch or a special dinner, we ensure a memorable dining experience.",
// };

// interface SearchParams {
//   page?: string;
//   priceFrom?: string;
//   priceTo?: string;
//   shop?: string;
//   address?: string;
//   sort?: string;
// }

// const page = async ({ searchParams }: { searchParams: SearchParams }) => {
//   // Extract all possible filter parameters
//   const { page = "1", priceFrom, priceTo, shop, address, sort } = searchParams;

//   // Prepare filters object for the API call
//   const filters = {
//     page,
//     ...(priceFrom &&
//       priceTo && {
//         priceRange: { from: Number(priceFrom), to: Number(priceTo) },
//       }),
//     ...(shop && { shop }),
//     ...(address && { address }),
//     ...(sort && { sort }),
//   };

//   const data = await getAllMenus(filters);

//   return (
//     <div className="">
//       <AllMenu data={data} />
//     </div>
//   );
// };

// export default page;
