import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Clock, Award } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getWorkshops, SanityWorkshop } from "@/lib/sanity";

const Workshops = () => {
  const { data: workshops, isLoading } = useQuery({
    queryKey: ['workshops'],
    queryFn: getWorkshops,
  });

  const upcomingWorkshops = workshops?.filter((workshop: SanityWorkshop) => 
    workshop.nextSession && new Date(workshop.nextSession) > new Date()
  ) || [];

  const pastWorkshops = workshops?.filter((workshop: SanityWorkshop) => 
    !workshop.nextSession || new Date(workshop.nextSession) <= new Date()
  ) || [];

  const getLevelBadge = (level: string) => {
    return level.charAt(0).toUpperCase() + level.slice(1);
  };

  return (
    <div className="min-h-screen gradient-surface">
      <section className="gradient-primary py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Workshops & Training</h1>
          <p className="text-xl text-white/90 max-w-2xl leading-relaxed">
            Hands-on learning experiences to master CAD software and design techniques
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-display font-bold mb-12 gradient-text">Upcoming Workshops</h2>
        {isLoading ? (
          <div className="text-center text-muted-foreground">Loading workshops...</div>
        ) : upcomingWorkshops.length === 0 ? (
          <div className="text-center text-muted-foreground">No upcoming workshops at the moment.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingWorkshops.map((workshop: SanityWorkshop) => (
              <Card key={workshop._id} className="glass-card hover-lift transition-all">
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 font-semibold">
                      {getLevelBadge(workshop.level)}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-display mb-4">{workshop.title}</CardTitle>
                  <CardDescription className="space-y-3">
                    {workshop.nextSession && (
                      <div className="flex items-center gap-3 text-sm text-foreground">
                        <Calendar className="w-5 h-5 text-primary" />
                        <span className="font-medium">{new Date(workshop.nextSession).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-sm text-foreground">
                      <Clock className="w-5 h-5 text-primary" />
                      <span className="font-medium">{workshop.duration} hours</span>
                    </div>
                    {workshop.availableSpots && (
                      <div className="flex items-center gap-3 text-sm text-foreground">
                        <Users className="w-5 h-5 text-primary" />
                        <span className="font-medium">{workshop.availableSpots} seats available</span>
                      </div>
                    )}
                    {workshop.instructor && (
                      <div className="flex items-center gap-3 text-sm text-foreground">
                        <Award className="w-5 h-5 text-primary" />
                        <span className="font-medium">{workshop.instructor}</span>
                      </div>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{workshop.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section className="glass py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-display font-bold mb-12 text-center gradient-text">Past Workshops</h2>
          {isLoading ? (
            <div className="text-center text-muted-foreground">Loading past workshops...</div>
          ) : pastWorkshops.length === 0 ? (
            <div className="text-center text-muted-foreground">No past workshops to display.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {pastWorkshops.map((workshop: SanityWorkshop) => (
                <Card key={workshop._id} className="glass-card hover-lift transition-all">
                  <CardHeader>
                    <CardTitle className="text-xl font-display">{workshop.title}</CardTitle>
                    <CardDescription className="text-primary font-semibold text-base">
                      {getLevelBadge(workshop.level)} Level
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-foreground">
                      <Clock className="w-5 h-5 text-primary" />
                      <span className="font-medium">{workshop.duration} hours</span>
                    </div>
                    {workshop.instructor && (
                      <div className="flex items-center gap-3 text-sm text-foreground">
                        <Award className="w-5 h-5 text-primary" />
                        <span className="font-medium">{workshop.instructor}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-display font-bold mb-6 gradient-text">How to Register</h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
          Registration opens two weeks before each workshop. Members receive priority access and special discounts.
        </p>
      </section>
    </div>
  );
};

export default Workshops;