import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import TermsDetails from "./components/TermsDetails";

function index() {
  return (
    <div>
      <Navbar />
      <TermsDetails />
      <FooterSection />
    </div>
  );
}

export default index;
