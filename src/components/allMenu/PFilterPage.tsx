// // app/products/page.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Slider } from "@/components/ui/slider";
// import { Card } from "@/components/ui/card";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Button } from "@/components/ui/button";
// import { Label } from "../ui/label";
// import { getAllMenusForSidebar } from "@/services/Menu/menuServices";
// import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";

// interface ShopData {
//   shopName: string;
//   shopAddress: string;
// }

// interface MenuItem {
//   shopId: ShopData;
//   // add other properties as needed
// }

// export default function PFilterPage() {
//   const [priceRange, setPriceRange] = useState<[number, number]>([0, 51500]);
//   const [uniqueShops, setUniqueShops] = useState<string[]>([]);
//   const [uniqueAddresses, setUniqueAddresses] = useState<string[]>([]);
//   const [selectedShop, setSelectedShop] = useState<string>("");
//   const [selectedAddress, setSelectedAddress] = useState<string>("");
//   const [sortOption, setSortOption] = useState<"createdAt" | "-createdAt">(
//     "createdAt"
//   );
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const router = useRouter();
//   const pathName = usePathname();
//   const searchParams = useSearchParams();

//   // Initialize filters from URL params
//   useEffect(() => {
//     const params = new URLSearchParams(searchParams.toString());

//     const priceFrom = params.get("priceFrom");
//     const priceTo = params.get("priceTo");
//     if (priceFrom && priceTo) {
//       setPriceRange([Number(priceFrom), Number(priceTo)]);
//     }

//     const shop = params.get("shop");
//     if (shop) setSelectedShop(shop);

//     const address = params.get("address");
//     if (address) setSelectedAddress(address);

//     const sort = params.get("sort");
//     if (sort === "-createdAt") setSortOption("-createdAt");
//   }, [searchParams]);

//   // Debounced URL update
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       const params = new URLSearchParams();

//       if (priceRange[0] !== 0 || priceRange[1] !== 51500) {
//         params.set("priceFrom", priceRange[0].toString());
//         params.set("priceTo", priceRange[1].toString());
//       }

//       if (selectedShop) params.set("shop", selectedShop);
//       if (selectedAddress) params.set("address", selectedAddress);
//       if (sortOption === "-createdAt") params.set("sort", sortOption);

//       router.push(`${pathName}?${params.toString()}`);
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [priceRange, selectedShop, selectedAddress, sortOption, pathName, router]);

//   // Fetch shop data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);
//         setError(null);

//         const result = await getAllMenusForSidebar();

//         if (result?.data) {
//           const data: MenuItem[] = result.data;
//           const allShops = data.map((item) => item.shopId);

//           const uniqueShopSet = Array.from(
//             new Set(allShops.map((shop) => shop.shopName))
//           ).filter(Boolean) as string[];

//           const uniqueAddressSet = Array.from(
//             new Set(allShops.map((shop) => shop.shopAddress))
//           ).filter(Boolean) as string[];

//           setUniqueShops(uniqueShopSet);
//           setUniqueAddresses(uniqueAddressSet);
//         }
//       } catch (err) {
//         console.error("Failed to fetch menu data:", err);
//         setError("Failed to load filter options. Please try again later.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleSortChange = (option: "createdAt" | "-createdAt") => {
//     setSortOption(option);
//   };

//   const resetFilters = () => {
//     setPriceRange([0, 51500]);
//     setSelectedShop("");
//     setSelectedAddress("");
//     setSortOption("createdAt");
//   };

//   const formatPrice = (price: number) => {
//     return new Intl.NumberFormat("en-NG", {
//       style: "currency",
//       currency: "NGN",
//       maximumFractionDigits: 0,
//     }).format(price);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-4">Meal Providers</h1>

//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           {error}
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//         {/* Filters Sidebar */}
//         <div className="md:col-span-1">
//           <Card className="p-4 sticky top-4">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold">Filters</h2>
//               <Button
//                 variant="ghost"
//                 onClick={resetFilters}
//                 className="text-sm text-primary"
//               >
//                 Reset All
//               </Button>
//             </div>

//             {/* Price Range */}
//             <div className="space-y-4 mb-6">
//               <h3 className="font-semibold">Price Range</h3>
//               <Slider
//                 defaultValue={priceRange}
//                 max={51500}
//                 step={100}
//                 onValueChange={setPriceRange}
//                 value={priceRange}
//                 className="w-full"
//               />
//               <div className="flex justify-between text-sm text-gray-500">
//                 <span>{formatPrice(0)}</span>
//                 <span>{formatPrice(51500)}</span>
//               </div>
//               <div className="flex justify-between text-sm">
//                 <span>Selected Range:</span>
//                 <span>
//                   {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
//                 </span>
//               </div>
//             </div>

//             {/* Date Sorting */}
//             <div className="space-y-2 mb-6">
//               <Label className="font-semibold">Sort by Date:</Label>
//               <div className="space-y-2 pt-2">
//                 <div className="flex items-center space-x-2">
//                   <Checkbox
//                     id="sort-newest"
//                     checked={sortOption === "createdAt"}
//                     onCheckedChange={() => handleSortChange("createdAt")}
//                   />
//                   <Label htmlFor="sort-newest">Newest First</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Checkbox
//                     id="sort-oldest"
//                     checked={sortOption === "-createdAt"}
//                     onCheckedChange={() => handleSortChange("-createdAt")}
//                   />
//                   <Label htmlFor="sort-oldest">Oldest First</Label>
//                 </div>
//               </div>
//             </div>

//             {/* Shop Name */}
//             <Accordion type="multiple" defaultValue={["brand"]}>
//               <AccordionItem value="brand">
//                 <AccordionTrigger className="font-semibold">
//                   Shop Name
//                 </AccordionTrigger>
//                 <AccordionContent>
//                   {isLoading ? (
//                     <p className="text-sm text-gray-500">Loading shops...</p>
//                   ) : uniqueShops.length > 0 ? (
//                     <RadioGroup
//                       value={selectedShop}
//                       onValueChange={setSelectedShop}
//                       className="space-y-2 pt-2"
//                     >
//                       {uniqueShops.map((shop) => (
//                         <div key={shop} className="flex items-center space-x-2">
//                           <RadioGroupItem value={shop} id={`shop-${shop}`} />
//                           <Label htmlFor={`shop-${shop}`}>{shop}</Label>
//                         </div>
//                       ))}
//                     </RadioGroup>
//                   ) : (
//                     <p className="text-sm text-gray-500">No shops available</p>
//                   )}
//                 </AccordionContent>
//               </AccordionItem>
//             </Accordion>

//             {/* Shop Address */}
//             <Accordion type="single" collapsible>
//               <AccordionItem value="address">
//                 <AccordionTrigger className="font-semibold">
//                   Shop Address
//                 </AccordionTrigger>
//                 <AccordionContent>
//                   {isLoading ? (
//                     <p className="text-sm text-gray-500">
//                       Loading addresses...
//                     </p>
//                   ) : uniqueAddresses.length > 0 ? (
//                     <RadioGroup
//                       value={selectedAddress}
//                       onValueChange={setSelectedAddress}
//                       className="space-y-2 pt-2"
//                     >
//                       {uniqueAddresses.map((address) => (
//                         <div
//                           key={address}
//                           className="flex items-center space-x-2"
//                         >
//                           <RadioGroupItem
//                             value={address}
//                             id={`address-${address}`}
//                           />
//                           <Label htmlFor={`address-${address}`}>
//                             {address}
//                           </Label>
//                         </div>
//                       ))}
//                     </RadioGroup>
//                   ) : (
//                     <p className="text-sm text-gray-500">
//                       No addresses available
//                     </p>
//                   )}
//                 </AccordionContent>
//               </AccordionItem>
//             </Accordion>
//           </Card>
//         </div>

//         <div className="md:col-span-3">
//           {/* Product listing will go here */}
//           {/* You can use the filter states here:
//               priceRange, selectedShop, selectedAddress, sortOption */}

//           {isLoading ? (
//             <div className="flex justify-center items-center h-64">
//               <p>Loading products...</p>
//             </div>
//           ) : (
//             <div>
//               <h2 className="text-xl font-semibold mb-4">Products</h2>
//               <p className="text-gray-500">
//                 {selectedShop && `Shop: ${selectedShop}`}
//                 {selectedAddress && ` | Address: ${selectedAddress}`}
//                 {` | Sorted: ${
//                   sortOption === "createdAt" ? "Newest First" : "Oldest First"
//                 }`}
//               </p>
//               {/* Product list components would go here */}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";

const PFilterPage = () => {
  return <div></div>;
};

export default PFilterPage;
