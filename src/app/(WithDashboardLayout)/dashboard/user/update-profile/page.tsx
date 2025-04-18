import UpdateProfile from "@/components/modules/user/UpdateProfileForm";
import { getCurrentUser } from "@/services/Auth/authServices";
import React from "react";

const UpdateProfilePage = async () => {
  const { data } = await getCurrentUser();
  return (
    <div>
      <UpdateProfile data={data}></UpdateProfile>
    </div>
  );
};

export default UpdateProfilePage;
