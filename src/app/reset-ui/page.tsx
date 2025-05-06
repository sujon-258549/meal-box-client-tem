import { RestUiForm } from "@/components/modules/user/RestUiForm";
import React from "react";

const ResetUiPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ email: string; token: string }>;
}) => {
  const { email, token } = await searchParams;
  return (
    <div>
      <RestUiForm token={token} email={email} />
    </div>
  );
};

export default ResetUiPage;
