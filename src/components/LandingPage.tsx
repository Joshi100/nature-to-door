import { Button } from "@/components/ui/button";
import heroImage from "@/assets/himalayan-hero.jpg";

interface LandingPageProps {
  onSectionChange?: (section: string) => void;
}

const LandingPage = ({ onSectionChange }: LandingPageProps) => {
  const handleNavClick = (section: string) => {
    if (onSectionChange) {
      onSectionChange(section);
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${heroImage})`,
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white px-4 max-w-6xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-2xl leading-tight">
            Connecting Nature with Technology
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-12 drop-shadow-lg max-w-3xl mx-auto font-light leading-relaxed">
            Bridging Himalayan producers with urban consumers through innovative supply chain solutions
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              variant="hero"
              className="text-lg px-8 py-6 shadow-2xl hover-lift"
              onClick={() => handleNavClick('explore')}
            >
              Start Exploring
            </Button>
            <Button 
              size="lg" 
              variant="producer"
              className="text-lg px-8 py-6 shadow-2xl hover-lift"
              onClick={() => handleNavClick('login')}
            >
              Join as Producer
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;