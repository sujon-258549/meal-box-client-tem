import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdSchedule,
  MdPayment,
} from "react-icons/md";
import { HiCalendar, HiGlobe } from "react-icons/hi";

interface Address {
  village: string;
  district: string;
  subDistrict: string;
  post: string;
  postCode: string;
}

interface Author {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  profileImage: string;
  address: Address;
}

interface OperatingHours {
  open: string;
  close: string;
  daysOpen: string[];
}

interface SocialMediaLinks {
  facebook: string;
  instagram: string;
  twitter: string;
  linkedin: string;
}

interface Shop {
  _id: string;
  shopName: string;
  shopLogo: string;
  description: string;
  phoneNumber: string;
  customerServiceContact: string;
  shopAddress: string;
  establishedYear: number;
  operatingHours: OperatingHours;
  paymentMethods: string[];
  website: string;
  socialMediaLinks: SocialMediaLinks;
  productCategories: string[];
  shopFeatures: string[];
}

interface Meal {
  menu: string;
  price: number;
}

interface DayPlan {
  day: string;
  morning: Meal;
  evening: Meal;
  night: Meal;
  _id: string;
}

interface PlanData {
  _id: string;
  author_id: Author;
  shopId: Shop;
  meals: DayPlan[];
  menuImage: string;
  totalPrice: number;
}

const PlanDetailsPage = ({ planData }: { planData: PlanData }) => {
  console.log(planData);
  if (!planData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{planData.shopId.shopName} - Meal Plan</title>
        <meta name="description" content={planData.shopId.description} />
      </Head>

      {/* Header */}
      <header className="bg-[#424242] text-white py-8 shadow-lg ">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">{planData.shopId.shopName}</h1>
              <p className="mt-2 opacity-90">Weekly Meal Plan</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center">
              <div className="relative w-12 h-12 rounded-full mr-3 border-2 border-white overflow-hidden">
                <Image
                  src={planData.author_id.profileImage}
                  alt={planData.author_id.fullName}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div>
                <p className="font-medium">{planData.author_id.fullName}</p>
                <p className="text-sm opacity-80">Meal Provider</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 ">
        {/* Shop Info Section */}
        <section className="bg-white rounded-xl shadow-md p-6 my-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <div className="relative h-48 w-full rounded-lg overflow-hidden mb-4">
                <Image
                  src={planData.shopId.shopLogo}
                  alt={planData.shopId.shopName}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#424242] mb-2">
                  Menu Preview
                </h3>
                <div className="relative h-32 w-full rounded-lg overflow-hidden">
                  <Image
                    src={planData.menuImage}
                    alt="Menu Sample"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
            </div>

            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold text-[#424242] mb-4">
                About {planData.shopId.shopName}
              </h2>
              <p className="text-gray-700 mb-6">
                {planData.shopId.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-[#424242] mb-2">
                    Contact Information
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <MdPhone className="text-gray-500 mt-1 mr-2" />
                      <span>{planData.shopId.phoneNumber}</span>
                    </li>
                    <li className="flex items-start">
                      <MdPhone className="text-gray-500 mt-1 mr-2" />
                      <span>{planData.shopId.customerServiceContact}</span>
                    </li>
                    <li className="flex items-start">
                      <MdEmail className="text-gray-500 mt-1 mr-2" />
                      <span>{planData.author_id.email}</span>
                    </li>
                    <li className="flex items-start">
                      <MdLocationOn className="text-gray-500 mt-1 mr-2" />
                      <span>{planData.shopId.shopAddress}</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-[#424242] mb-2">
                    Business Details
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <HiCalendar className="text-gray-500 mt-1 mr-2" />
                      <span>
                        Established: {planData.shopId.establishedYear}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MdSchedule className="text-gray-500 mt-1 mr-2" />
                      <span>
                        Hours: {planData.shopId.operatingHours.open} -{" "}
                        {planData.shopId.operatingHours.close}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MdPayment className="text-gray-500 mt-1 mr-2" />
                      <span>
                        Accepts: {planData.shopId.paymentMethods.join(", ")}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <HiGlobe className="text-gray-500 mt-1 mr-2" />
                      <a
                        href={planData.shopId.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Visit Website
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-6">
                <h3 className="font-semibold text-[#424242] mb-2">
                  Connect With Us
                </h3>
                <div className="flex space-x-4">
                  <a
                    href={planData.shopId.socialMediaLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaFacebook className="text-2xl" />
                  </a>
                  <a
                    href={planData.shopId.socialMediaLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-600 hover:text-pink-800"
                  >
                    <FaInstagram className="text-2xl" />
                  </a>
                  <a
                    href={planData.shopId.socialMediaLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-600"
                  >
                    <FaTwitter className="text-2xl" />
                  </a>
                  <a
                    href={planData.shopId.socialMediaLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:text-blue-900"
                  >
                    <FaLinkedin className="text-2xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Meal Plan Section */}
        <section className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-[#424242] mb-6">
            Weekly Meal Plan
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#424242]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Day
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Morning
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Evening
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Night
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {planData.meals.map((dayPlan) => (
                  <tr key={dayPlan._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-[#424242]">
                      {dayPlan.day}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-gray-900 font-medium">
                          {dayPlan.morning.menu}
                        </p>
                        <p className="text-gray-600">
                          ৳{dayPlan.morning.price.toLocaleString()}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-gray-900 font-medium">
                          {dayPlan.evening.menu}
                        </p>
                        <p className="text-gray-600">
                          ৳{dayPlan.evening.price.toLocaleString()}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-gray-900 font-medium">
                          {dayPlan.night.menu}
                        </p>
                        <p className="text-gray-600">
                          ৳{dayPlan.night.price.toLocaleString()}
                        </p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pricing Summary */}
          <div className="mt-8 pt-6 border-t">
            <div className="flex justify-end">
              <div className="w-full md:w-1/3">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#424242] mb-4">
                    Order Summary
                  </h3>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal (7 days):</span>
                    <span className="font-medium">
                      ৳{planData.totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Delivery Fee:</span>
                    <span className="font-medium">৳0</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Tax:</span>
                    <span className="font-medium">৳0</span>
                  </div>
                  <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
                    <span className="text-lg font-bold text-[#424242]">
                      Total:
                    </span>
                    <span className="text-lg font-bold text-[#424242]">
                      ৳{planData.totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/dashboard/order/details-menu/${planData._id}`}
                  passHref
                >
                  <button className="mt-6 w-full bg-[#424242] hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center">
                    <span className="mr-2">Order now</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </Link>
                <div className="mt-4 text-center text-sm text-gray-500">
                  <p>
                    By placing this order, you agree to our terms and conditions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Address Section */}
        <section className="bg-white rounded-xl shadow-md p-6 mb-10">
          <h2 className="text-2xl font-bold text-[#424242] mb-4">
            Delivery Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-[#424242] mb-2">
                Shop Address
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p>{planData.shopId.shopAddress}</p>
                <p className="mt-1">
                  {planData.author_id.address.district},{" "}
                  {planData.author_id.address.subDistrict}
                </p>
                <p>
                  {planData.author_id.address.post},{" "}
                  {planData.author_id.address.postCode}
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-[#424242] mb-2">
                Provider Address
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p>{planData.author_id.address.village}</p>
                <p className="mt-1">
                  {planData.author_id.address.district},{" "}
                  {planData.author_id.address.subDistrict}
                </p>
                <p>
                  {planData.author_id.address.post},{" "}
                  {planData.author_id.address.postCode}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PlanDetailsPage;
