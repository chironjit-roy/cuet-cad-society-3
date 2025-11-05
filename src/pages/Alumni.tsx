import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, GraduationCap, Trophy, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAlumniProfiles, SanityAlumniProfile } from "@/lib/sanity";

const Alumni = () => {
  const { data: alumni, isLoading } = useQuery({
    queryKey: ['alumni'],
    queryFn: getAlumniProfiles,
  });

  const featuredAlumni = alumni?.filter((a: SanityAlumniProfile) => a.featured) || [];
  const allAlumni = alumni || [];

  const alumniStats = [
    { icon: GraduationCap, label: "Total Alumni", value: allAlumni.length > 0 ? `${allAlumni.length}+` : "500+" },
    { icon: Briefcase, label: "Employed", value: "95%" },
    { icon: Trophy, label: "Industry Awards", value: "50+" },
    { icon: Users, label: "Countries", value: "25+" },
  ];

  // Group alumni by year
  const alumniByYear = allAlumni.reduce((acc: any, alumni: SanityAlumniProfile) => {
    const year = alumni.graduationYear;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(alumni);
    return acc;
  }, {});

  const sortedYears = Object.keys(alumniByYear).sort((a, b) => parseInt(b) - parseInt(a)).slice(0, 4);

  return (
    <div className="min-h-screen gradient-surface">
      <section className="gradient-primary py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Alumni Network</h1>
          <p className="text-xl text-white/90 max-w-2xl leading-relaxed">Celebrating achievements of our graduated members worldwide</p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 -mt-10 relative z-20 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {alumniStats.map((stat, index) => (
            <Card 
              key={index} 
              className="text-center glass-card hover-lift"
            >
              <CardContent className="pt-8">
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <div className="text-4xl font-display font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Alumni */}
      <section className="container mx-auto px-4 mb-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold mb-4 gradient-text">Featured Alumni</h2>
          <p className="text-muted-foreground text-lg">Outstanding members making their mark in the industry</p>
        </div>
        {isLoading ? (
          <div className="text-center text-muted-foreground">Loading alumni...</div>
        ) : featuredAlumni.length === 0 ? (
          <div className="text-center text-muted-foreground">No featured alumni to display.</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {featuredAlumni.map((alumniProfile: SanityAlumniProfile) => (
              <Card 
                key={alumniProfile._id} 
                className="glass-card hover-lift"
              >
                <CardHeader className="text-center">
                  <div className="text-7xl mb-6 mx-auto">👤</div>
                  <CardTitle className="text-2xl font-display mb-3">{alumniProfile.name}</CardTitle>
                  <p className="text-primary font-semibold">Class of {alumniProfile.graduationYear}</p>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <p className="font-semibold text-foreground text-lg">{alumniProfile.currentPosition}</p>
                  <p className="text-muted-foreground font-medium">{alumniProfile.company}</p>
                  <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{alumniProfile.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Alumni by Year */}
      <section className="glass py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4 gradient-text">Recent Graduating Classes</h2>
          </div>
          {isLoading ? (
            <div className="text-center text-muted-foreground">Loading graduation data...</div>
          ) : sortedYears.length === 0 ? (
            <div className="text-center text-muted-foreground">No graduation data available.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {sortedYears.map((year: string) => (
                <Card 
                  key={year} 
                  className="glass-card hover-lift"
                >
                  <CardHeader>
                    <CardTitle className="text-3xl font-display text-center gradient-text">{year}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-3">
                    <p className="text-4xl font-display font-bold text-primary">{alumniByYear[year].length}</p>
                    <p className="text-sm text-muted-foreground font-semibold">Members</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Success Stories */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold mb-4 gradient-text">Success Stories</h2>
          <p className="text-muted-foreground text-lg">Inspiring journeys from our alumni community</p>
        </div>
        {isLoading ? (
          <div className="text-center text-muted-foreground">Loading success stories...</div>
        ) : allAlumni.length === 0 ? (
          <div className="text-center text-muted-foreground">No alumni profiles to display.</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {allAlumni.slice(0, 6).map((alumniProfile: SanityAlumniProfile) => (
              <Card 
                key={alumniProfile._id} 
                className="glass-card hover-lift"
              >
                <CardHeader>
                  <CardTitle className="text-xl font-display mb-3">{alumniProfile.name}</CardTitle>
                  <p className="text-primary font-semibold text-lg">{alumniProfile.currentPosition}</p>
                  <p className="text-sm text-muted-foreground font-medium">Class of {alumniProfile.graduationYear}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{alumniProfile.bio}</p>
                  {alumniProfile.achievements && alumniProfile.achievements.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {alumniProfile.achievements.slice(0, 2).map((achievement, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground">• {achievement}</li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Alumni Network CTA */}
      <section className="gradient-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Join Our Alumni Network
          </h2>
          <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Stay connected with fellow alumni, mentor current students, and continue being part of the CUET CAD Club community.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Alumni;
