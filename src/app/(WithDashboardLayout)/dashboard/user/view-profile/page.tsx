import ViewProfile from "@/components/modules/user/ViewProfile";
import { getCurrentUser } from "@/services/Auth/authServices";
import React from "react";

const DetailsProfile = async () => {
  const { data } = await getCurrentUser();
  return (
    <div>
      <ViewProfile data={data}></ViewProfile>
    </div>
  );
};

export default DetailsProfile;
