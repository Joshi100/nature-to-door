import { useState } from "react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import { Menu, X } from "lucide-react";

interface NavigationProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

const Navigation = ({ activeSection = "home", onSectionChange }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "home" },
    { label: "Explore", href: "explore" },
    { label: "About", href: "about" },
    { label: "Contact", href: "contact" },
  ];

  const handleNavClick = (section: string) => {
    if (onSectionChange) {
      onSectionChange(section);
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo size="md" />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className={`text-foreground hover:text-primary transition-nature font-medium pb-1 border-b-2 ${
                  activeSection === item.href 
                    ? 'border-primary text-primary' 
                    : 'border-transparent'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop Login Button */}
          <div className="hidden md:block">
            <Button 
              variant="hero" 
              size="sm"
              onClick={() => handleNavClick('login')}
            >
              Login
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border bg-background/95 backdrop-blur-lg">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={`text-foreground hover:text-primary transition-nature font-medium px-4 py-2 text-left ${
                    activeSection === item.href ? 'text-primary' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="px-4">
                <Button 
                  variant="hero" 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleNavClick('login')}
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;