import UpdateProfile from "@/components/modules/user/UpdateProfileForm";
import { getMe } from "@/services/Auth/authServices";

import React from "react";

const UpdateProfilePage = async () => {
  const { data } = await getMe();
  return (
    <div>
      <UpdateProfile data={data}></UpdateProfile>
    </div>
  );
};

export default UpdateProfilePage;
