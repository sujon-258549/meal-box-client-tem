import Footer from "@/components/shered/footer/Footer";
import Navbar from "@/components/shered/navbar/Navbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
