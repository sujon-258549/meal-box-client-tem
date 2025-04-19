import DetailsMenu from "@/components/home/DetailsMenu";
import { getSingleMenu } from "@/services/Menu/menuServices";

const DetailsMenuPage = async ({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) => {
  const { orderId } = await params;

  const { data } = await getSingleMenu(orderId);
  return (
    <div>
      <DetailsMenu menu={data}></DetailsMenu>
    </div>
  );
};

export default DetailsMenuPage;
