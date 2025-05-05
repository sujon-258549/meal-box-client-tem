import AllUser from "@/components/admin/AllUser";
import { getAllUser } from "@/services/Auth/authServices";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const { data } = await getAllUser(page);
  return (
    <div>
      <AllUser data={data}></AllUser>
    </div>
  );
};

export default page;
