import { useState } from "react";
import Navigation from "@/components/Navigation";
import LandingPage from "@/components/LandingPage";
import HomeSection from "@/components/HomeSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import ExploreSection from "@/components/ExploreSection";
import LoginSection from "@/components/LoginSection";

const Index = () => {
  const [activeSection, setActiveSection] = useState("landing");

  const renderSection = () => {
    switch (activeSection) {
      case "landing":
        return <LandingPage onSectionChange={setActiveSection} />;
      case "home":
        return <HomeSection />;
      case "explore":
        return <ExploreSection />;
      case "about":
        return <AboutSection />;
      case "contact":
        return <ContactSection />;
      case "login":
        return <LoginSection />;
      default:
        return <LandingPage onSectionChange={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen">
      {activeSection !== "landing" && (
        <Navigation 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
      )}
      {renderSection()}
    </div>
  );
};

export default Index;
