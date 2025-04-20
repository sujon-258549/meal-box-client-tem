import { ReactNode } from "react";
import { Button } from "../ui/button";

const AddToCart = ({
  text,
  btnIcon,
  border,
}: {
  text?: string;
  btnIcon?: ReactNode;
  border?: string;
}) => (
  <Button
    style={{ width: "100%" }}
    className={`px-6 py-3 border  ${border} rounded-xl text-white  transition-all  flex items-center gap-2`}
  >
    {text}
    <span className="text-xl pl-1 text-white"> {btnIcon}</span>
  </Button>
);

export default AddToCart;
