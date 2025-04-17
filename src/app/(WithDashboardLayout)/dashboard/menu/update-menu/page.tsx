import UpdateMenu from "@/components/modules/menu/updatemenu/UpdateMenu";
import { getMyMenu } from "@/services/Menu/menuServices";

const UpdateMenuPage = async () => {
  const { data } = await getMyMenu();
  console.log(data);
  return (
    <div>
      <UpdateMenu data={data}></UpdateMenu>
    </div>
  );
};

export default UpdateMenuPage;
