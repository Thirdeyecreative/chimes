import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import TermsDetails from "./components/TermsDetails";

function index() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <TermsDetails />
      </div>
      <FooterSection />
    </div>
  );
}

export default index;
