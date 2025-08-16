import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About RevoM
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Bridging the gap between Himalayan producers and urban consumers through innovative technology
            </p>
          </div>

          {/* About Us */}
          <Card className="mb-12 shadow-nature hover-lift">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-primary mb-6">About Us</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                RevoM is a revolutionary smart supply chain platform that connects the pristine Himalayan regions 
                with urban markets. We believe in empowering local farmers and organic product suppliers from the 
                remote hills of Nepal by providing them direct access to consumers who value authentic, natural products. 
                Our platform eliminates intermediaries, ensuring fair prices for producers and genuine products for consumers.
              </p>
            </CardContent>
          </Card>

          {/* Vision & Mission Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="shadow-nature hover-lift">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-primary mb-6">Our Vision</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To create a sustainable ecosystem where Himalayan producers thrive through direct market access, 
                  while urban consumers enjoy authentic, organic products. We envision a future where technology 
                  bridges geographical barriers and preserves traditional farming practices.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-nature hover-lift">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-primary mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To revolutionize the supply chain by connecting Himalayan producers directly with consumers through 
                  innovative technology. We are committed to ensuring fair trade, promoting organic farming, and 
                  optimizing transportation to make authentic Himalayan products accessible to everyone.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Team Section */}
          <Card className="shadow-nature hover-lift">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-primary mb-6">About Our Team</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Our team consists of passionate individuals who understand both the challenges faced by Himalayan 
                producers and the growing demand for authentic organic products in urban areas. We combine deep 
                local knowledge with cutting-edge technology to create solutions that work for everyone.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🌱</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Local Expertise</h3>
                  <p className="text-sm text-muted-foreground">Deep understanding of Himalayan agriculture and culture</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💻</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Tech Innovation</h3>
                  <p className="text-sm text-muted-foreground">Leveraging modern technology for sustainable solutions</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Community Focus</h3>
                  <p className="text-sm text-muted-foreground">Building bridges between communities and markets</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Impact Section */}
          <Card className="mt-12 shadow-nature hover-lift">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-primary mb-6">Our Impact</h2>
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <p className="text-muted-foreground">Producers Connected</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
                  <p className="text-muted-foreground">Satisfied Customers</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">50+</div>
                  <p className="text-muted-foreground">Village Communities</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">₹2M+</div>
                  <p className="text-muted-foreground">Direct Income Generated</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;