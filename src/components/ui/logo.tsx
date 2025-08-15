import { cn } from "@/lib/utils";
import logoImage from "@/assets/revom-logo.png";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

const Logo = ({ className, showText = true, size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12"
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl", 
    lg: "text-2xl"
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        <img 
          src={logoImage} 
          alt="RevoM Logo"
          className="w-full h-full object-contain logo-glow transition-nature hover:scale-105"
        />
      </div>
      {showText && (
        <span className={cn(
          "font-bold tracking-tight text-primary transition-nature",
          textSizeClasses[size]
        )}>
          RevoM
        </span>
      )}
    </div>
  );
};

export default Logo;