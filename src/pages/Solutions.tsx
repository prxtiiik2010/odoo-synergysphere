import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, Users, TrendingUp, CheckCircle, ArrowRight, Play, Download, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Solutions() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const { toast } = useToast();

  const solutions = [
    {
      id: "project-management",
      icon: <Target className="h-12 w-12" />,
      title: "Project Management",
      description: "Complete project lifecycle management with advanced planning, tracking, and reporting tools.",
      features: ["Gantt Charts", "Resource Planning", "Risk Management", "Timeline Tracking", "Budget Management"],
      pricing: "Starting at $29/month",
      category: "Enterprise"
    },
    {
      id: "team-collaboration",
      icon: <Users className="h-12 w-12" />,
      title: "Team Collaboration",
      description: "Seamless communication and collaboration tools for distributed teams worldwide.",
      features: ["Real-time Chat", "Video Conferencing", "File Sharing", "Team Spaces", "Activity Feeds"],
      pricing: "Starting at $19/month",
      category: "Popular"
    },
    {
      id: "analytics-insights",
      icon: <TrendingUp className="h-12 w-12" />,
      title: "Analytics & Insights",
      description: "Data-driven insights to optimize team performance and project outcomes.",
      features: ["Performance Metrics", "Custom Reports", "Predictive Analytics", "KPI Dashboards", "Export Tools"],
      pricing: "Starting at $39/month",
      category: "Advanced"
    }
  ];

  const industries = [
    { name: "Technology", clients: "250+ companies", growth: "+45%" },
    { name: "Healthcare", clients: "180+ organizations", growth: "+38%" },
    { name: "Finance", clients: "120+ institutions", growth: "+52%" },
    { name: "Education", clients: "300+ schools", growth: "+41%" },
    { name: "Manufacturing", clients: "95+ factories", growth: "+35%" },
    { name: "Retail", clients: "200+ stores", growth: "+48%" }
  ];

  const handleRequestDemo = (solutionTitle: string) => {
    setActiveDemo(solutionTitle);
    toast({
      title: "Demo Requested!",
      description: `We'll schedule a personalized demo of ${solutionTitle} for you soon.`,
    });
  };

  const handleDownloadGuide = () => {
    toast({
      title: "Guide Downloaded!",
      description: "Implementation guide has been sent to your email.",
    });
  };

  const handleContactSales = () => {
    toast({
      title: "Sales Contact!",
      description: "Our sales team will reach out within 24 hours.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-surface py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6 bg-primary text-white border-primary">
              ⚡ Trusted by 10,000+ Teams Worldwide
            </Badge>
            
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Solutions That
              <span className="text-primary font-extrabold"> Scale</span>
            </h1>
            
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Discover comprehensive solutions designed to transform your team's productivity 
              and drive exceptional results across every project.
            </p>
            
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 px-8 py-4 text-lg font-semibold"
                onClick={() => handleRequestDemo("All Solutions")}
              >
                Request Demo
                <Play className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg"
                onClick={handleDownloadGuide}
              >
                Download Guide
                <Download className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl mb-4">
              Choose Your Solution
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tailored solutions for every team size and industry requirement.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {solutions.map((solution, index) => (
              <Card key={index} className="border-0 shadow-lg-custom bg-surface hover:shadow-glow transition-all duration-300 relative">
                <CardHeader className="text-center">
                  <Badge 
                    variant={solution.category === "Popular" ? "default" : "secondary"} 
                    className="w-fit mx-auto mb-4"
                  >
                    {solution.category}
                  </Badge>
                  <div className="flex justify-center text-primary mb-4">
                    {solution.icon}
                  </div>
                  <CardTitle className="text-2xl mb-2">{solution.title}</CardTitle>
                  <CardDescription className="text-base mb-4">
                    {solution.description}
                  </CardDescription>
                  <div className="text-2xl font-bold text-primary">
                    {solution.pricing}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {solution.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-success mr-3 flex-shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <Button 
                      className="w-full bg-primary text-white hover:bg-primary-dark"
                      onClick={() => handleRequestDemo(solution.title)}
                    >
                      Request Demo
                      <Play className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="w-full">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 sm:py-32 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
              Trusted Across Industries
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how different industries are achieving success with our solutions.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, index) => (
              <Card key={index} className="border-0 shadow-md-custom bg-background text-center">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {industry.name}
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    {industry.clients}
                  </p>
                  <div className="flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-success mr-2" />
                    <span className="text-success font-semibold">{industry.growth}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
              Simple Implementation Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get up and running in just a few steps with our guided implementation.
            </p>
          </div>

          <Tabs defaultValue="consultation" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="consultation">Consultation</TabsTrigger>
              <TabsTrigger value="planning">Planning</TabsTrigger>
              <TabsTrigger value="implementation">Implementation</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
            </TabsList>
            
            <TabsContent value="consultation" className="mt-8">
              <Card className="border-0 shadow-lg-custom bg-surface">
                <CardContent className="p-8">
                  <div className="grid gap-8 lg:grid-cols-2">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-4">
                        Free Consultation
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Our experts analyze your current workflow and identify opportunities 
                        for improvement. We'll recommend the best solution mix for your needs.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-success mr-2" />
                          <span className="text-sm">30-minute strategy session</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-success mr-2" />
                          <span className="text-sm">Custom solution recommendations</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-success mr-2" />
                          <span className="text-sm">ROI projections</span>
                        </li>
                      </ul>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="text-6xl">💬</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="planning" className="mt-8">
              <Card className="border-0 shadow-lg-custom bg-surface">
                <CardContent className="p-8">
                  <div className="grid gap-8 lg:grid-cols-2">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-4">
                        Strategic Planning
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        We create a detailed implementation roadmap tailored to your 
                        organization's timeline and requirements.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-success mr-2" />
                          <span className="text-sm">Custom implementation timeline</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-success mr-2" />
                          <span className="text-sm">Resource allocation planning</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-success mr-2" />
                          <span className="text-sm">Risk mitigation strategies</span>
                        </li>
                      </ul>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="text-6xl">📋</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="implementation" className="mt-8">
              <Card className="border-0 shadow-lg-custom bg-surface">
                <CardContent className="p-8">
                  <div className="grid gap-8 lg:grid-cols-2">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-4">
                        Guided Implementation
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Our team works alongside yours to ensure smooth deployment 
                        with minimal disruption to your operations.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-success mr-2" />
                          <span className="text-sm">Dedicated implementation manager</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-success mr-2" />
                          <span className="text-sm">Data migration assistance</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-success mr-2" />
                          <span className="text-sm">Team training sessions</span>
                        </li>
                      </ul>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="text-6xl">⚙️</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="support" className="mt-8">
              <Card className="border-0 shadow-lg-custom bg-surface">
                <CardContent className="p-8">
                  <div className="grid gap-8 lg:grid-cols-2">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-4">
                        Ongoing Support
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Continuous support to ensure you get maximum value from 
                        your investment with regular check-ins and optimizations.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-success mr-2" />
                          <span className="text-sm">24/7 technical support</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-success mr-2" />
                          <span className="text-sm">Regular performance reviews</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-success mr-2" />
                          <span className="text-sm">Feature updates and training</span>
                        </li>
                      </ul>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="text-6xl">🛠️</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl mb-6">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Schedule a personalized demo and discover how our solutions can revolutionize 
            your team's productivity and project outcomes.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 px-8 py-4 text-lg"
              onClick={() => handleRequestDemo("Custom Solution")}
            >
              Schedule Demo
              <Play className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg"
              onClick={handleContactSales}
            >
              Contact Sales
              <MessageSquare className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            No commitment required • Free consultation included
          </p>
        </div>
      </section>
    </div>
  );
}