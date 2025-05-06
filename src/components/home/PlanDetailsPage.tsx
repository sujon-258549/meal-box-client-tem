import Head from "next/head";
import Link from "next/link";

const PlanDetailsPage = ({ planData }: { planData: any }) => {
  console.log(planData);

  // Full data object from provided JSON

  return (
    <div className="min-h-screen container bg-gray-50">
      <Head>
        <title>{planData?.shopId?.shopName} - Meal Plan</title>
        <meta name="description" content={planData?.shopId?.description} />
      </Head>

      {/* Header */}
      <header className="bg-[#424242] text-white py-8 shadow-lg mt-10 rounded-t-md">
        <div className="p-5">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">
                {planData?.shopId?.shopName}
              </h1>
              <p className="mt-2 opacity-90">Weekly Meal Plan</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center">
              <img
                src={planData?.author_id?.profileImage}
                alt={planData?.author_id?.fullName}
                className="w-12 h-12 rounded-full mr-3 border-2 border-white"
              />
              <div>
                <p className="font-medium">{planData?.author_id?.fullName}</p>
                <p className="text-sm opacity-80">Meal Provider</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* shopId Info Section */}
        <section className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 mb-6 md:mb-0 md:pr-6">
              <img
                src={planData?.shopId?.shopLogo}
                alt={planData?.shopId?.shopName}
                className="w-full h-48 object-cever rounded-lg"
              />
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-[#424242]">
                  Menu Preview
                </h3>
                <img
                  src={planData?.menuImage}
                  alt="Menu Sample"
                  className="w-full h-32 object-cover rounded-lg mt-2"
                />
              </div>
            </div>

            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold text-[#424242] mb-4">
                About {planData?.shopId?.shopName}
              </h2>
              <p className="text-gray-700 mb-6">
                {planData?.shopId?.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-[#424242] mb-2">
                    Contact Information
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="material-icons mr-2 text-gray-500">
                        phone
                      </span>
                      {planData?.shopId?.phoneNumber}
                    </li>
                    <li className="flex items-center">
                      <span className="material-icons mr-2 text-gray-500">
                        support_agent
                      </span>
                      {planData?.shopId?.customerServiceContact}
                    </li>
                    <li className="flex items-center">
                      <span className="material-icons mr-2 text-gray-500">
                        email
                      </span>
                      {planData?.author_id?.email}
                    </li>
                    <li className="flex items-center">
                      <span className="material-icons mr-2 text-gray-500">
                        location_on
                      </span>
                      {planData?.shopId?.shopAddress}
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-[#424242] mb-2">
                    Business Details
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="material-icons mr-2 text-gray-500">
                        calendar_today
                      </span>
                      Established: {planData?.shopId?.establishedYear}
                    </li>
                    <li className="flex items-center">
                      <span className="material-icons mr-2 text-gray-500">
                        schedule
                      </span>
                      Hours: {planData?.shopId?.operatingHours?.open} -{" "}
                      {planData?.shopId?.operatingHours?.close}
                    </li>
                    <li className="flex items-center">
                      <span className="material-icons mr-2 text-gray-500">
                        payment
                      </span>
                      Accepts: {planData?.shopId?.paymentMethods.join(", ")}
                    </li>
                    <li className="flex items-center">
                      <span className="material-icons mr-2 text-gray-500">
                        public
                      </span>
                      <a
                        href={planData?.shopId?.website}
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
                    href={planData?.shopId?.socialMedia?.facebook}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <span className="sr-only">Facebook</span>
                    <i className="fab fa-facebook text-2xl"></i>
                  </a>
                  <a
                    href={planData?.shopId?.socialMedia?.instagram}
                    className="text-pink-600 hover:text-pink-800"
                  >
                    <span className="sr-only">Instagram</span>
                    <i className="fab fa-instagram text-2xl"></i>
                  </a>
                  <a
                    href={planData?.shopId?.socialMedia?.twitter}
                    className="text-blue-400 hover:text-blue-600"
                  >
                    <span className="sr-only">Twitter</span>
                    <i className="fab fa-twitter text-2xl"></i>
                  </a>
                  <a
                    href={planData?.shopId?.socialMedia?.linkedin}
                    className="text-blue-700 hover:text-blue-900"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <i className="fab fa-linkedin text-2xl"></i>
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
                {planData?.meals?.map((dayPlan: any, index: any) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-[#424242]">
                      {dayPlan.day}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div>
                          <p className="text-gray-900 font-medium">
                            {dayPlan.morning.menu}
                          </p>
                          <p className="text-gray-600">
                            ৳{dayPlan?.morning?.price?.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div>
                          <p className="text-gray-900 font-medium">
                            {dayPlan?.evening?.menu}
                          </p>
                          <p className="text-gray-600">
                            ৳{dayPlan?.evening?.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div>
                          <p className="text-gray-900 font-medium">
                            {dayPlan?.night?.menu}
                          </p>
                          <p className="text-gray-600">
                            ৳{dayPlan?.night?.price.toLocaleString()}
                          </p>
                        </div>
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
                      ৳{planData?.totalPrice.toLocaleString()}
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
                      ৳{planData?.totalPrice?.toLocaleString()}
                    </span>
                  </div>
                </div>
                <Link href={`/dashboard/order/details-menu/${planData?._id}`}>
                  <button className="mt-6 w-full bg-[#424242] hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center">
                    <span className="mr-2">Order now</span>
                    <span className="material-icons">arrow_forward</span>
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
        <section className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-[#424242] mb-4">
            Delivery Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-[#424242] mb-2">
                shopId Address
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p>{planData?.shopId?.address}</p>
                <p className="mt-1">
                  {planData?.author_id?.address?.district},{" "}
                  {planData?.author_id?.address?.subDistrict}
                </p>
                <p>
                  {planData?.author_id?.address?.post},{" "}
                  {planData?.author_id?.address?.postCode}
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-[#424242] mb-2">
                Provider Address
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p>{planData?.author_id?.address?.village}</p>
                <p className="mt-1">
                  {planData?.author_id?.address?.district},{" "}
                  {planData?.author_id?.address?.subDistrict}
                </p>
                <p>
                  {planData?.author_id?.address?.post},{" "}
                  {planData?.author_id?.address?.postCode}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Add Material Icons and Font Awesome */}
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        rel="stylesheet"
      />
    </div>
  );
};

export default PlanDetailsPage;
