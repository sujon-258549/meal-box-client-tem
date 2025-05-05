import ContactForm from "@/components/contact/ContactForm";
import { getAllProviderAll } from "@/services/Provider/providerSurvices";

const ContactUsPage = async () => {
  const { data } = await getAllProviderAll();
  return (
    <div>
      <ContactForm data={data} />
    </div>
  );
};

export default ContactUsPage;
