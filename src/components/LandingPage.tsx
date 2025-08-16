import { useNavigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import RoleSelection from "./RoleSelection";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSectionChange = (section: string) => {
    navigate(`/${section}`);
  };

  return (
    <div className="pt-16"> {/* Account for fixed navbar */}
      <HeroSection onSectionChange={handleSectionChange} />
      <div id="explore">
        <RoleSelection />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
    </div>
  );
};

export default LandingPage;