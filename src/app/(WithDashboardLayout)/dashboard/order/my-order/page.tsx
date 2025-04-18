import { getMyMenu } from "@/services/Menu/menuServices";
import React from "react";

const MyMenuPage = () => {
  const { data } = getMyMenu();
  console.log(data);
  return <div>MyMenuPage</div>;
};

export default MyMenuPage;
