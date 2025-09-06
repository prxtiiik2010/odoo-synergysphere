import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Users, Zap, Shield, Sparkles, Target, Briefcase } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("synergy-auth") === "true";

  const features = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Team Collaboration",
      description: "Work together seamlessly with real-time updates and communication tools.",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description: "Experience blazing-fast performance with our optimized platform.",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure & Reliable",
      description: "Your data is protected with enterprise-grade security measures.",
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Smart Workflows",
      description: "Automate repetitive tasks and focus on what matters most.",
    },
  ];

  const benefits = [
    "Increase team productivity by 40%",
    "Reduce project delivery time",
    "Improve communication clarity",
    "Track progress in real-time",
    "Seamless integrations",
  ];


  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-surface py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6 bg-primary-dark text-white border-primary">
              ✨ New: Advanced Team Analytics Available
            </Badge>
            
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Transform Your Team's
              <span className="text-primary font-extrabold"> Productivity</span>
            </h1>
            
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              SynergySphere empowers teams to collaborate, innovate, and achieve extraordinary results. 
              Experience the future of project management today.
            </p>
            
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 px-8 py-4 text-lg font-semibold border-2 border-foreground"
                onClick={handleGetStarted}
              >
                {isAuthenticated ? "Go to Dashboard" : "Get Started Free"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg bg-secondary text-secondary-foreground border-primary hover:bg-primary hover:text-primary-foreground">
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">10K+</div>
                <div className="text-sm text-muted-foreground">Active Teams</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">500K+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">4.9/5</div>
                <div className="text-sm text-muted-foreground">User Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to streamline your workflow and boost team performance.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-lg-custom bg-surface">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-20 sm:py-32 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl mb-4">
              Explore More
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our comprehensive solutions, case studies, and learn more about our mission.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <Card className="border-0 shadow-lg-custom bg-background hover:shadow-glow transition-all duration-300">
              <CardHeader className="text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4 mx-auto">
                  <Target className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl mb-2">Solutions</CardTitle>
                <CardDescription className="text-base">
                  Explore our comprehensive project management solutions designed for teams of all sizes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full"
                  onClick={() => navigate("/solutions")}
                >
                  View Solutions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg-custom bg-background hover:shadow-glow transition-all duration-300">
              <CardHeader className="text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4 mx-auto">
                  <Briefcase className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl mb-2">Our Work</CardTitle>
                <CardDescription className="text-base">
                  See how we've helped organizations achieve remarkable results through strategic project management.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full"
                  onClick={() => navigate("/work")}
                >
                  View Case Studies
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg-custom bg-background hover:shadow-glow transition-all duration-300">
              <CardHeader className="text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4 mx-auto">
                  <Users className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl mb-2">About Us</CardTitle>
                <CardDescription className="text-base">
                  Learn about our mission, values, and the passionate team behind SynergySphere.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full"
                  onClick={() => navigate("/about")}
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 sm:py-32 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl mb-6">
                Why Teams Choose SynergySphere
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of successful teams who have transformed their productivity 
                and achieved remarkable results with our platform.
              </p>
              
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-success mr-3 flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>

              <Button
                size="lg"
                className="mt-8 bg-foreground text-background hover:bg-foreground/90"
                onClick={handleGetStarted}
              >
                {isAuthenticated ? "View Dashboard" : "Start Your Free Trial"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold text-primary mb-4">40%</div>
                  <div className="text-xl font-semibold text-foreground mb-2">
                    Productivity Increase
                  </div>
                  <div className="text-muted-foreground">
                    Average improvement reported by our users
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl mb-6">
            Ready to Transform Your Team?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of teams already using SynergySphere to achieve their goals. 
            Start your free trial today and experience the difference.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 px-8 py-4 text-lg"
              onClick={handleGetStarted}
            >
              {isAuthenticated ? "Go to Dashboard" : "Get Started Free"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <p className="text-sm text-muted-foreground">
              No credit card required • 14-day free trial
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
