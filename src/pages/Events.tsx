import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getEvents, SanityEvent } from "@/lib/sanity";

const Events = () => {
  const { data: events, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  });

  const upcomingEvents = events?.filter((event: SanityEvent) => 
    event.status === 'open' || event.status === 'coming-soon'
  ) || [];

  const pastEvents = events?.filter((event: SanityEvent) => 
    event.status === 'completed'
  ) || [];

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'open': return 'Open for Registration';
      case 'coming-soon': return 'Coming Soon';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen gradient-surface">
      {/* Hero Section */}
      <section className="gradient-primary py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Events & Workshops</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Join our upcoming workshops and competitions to enhance your CAD skills
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-display font-bold mb-12 gradient-text">Upcoming Events</h2>
        {isLoading ? (
          <div className="text-center text-muted-foreground">Loading events...</div>
        ) : upcomingEvents.length === 0 ? (
          <div className="text-center text-muted-foreground">No upcoming events at the moment.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event: SanityEvent) => (
              <Card key={event._id} className="glass-card hover-lift transition-all">
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 font-semibold">
                      {getStatusLabel(event.status)}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-display mb-4">{event.title}</CardTitle>
                  <CardDescription className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-foreground">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span className="font-medium">{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-foreground">
                      <Clock className="w-5 h-5 text-primary" />
                      <span className="font-medium">{new Date(event.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-foreground">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span className="font-medium">{event.location}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Past Events */}
      <section className="glass py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-display font-bold mb-12 text-center gradient-text">Past Events Gallery</h2>
          {isLoading ? (
            <div className="text-center text-muted-foreground">Loading past events...</div>
          ) : pastEvents.length === 0 ? (
            <div className="text-center text-muted-foreground">No past events to display.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {pastEvents.map((event: SanityEvent) => (
                <Card key={event._id} className="glass-card hover-lift transition-all">
                  <CardHeader>
                    <CardTitle className="text-xl text-center font-display">{event.title}</CardTitle>
                    <CardDescription className="text-center text-primary font-semibold text-base">
                      {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground text-center leading-relaxed">{event.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-display font-bold mb-6 gradient-text">Want to Stay Updated?</h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
          Follow us on social media or join our mailing list to receive notifications about upcoming events and workshops.
        </p>
      </section>
    </div>
  );
};

export default Events;