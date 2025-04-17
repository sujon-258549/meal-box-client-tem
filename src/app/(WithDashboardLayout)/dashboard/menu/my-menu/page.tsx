import { MyMenuCard } from "@/components/modules/menu/myMenu/MyMenu";
import { getMyMenu } from "@/services/Menu/menuServices";

const MyMenuPage = async () => {
  const { data } = await getMyMenu();
  return (
    <div>
      <MyMenuCard data={data}></MyMenuCard>
    </div>
  );
};

export default MyMenuPage;
