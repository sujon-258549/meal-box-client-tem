import ViewProfile from "@/components/modules/user/ViewProfile";
import { getMe } from "@/services/Auth/authServices";
import React from "react";

const DetailsProfile = async () => {
  const { data } = await getMe();
  return (
    <div>
      <ViewProfile data={data}></ViewProfile>
    </div>
  );
};

export default DetailsProfile;
