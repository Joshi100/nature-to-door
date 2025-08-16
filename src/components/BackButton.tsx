import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const BackButton = ({ currentSection, onSectionChange }: BackButtonProps) => {
  const getBackDestination = (current: string): string => {
    // Smart navigation logic
    switch (current) {
      case "home":
      case "explore":
      case "about":
      case "contact":
        return "landing";
      case "login":
        return "landing";
      default:
        return "landing";
    }
  };

  const handleBackClick = () => {
    const destination = getBackDestination(currentSection);
    onSectionChange(destination);
  };

  // Don't show back button on landing page
  if (currentSection === "landing") {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleBackClick}
      className="fixed top-20 left-4 z-40 bg-card/80 backdrop-blur-sm border border-border hover:bg-card/90"
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back
    </Button>
  );
};

export default BackButton;