import ContactForMe from "@/components/modules/mealProvider/Contact/ContactForMe";
import { contactForMe } from "@/services/contact/contact.services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Meal Provider",
  description:
    "Our restaurant offers a cozy and welcoming atmosphere where guests can enjoy delicious, freshly prepared meals. We take pride in using quality ingredients and serving a diverse menu that caters to all tastes. Whether you're here for a casual lunch or a special dinner, we ensure a memorable dining experience.",
};
const ContactForMePage = async () => {
  const data = await contactForMe();
  return (
    <div>
      <ContactForMe data={data}></ContactForMe>
    </div>
  );
};

export default ContactForMePage;
