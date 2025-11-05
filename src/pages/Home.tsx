import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Calendar, Lightbulb, Users, Wrench, Quote, ArrowRight, Sparkles } from "lucide-react";
import { NavLink } from "react-router-dom";
import heroImage from "@/assets/hero-cad.jpg";
import { useQuery } from "@tanstack/react-query";
import { getHomeContent, getCommitteeMembers, getSanityImageUrl } from "@/lib/sanity";

const Home = () => {
  const { data: homeContent } = useQuery({
    queryKey: ['homeContent'],
    queryFn: getHomeContent,
  });

  const { data: committeeMembers } = useQuery({
    queryKey: ['committee'],
    queryFn: getCommitteeMembers,
  });

  const iconMap: Record<string, any> = {
    Users,
    Lightbulb,
    Calendar,
    Wrench,
  };

  const stats = homeContent?.stats || [
    { icon: "Users", label: "Active Members", value: "150+" },
    { icon: "Lightbulb", label: "Projects", value: "50+" },
    { icon: "Calendar", label: "Events Yearly", value: "20+" },
    { icon: "Wrench", label: "Workshops", value: "30+" },
  ];

  const updates = [
    {
      title: "3D Modeling Workshop",
      date: "Dec 15, 2025",
      description: "Learn advanced SolidWorks techniques from industry professionals.",
      badge: "Workshop",
    },
    {
      title: "CAD Competition 2025",
      date: "Jan 10, 2026",
      description: "Annual design competition with exciting prizes and recognition.",
      badge: "Competition",
    },
    {
      title: "New Resources Added",
      date: "Dec 1, 2025",
      description: "Check out our updated tutorial library for AutoCAD and Fusion 360.",
      badge: "Resources",
    },
  ];

  const featuredLeaders = committeeMembers?.filter(m => 
    m.role === 'faculty' || (m.role === 'executive' && ['President', 'General Secretary'].includes(m.position))
  ).slice(0, 3) || [];

  return (
    <div className="min-h-screen">
      <section className="relative h-[700px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/85 to-secondary/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-white/90 text-sm font-medium">Welcome to Excellence in Design</span>
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6">
            {homeContent?.heroTitle || "CUET CAD Club"}
          </h1>
          <p className="text-2xl md:text-3xl text-white/95 mb-4 font-light tracking-wide">
            {homeContent?.heroSubtitle || "Where Design Meets Innovation"}
          </p>
          <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
            {homeContent?.heroDescription || "Join Bangladesh's premier student organization for Computer-Aided Design excellence"}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" className="gradient-primary shadow-lg hover:shadow-xl text-lg px-10 py-6 h-auto">
              <NavLink to="/join" className="flex items-center gap-2">
                Join the Club
                <ArrowRight className="w-5 h-5" />
              </NavLink>
            </Button>
            <Button asChild size="lg" variant="outline" className="glass-card text-white border-white/30 hover:bg-white/20 hover:border-white/50 text-lg px-10 py-6 h-auto">
              <NavLink to="/about">Learn More</NavLink>
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 -mt-24 relative z-20 mb-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = iconMap[stat.icon] || Users;
            return (
              <Card key={index} className="glass-card text-center hover-lift border-0">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-primary p-4 shadow-lg">
                    <IconComponent className="w-full h-full text-primary-foreground" />
                  </div>
                  <div className="text-4xl font-display font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="container mx-auto px-4 mb-32">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-foreground">Latest Updates</h2>
          <p className="text-muted-foreground text-xl">Stay informed about our recent activities and events</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {updates.map((update, index) => (
            <Card key={index} className="hover-lift glass-card group">
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <span className="px-4 py-1.5 rounded-full text-xs font-semibold gradient-primary text-white">
                    {update.badge}
                  </span>
                </div>
                <CardTitle className="text-2xl font-display group-hover:text-primary transition-colors">{update.title}</CardTitle>
                <CardDescription className="text-accent font-semibold text-base flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {update.date}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{update.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg" className="hover-lift border-primary/30 hover:border-primary">
            <NavLink to="/events" className="flex items-center gap-2">
              View All Events
              <ArrowRight className="w-4 h-4" />
            </NavLink>
          </Button>
        </div>
      </section>

      <section className="gradient-surface py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-foreground">Leadership Messages</h2>
            <p className="text-muted-foreground text-xl">Words of wisdom and guidance from our leaders</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {featuredLeaders.map((member, index) => (
              <Card key={member._id} className={`hover-lift glass-card ${index === 1 ? 'border-2 border-primary/30' : 'border-0'}`}>
                <CardHeader className="text-center pb-4">
                  <div className="text-7xl mb-6">👤</div>
                  <CardTitle className={`text-2xl font-display ${index === 1 ? 'text-primary' : 'text-foreground'}`}>{member.name}</CardTitle>
                  <CardDescription className="text-primary font-bold text-base">{member.position}</CardDescription>
                  <CardDescription className="text-sm font-medium text-muted-foreground">{member.department}{member.year && `, ${member.year}`}</CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <Quote className="w-10 h-10 text-primary/20 absolute -top-2 -left-2" />
                  <p className="text-muted-foreground italic leading-relaxed pl-6">
                    {member.bio || `"Dedicated to advancing CAD excellence and fostering innovation within our community."`}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-foreground">Media Gallery</h2>
            <p className="text-muted-foreground text-xl">Capturing moments from our events and activities</p>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-7xl mx-auto"
          >
            <CarouselContent>
              {[
                { emoji: "🖥️", label: "Workshop Session" },
                { emoji: "🏆", label: "Competition Winners" },
                { emoji: "👥", label: "Team Activities" },
                { emoji: "🎓", label: "Guest Lectures" },
                { emoji: "🔧", label: "Hands-on Training" },
                { emoji: "🎨", label: "Design Projects" },
                { emoji: "🏭", label: "Industry Visits" },
                { emoji: "🎉", label: "Club Events" },
                { emoji: "📐", label: "CAD Tutorials" },
                { emoji: "🤝", label: "Collaboration" },
                { emoji: "💡", label: "Innovation Lab" },
                { emoji: "🎯", label: "Goal Achievement" },
              ].map((item, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                  <Card className="overflow-hidden hover-lift glass-card border-0 cursor-pointer group">
                    <div className="aspect-square gradient-primary flex items-center justify-center text-7xl relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      <span className="relative z-10 transition-transform duration-300">{item.emoji}</span>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-sm font-semibold text-center group-hover:text-primary transition-colors">{item.label}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="hover-lift border-primary/30 hover:border-primary">
              <NavLink to="/events" className="flex items-center gap-2">
                View All Photos
                <ArrowRight className="w-4 h-4" />
              </NavLink>
            </Button>
          </div>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 gradient-primary"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent/30 via-transparent to-transparent"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your CAD Journey?
          </h2>
          <p className="text-white/95 text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
            Join our community of passionate designers and engineers. Learn, create, and innovate together with the best minds in Bangladesh.
          </p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg text-lg px-12 py-6 h-auto">
            <NavLink to="/join" className="flex items-center gap-2">
              Become a Member
              <ArrowRight className="w-5 h-5" />
            </NavLink>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;