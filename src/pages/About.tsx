import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Code, Palette, Heart, Globe, Award, Target, Zap, Mail, Linkedin, Twitter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function About() {
  const [activeTeamMember, setActiveTeamMember] = useState<string | null>(null);
  const { toast } = useToast();

  const teamMembers = [
    {
      id: "sarah-johnson",
      name: "Sarah Johnson",
      role: "CEO & Founder",
      bio: "15+ years in project management and team leadership. Former VP of Operations at Microsoft, where she led digital transformation initiatives for Fortune 500 clients.",
      expertise: ["Strategic Planning", "Digital Transformation", "Team Leadership"],
      icon: <Users className="h-8 w-8" />,
      email: "sarah@synergysphere.com",
      linkedin: "linkedin.com/in/sarahjohnson",
      twitter: "@sarahjohnson",
      image: "👩‍💼",
      achievements: ["PMI Certified", "Harvard MBA", "TEDx Speaker"]
    },
    {
      id: "michael-chen",
      name: "Michael Chen",
      role: "CTO & Co-Founder",
      bio: "Full-stack developer and system architect with 12+ years building scalable platforms. Previously Lead Engineer at Google, specializing in distributed systems.",
      expertise: ["System Architecture", "Cloud Infrastructure", "AI Integration"],
      icon: <Code className="h-8 w-8" />,
      email: "michael@synergysphere.com",
      linkedin: "linkedin.com/in/michaelchen",
      twitter: "@michaelchen",
      image: "👨‍💻",
      achievements: ["AWS Certified Solutions Architect", "Stanford CS", "Open Source Contributor"]
    },
    {
      id: "emily-rodriguez",
      name: "Emily Rodriguez",
      role: "Head of Design",
      bio: "Award-winning UX designer with a passion for creating intuitive user experiences. Former Design Lead at Airbnb, with expertise in design systems and user research.",
      expertise: ["UX/UI Design", "Design Systems", "User Research"],
      icon: <Palette className="h-8 w-8" />,
      email: "emily@synergysphere.com",
      linkedin: "linkedin.com/in/emilyrodriguez",
      twitter: "@emilydesigns",
      image: "👩‍🎨",
      achievements: ["Design Award Winner", "RISD Graduate", "Design Mentor"]
    },
    {
      id: "david-kim",
      name: "David Kim",
      role: "VP of Customer Success",
      bio: "Customer success expert with 10+ years helping teams achieve their goals. Former Director at Salesforce, focused on enterprise client relationships and growth strategies.",
      expertise: ["Customer Success", "Account Management", "Growth Strategy"],
      icon: <Heart className="h-8 w-8" />,
      email: "david@synergysphere.com",
      linkedin: "linkedin.com/in/davidkim",
      twitter: "@davidkimcs",
      image: "👨‍💼",
      achievements: ["Customer Success Certified", "Wharton MBA", "Industry Speaker"]
    }
  ];

  const companyValues = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Purpose-Driven",
      description: "Every feature we build serves a clear purpose: making teams more effective and projects more successful."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "People-First",
      description: "We believe great products come from great teams, and great teams are built on trust, respect, and collaboration."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Innovation",
      description: "We continuously push boundaries to create solutions that don't just meet today's needs, but anticipate tomorrow's challenges."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Impact",
      description: "Our mission extends beyond individual teams—we're building tools that make collaboration possible across cultures and continents."
    }
  ];

  const milestones = [
    { year: "2020", event: "SynergySphere Founded", description: "Started with a vision to transform team collaboration" },
    { year: "2021", event: "First 1,000 Users", description: "Reached our first major user milestone" },
    { year: "2022", event: "Series A Funding", description: "Raised $15M to accelerate product development" },
    { year: "2023", event: "Global Expansion", description: "Launched in 25+ countries worldwide" },
    { year: "2024", event: "AI Integration", description: "Introduced intelligent project insights and automation" }
  ];

  const awards = [
    { name: "Best Project Management Tool 2024", organization: "TechCrunch" },
    { name: "Innovation Award", organization: "PMI Global Awards" },
    { name: "Top Workplace", organization: "Inc. Magazine" },
    { name: "Customer Choice Award", organization: "G2 Crowd" },
    { name: "Fastest Growing SaaS", organization: "SaaS Awards" }
  ];

  const handleContactMember = (member: any) => {
    toast({
      title: "Contact Information",
      description: `Reaching out to ${member.name} at ${member.email}`,
    });
  };

  const handleJoinTeam = () => {
    toast({
      title: "Careers Interest",
      description: "Redirecting to our careers page with open positions.",
    });
  };

  const handleScheduleMeeting = () => {
    toast({
      title: "Meeting Scheduled",
      description: "Our team will send you a calendar invite shortly.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-surface py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6 bg-primary text-white border-primary">
              🚀 Building the Future of Work
            </Badge>
            
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              About
              <span className="text-primary font-extrabold"> SynergySphere</span>
            </h1>
            
            <p className="mx-auto mb-10 max-w-3xl text-lg text-muted-foreground sm:text-xl">
              We're on a mission to eliminate the barriers that prevent teams from doing their best work. 
              Founded in 2020, we believe in the power of collaboration, transparency, and continuous improvement.
            </p>
            
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 px-8 py-4 text-lg font-semibold"
                onClick={handleScheduleMeeting}
              >
                Meet Our Team
                <Users className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg"
                onClick={handleJoinTeam}
              >
                Join Our Mission
                <Heart className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground">
                <p>
                  SynergySphere was born from a simple frustration: watching talented teams struggle 
                  with fragmented tools, poor communication, and lack of visibility into their work. 
                  Our founders experienced this firsthand at major tech companies.
                </p>
                <p>
                  In 2020, we set out to build something different—a platform that would truly understand 
                  how teams work and adapt to their needs, rather than forcing teams to adapt to rigid software.
                </p>
                <p>
                  Today, we serve over 10,000 teams across 50+ countries, but our mission remains the same: 
                  empowering organizations to achieve their full potential through innovative project management solutions.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-8 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Countries Served</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">1M+</div>
                  <div className="text-sm text-muted-foreground">Tasks Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime Record</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
                  <div className="text-sm text-muted-foreground">User Rating</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Card className="border-0 shadow-lg-custom bg-surface p-8">
                <div className="text-center">
                  <div className="text-6xl mb-6">🎯</div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
                  <p className="text-muted-foreground mb-6">
                    To eliminate the barriers that prevent teams from doing their best work, 
                    creating a world where every project succeeds and every team thrives.
                  </p>
                  <div className="flex items-center justify-center">
                    <Heart className="h-5 w-5 text-destructive mr-2" />
                    <span className="text-muted-foreground">Made with love by a distributed team</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 sm:py-32 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The passionate individuals behind SynergySphere, bringing diverse expertise and shared vision 
              to transform how teams collaborate.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <Card key={member.id} className="border-0 shadow-lg-custom bg-background hover:shadow-glow transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <CardTitle className="text-xl mb-2">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium mb-4">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-foreground">Expertise:</h4>
                    <div className="flex flex-wrap gap-1">
                      {member.expertise.map((skill, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-foreground">Achievements:</h4>
                    <div className="space-y-1">
                      {member.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-center text-xs text-muted-foreground">
                          <Award className="h-3 w-3 mr-1 text-success" />
                          {achievement}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center space-x-3 pt-4">
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => handleContactMember(member)}
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Twitter className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do and shape the culture we're building.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {companyValues.map((value, index) => (
              <Card key={index} className="border-0 shadow-lg-custom bg-surface text-center">
                <CardContent className="p-8">
                  <div className="flex justify-center text-primary mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline & Awards */}
      <section className="py-20 sm:py-32 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="timeline" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="timeline">Our Journey</TabsTrigger>
              <TabsTrigger value="awards">Recognition</TabsTrigger>
            </TabsList>
            
            <TabsContent value="timeline" className="mt-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
                  Our Journey
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Key milestones in our mission to transform team collaboration.
                </p>
              </div>
              
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <Card key={index} className="border-0 shadow-md-custom bg-background">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-bold">
                          {milestone.year}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-foreground mb-2">
                            {milestone.event}
                          </h3>
                          <p className="text-muted-foreground">{milestone.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="awards" className="mt-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
                  Awards & Recognition
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Industry recognition for our commitment to innovation and excellence.
                </p>
              </div>
              
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {awards.map((award, index) => (
                  <Card key={index} className="border-0 shadow-md-custom bg-background text-center">
                    <CardContent className="p-6">
                      <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {award.name}
                      </h3>
                      <p className="text-muted-foreground">{award.organization}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl mb-6">
            Join Our Mission
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Whether you're looking to transform your team's productivity or want to be part of 
            building the future of work, we'd love to connect.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 px-8 py-4 text-lg"
              onClick={handleScheduleMeeting}
            >
              Schedule a Meeting
              <Users className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg"
              onClick={handleJoinTeam}
            >
              View Open Positions
              <Heart className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            Remote-first company • Competitive benefits • Growth opportunities
          </p>
        </div>
      </section>
    </div>
  );
}