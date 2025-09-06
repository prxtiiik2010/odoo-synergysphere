import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Users, TrendingUp, ArrowRight, ExternalLink, Calendar, MapPin, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Work() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const { toast } = useToast();

  const featuredProjects = [
    {
      id: "techcorp-transformation",
      title: "TechCorp Digital Transformation",
      client: "TechCorp Industries",
      category: "Enterprise Solution",
      industry: "Technology",
      duration: "18 months",
      teamSize: "200+ members",
      location: "Global",
      description: "Led a comprehensive digital transformation initiative for a Fortune 500 technology company, modernizing their entire project management infrastructure and processes.",
      challenge: "TechCorp was struggling with fragmented tools, poor communication across departments, and lack of real-time visibility into project status across their global operations.",
      solution: "Implemented a centralized project management ecosystem with custom workflows, automated reporting, and integrated communication tools tailored to their specific needs.",
      results: [
        "60% reduction in project delivery time",
        "45% improvement in team collaboration",
        "90% increase in project visibility",
        "$2.5M annual cost savings",
        "99.8% system uptime achieved"
      ],
      testimonial: "SynergySphere transformed how we work. The results exceeded our expectations.",
      clientRole: "Chief Operations Officer",
      image: "🏢",
      tags: ["Digital Transformation", "Enterprise", "Global Scale"]
    },
    {
      id: "startupxyz-launch",
      title: "StartupXYZ Product Launch",
      client: "StartupXYZ",
      category: "Product Management",
      industry: "Fintech",
      duration: "8 months",
      teamSize: "45 members",
      location: "San Francisco, CA",
      description: "Managed the complete product development and launch strategy for an innovative fintech startup's flagship mobile application.",
      challenge: "StartupXYZ needed to coordinate multiple development teams, manage regulatory compliance, and ensure a successful market launch within a tight timeline.",
      solution: "Created an agile project management framework with integrated compliance tracking, automated testing workflows, and real-time progress monitoring.",
      results: [
        "500K+ app downloads in first month",
        "4.8/5 App Store rating",
        "Zero critical bugs at launch",
        "30% faster development cycle",
        "100% regulatory compliance achieved"
      ],
      testimonial: "The team's expertise in product management was instrumental in our successful launch.",
      clientRole: "CEO & Founder",
      image: "🚀",
      tags: ["Product Launch", "Startup", "Mobile App"]
    },
    {
      id: "greentech-sustainability",
      title: "GreenTech Sustainability Initiative",
      client: "GreenTech Solutions",
      category: "Environmental Project",
      industry: "Clean Energy",
      duration: "24 months",
      teamSize: "150+ members",
      location: "Multiple Countries",
      description: "Coordinated a global sustainability program across 15 countries, focusing on carbon footprint reduction and renewable energy adoption.",
      challenge: "Managing a complex, multi-national project with diverse regulatory requirements, cultural differences, and varying technological capabilities.",
      solution: "Developed a scalable project framework with localized implementation strategies, cross-cultural communication protocols, and standardized reporting mechanisms.",
      results: [
        "30% carbon footprint reduction",
        "15 countries successfully onboarded",
        "50+ renewable energy projects initiated",
        "€1.2M in energy cost savings",
        "ISO 14001 certification achieved"
      ],
      testimonial: "Their global project coordination capabilities are unmatched in the industry.",
      clientRole: "Global Sustainability Director",
      image: "🌱",
      tags: ["Sustainability", "Global", "Clean Energy"]
    }
  ];

  const caseStudyCategories = [
    { id: "enterprise", name: "Enterprise", count: 12 },
    { id: "startup", name: "Startup", count: 8 },
    { id: "nonprofit", name: "Non-Profit", count: 5 },
    { id: "government", name: "Government", count: 3 }
  ];

  const additionalProjects = [
    {
      title: "HealthCare Connect Platform",
      client: "MedTech Innovations",
      category: "Healthcare Technology",
      metric: "40% faster patient processing",
      image: "🏥"
    },
    {
      title: "EduTech Learning Management",
      client: "Global Education Corp",
      category: "Education Technology",
      metric: "300K+ students served",
      image: "📚"
    },
    {
      title: "RetailMax Inventory System",
      client: "RetailMax Chain",
      category: "Retail Operations",
      metric: "25% inventory cost reduction",
      image: "🛍️"
    },
    {
      title: "SmartCity Infrastructure",
      client: "Metropolitan Council",
      category: "Smart City",
      metric: "50 city systems integrated",
      image: "🏙️"
    }
  ];

  const handleViewCaseStudy = (projectId: string) => {
    setSelectedProject(projectId);
    toast({
      title: "Case Study Opened",
      description: "Viewing detailed case study information.",
    });
  };

  const handleRequestSimilarProject = () => {
    toast({
      title: "Project Request Sent",
      description: "Our team will contact you to discuss your project needs.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-surface py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6 bg-primary text-white border-primary">
              🏆 Award-Winning Project Delivery
            </Badge>
            
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Our Work
              <span className="text-primary font-extrabold"> Speaks</span>
            </h1>
            
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Discover how we've helped organizations across industries achieve remarkable 
              results through strategic project management and innovative solutions.
            </p>
            
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 px-8 py-4 text-lg font-semibold"
                onClick={() => handleViewCaseStudy("featured")}
              >
                View Case Studies
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg"
                onClick={handleRequestSimilarProject}
              >
                Start Your Project
                <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Project Stats */}
            <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">250+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">98%</div>
                <div className="text-sm text-muted-foreground">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">15</div>
                <div className="text-sm text-muted-foreground">Countries Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">5</div>
                <div className="text-sm text-muted-foreground">Industry Awards</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl mb-4">
              Featured Case Studies
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Deep dive into our most impactful projects and see the transformative results we've achieved.
            </p>
          </div>

          <div className="space-y-16">
            {featuredProjects.map((project, index) => (
              <Card key={project.id} className="border-0 shadow-lg-custom bg-surface overflow-hidden">
                <div className="grid gap-8 lg:grid-cols-5">
                  <div className="lg:col-span-2">
                    <CardHeader className="h-full flex flex-col justify-center items-center text-center p-8">
                      <div className="text-8xl mb-4">{project.image}</div>
                      <Badge variant="secondary" className="mb-4">
                        {project.category}
                      </Badge>
                      <CardTitle className="text-2xl mb-2">{project.title}</CardTitle>
                      <CardDescription className="text-base mb-4">
                        {project.client}
                      </CardDescription>
                      
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center justify-center">
                          <Building className="h-4 w-4 mr-2" />
                          {project.industry}
                        </div>
                        <div className="flex items-center justify-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {project.duration}
                        </div>
                        <div className="flex items-center justify-center">
                          <Users className="h-4 w-4 mr-2" />
                          {project.teamSize}
                        </div>
                        <div className="flex items-center justify-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {project.location}
                        </div>
                      </div>
                    </CardHeader>
                  </div>
                  
                  <div className="lg:col-span-3">
                    <CardContent className="p-8">
                      <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                          <TabsTrigger value="overview">Overview</TabsTrigger>
                          <TabsTrigger value="challenge">Challenge</TabsTrigger>
                          <TabsTrigger value="solution">Solution</TabsTrigger>
                          <TabsTrigger value="results">Results</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="overview" className="mt-6">
                          <div className="space-y-4">
                            <p className="text-foreground">{project.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {project.tags.map((tag, idx) => (
                                <Badge key={idx} variant="outline">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="challenge" className="mt-6">
                          <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-foreground">The Challenge</h4>
                            <p className="text-muted-foreground">{project.challenge}</p>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="solution" className="mt-6">
                          <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-foreground">Our Solution</h4>
                            <p className="text-muted-foreground">{project.solution}</p>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="results" className="mt-6">
                          <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-foreground">Key Results</h4>
                            <div className="grid gap-3 sm:grid-cols-2">
                              {project.results.map((result, idx) => (
                                <div key={idx} className="flex items-center">
                                  <TrendingUp className="h-4 w-4 text-success mr-2 flex-shrink-0" />
                                  <span className="text-sm text-foreground">{result}</span>
                                </div>
                              ))}
                            </div>
                            
                            <div className="mt-6 p-4 bg-muted rounded-lg">
                              <blockquote className="text-foreground italic">
                                "{project.testimonial}"
                              </blockquote>
                              <p className="text-sm text-muted-foreground mt-2">
                                — {project.clientRole}, {project.client}
                              </p>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                      
                      <div className="flex gap-4 mt-6">
                        <Button 
                          className="flex-1"
                          onClick={() => handleViewCaseStudy(project.id)}
                        >
                          Full Case Study
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={handleRequestSimilarProject}
                        >
                          Similar Project
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Projects Grid */}
      <section className="py-20 sm:py-32 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
              More Success Stories
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our diverse portfolio of successful projects across various industries.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {additionalProjects.map((project, index) => (
              <Card key={index} className="border-0 shadow-md-custom bg-background hover:shadow-glow transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-4">{project.image}</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {project.client}
                  </p>
                  <Badge variant="outline" className="mb-4">
                    {project.category}
                  </Badge>
                  <div className="flex items-center justify-center text-sm text-success font-semibold">
                    <Award className="h-4 w-4 mr-2" />
                    {project.metric}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process & Methodology */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
              Our Proven Methodology
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A systematic approach that ensures consistent, exceptional results across all projects.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "01", title: "Discovery", description: "Deep dive into your challenges and objectives" },
              { step: "02", title: "Strategy", description: "Develop customized solutions and roadmaps" },
              { step: "03", title: "Execution", description: "Implement with precision and continuous monitoring" },
              { step: "04", title: "Optimization", description: "Refine and enhance for maximum impact" }
            ].map((phase, index) => (
              <Card key={index} className="border-0 shadow-lg-custom bg-surface text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-4">{phase.step}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{phase.title}</h3>
                  <p className="text-muted-foreground">{phase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl mb-6">
            Ready to Create Your Success Story?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Let's discuss how we can help you achieve similar transformative results. 
            Every great project starts with a conversation.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 px-8 py-4 text-lg"
              onClick={handleRequestSimilarProject}
            >
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg"
            >
              View All Case Studies
              <ExternalLink className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            Free consultation • Custom project proposal • No obligation
          </p>
        </div>
      </section>
    </div>
  );
}