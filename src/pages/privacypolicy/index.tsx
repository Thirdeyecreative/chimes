import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import PrivacyDetails from "./components/PrivacyDetails";

function index() {
  return (
    <div>
      <Navbar />
      <PrivacyDetails />
      <FooterSection />
    </div>
  );
}

export default index;
