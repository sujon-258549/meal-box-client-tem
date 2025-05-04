import Link from "next/link";
import { Button } from "../ui/button";
import Pagination from "../ui/paginaciton";

interface Address {
  village: string;
  district: string;
  subDistrict: string;
  post: string;
  postCode: string;
}

interface MealProvider {
  _id: string;
  shopName: string;
  ownerName: string;
  description: string;
  shopLogo: string;
  shopAddress: string;
  address: Address;
  isActive: boolean;
  operatingHours: {
    open: string;
    close: string;
    daysOpen: string[];
  };
  paymentMethods: string[];
  phoneNumber: string;
  website: string;
  establishedYear: number;
  customerServiceContact: string;
}

interface ProviderData {
  data: MealProvider[];
  meta: any;
}

const AllMealProviders = ({ provider }: { provider: ProviderData }) => {
  console.log(provider.data);
  if (!provider.data || provider?.data?.length === 0) {
    return <div className="text-center py-8">No meal providers available</div>;
  }

  return (
    <section className="max-w-5xl mx-auto px-5 lg:px-0">
      <div className="py-10 md:py-20">
        <h1 className="text-2xl md:text-4xl max-w-md mx-auto  text-center font-bold pb-5 border-b-2 border-[#424242]">
          {" "}
          All Meal Provider
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {provider?.data?.map((provider: MealProvider) => (
          <div
            style={{ boxShadow: "1px 1px 50px #fff" }}
            key={provider._id}
            className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-black text-white"
          >
            {/* Header with image and basic info */}
            <div className="flex items-start  p-4 gap-3">
              <img
                src={provider.shopLogo}
                alt={provider.shopName}
                className="w-10 h-10 rounded-full object-cover border"
              />
              <div>
                <h3 className=" text-[16px] font-bold">
                  {provider.shopName.slice(0, 10)}...
                </h3>
                <p className="text-sm text-gray-200">{provider.ownerName}</p>
                <div className="flex gap-1 mt-1">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      provider.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {provider.isActive ? "Open" : "Closed"}
                  </span>
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                    Est. {provider.establishedYear}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="px-4 pb-3">
              <p className="text-sm text-gray-200 line-clamp-2">
                {provider.description}
              </p>
            </div>

            {/* Details */}
            <div className="px-4 pb-3 space-y-2">
              <div className="flex items-center text-sm">
                <span className="text-gray-300 font-bold w-24">Hours:</span>
                <span>
                  {provider.operatingHours.open} -{" "}
                  {provider.operatingHours.close}
                </span>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-gray-300 font-bold w-24">Contact:</span>
                <span>{provider.phoneNumber}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-gray-300 font-bold w-24">Address:</span>
                <span className="truncate">{provider.shopAddress}</span>
              </div>
            </div>

            {/* Payment methods */}
            <div className="px-4 pb-3">
              <div className="flex flex-wrap gap-1">
                {provider.paymentMethods.map((method, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer buttons */}
            <div className="border-t px-4 py-3 items-center flex justify-between">
              <a
                href={provider.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-400 cursor-pointer font-bold hover:underline"
              >
                Visit Website
              </a>
              <Link href={`/details-menu/${provider._id}`}>
                <Button className="text-sm cursor-pointer">View Menu</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="py-10 md:py-16">
        <Pagination total={provider?.meta?.totalPage} />
      </div>
    </section>
  );
};

export default AllMealProviders;
