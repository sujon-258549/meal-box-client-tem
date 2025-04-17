import Footer from "@/components/shered/footer/Footer";
import { Navbar1 } from "@/components/shered/navbar/Navbar1";


const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar1 />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
