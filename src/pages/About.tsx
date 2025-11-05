import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Award } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAboutContent } from "@/lib/sanity";

const About = () => {
  const { data: aboutContent } = useQuery({
    queryKey: ['aboutContent'],
    queryFn: getAboutContent,
  });

  return (
    <div className="min-h-screen gradient-surface">
      <section className="gradient-primary py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">About CUET CAD Club</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Fostering excellence in Computer-Aided Design through learning, collaboration, and innovation
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center glass-card hover-lift transition-all">
            <CardHeader>
              <Target className="w-16 h-16 mx-auto mb-6 text-primary" />
              <CardTitle className="text-2xl font-display">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {aboutContent?.mission || "To provide students with hands-on CAD experience and industry-relevant skills through workshops, projects, and mentorship."}
              </p>
            </CardContent>
          </Card>

          <Card className="text-center glass-card hover-lift transition-all">
            <CardHeader>
              <Award className="w-16 h-16 mx-auto mb-6 text-primary" />
              <CardTitle className="text-2xl font-display">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {aboutContent?.vision || "To be the leading student organization fostering design innovation and technical excellence at CUET and beyond."}
              </p>
            </CardContent>
          </Card>

          <Card className="text-center glass-card hover-lift transition-all">
            <CardHeader>
              <Users className="w-16 h-16 mx-auto mb-6 text-primary" />
              <CardTitle className="text-2xl font-display">Our Community</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {aboutContent?.communityDescription || "A diverse community of passionate students from all departments, united by a love for design and engineering."}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="glass py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-display font-bold text-center mb-16 text-foreground">What We Do</h2>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            {(aboutContent?.activities || [
              { title: "Workshops & Training", description: "Regular hands-on sessions covering AutoCAD, SolidWorks, Fusion 360, and other industry-standard tools." },
              { title: "Project Development", description: "Collaborative projects that solve real-world problems and build portfolios for future careers." },
              { title: "Competitions", description: "Annual design challenges and participation in national/international CAD competitions." },
              { title: "Industry Connections", description: "Networking events with professionals, guest lectures, and industry visit opportunities." }
            ]).map((activity, index) => (
              <div key={index} className="glass-card p-8 rounded-2xl hover-lift">
                <h3 className="text-2xl font-display font-semibold mb-4 text-primary">{activity.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {activity.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
