import { useState } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import ExploreSection from "@/components/ExploreSection";
import LoginSection from "@/components/LoginSection";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return <HeroSection />;
      case "explore":
        return <ExploreSection />;
      case "about":
        return <AboutSection />;
      case "contact":
        return <ContactSection />;
      case "login":
        return <LoginSection />;
      default:
        return <HeroSection />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      {renderSection()}
    </div>
  );
};

export default Index;
