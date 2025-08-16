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
    <section className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden">
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
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-4rem)] py-8">
        <div className="text-center text-white px-4 max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 drop-shadow-2xl leading-tight">
            Connecting Nature with Technology
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 drop-shadow-lg max-w-3xl mx-auto font-light leading-relaxed">
            Bridging Himalayan producers with urban consumers through innovative supply chain solutions
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Button 
              size="lg" 
              variant="hero"
              className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 shadow-2xl hover-lift w-full sm:w-auto"
              onClick={() => handleNavClick('explore')}
            >
              Start Exploring
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 shadow-2xl hover-lift bg-white/10 text-white border-white/30 hover:bg-white/20 w-full sm:w-auto"
              onClick={() => handleNavClick('login')}
            >
              Join Community
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;