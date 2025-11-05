import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getCommitteeMembers, SanityCommitteeMember } from "@/lib/sanity";

const Committee = () => {
  const { data: members, isLoading } = useQuery({
    queryKey: ['committee'],
    queryFn: getCommitteeMembers,
  });

  const facultyAdvisor = members?.find((m: SanityCommitteeMember) => m.role === 'faculty');
  const executiveBoard = members?.filter((m: SanityCommitteeMember) => m.role === 'executive').sort((a, b) => (a.order || 0) - (b.order || 0)) || [];
  const teamMembers = members?.filter((m: SanityCommitteeMember) => m.role === 'member').sort((a, b) => (a.order || 0) - (b.order || 0)) || [];

  return (
    <div className="min-h-screen gradient-surface">
      <section className="gradient-primary py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Committee Members</h1>
          <p className="text-xl text-white/90 max-w-2xl leading-relaxed">Meet the dedicated team driving our club's mission forward</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold mb-6 gradient-text">Faculty Advisor</h2>
        </div>
        {isLoading ? (
          <div className="text-center text-muted-foreground">Loading faculty advisor...</div>
        ) : facultyAdvisor ? (
          <Card className="max-w-3xl mx-auto glass-card hover-lift transition-all">
            <CardContent className="flex flex-col md:flex-row items-center gap-8 pt-8">
              <div className="text-8xl">👨‍🏫</div>
              <div className="text-center md:text-left flex-1">
                <h3 className="text-3xl font-display font-bold mb-3">{facultyAdvisor.name}</h3>
                <p className="text-xl text-primary mb-3">{facultyAdvisor.position}, {facultyAdvisor.department}</p>
                {facultyAdvisor.bio && (
                  <p className="text-muted-foreground mb-6 leading-relaxed">{facultyAdvisor.bio}</p>
                )}
                <a href={`mailto:${facultyAdvisor.email}`} className="text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-2">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="text-center text-muted-foreground">No faculty advisor information available.</div>
        )}
      </section>

      <section className="glass py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4 gradient-text">Executive Board</h2>
          </div>
          {isLoading ? (
            <div className="text-center text-muted-foreground">Loading executive board...</div>
          ) : executiveBoard.length === 0 ? (
            <div className="text-center text-muted-foreground">No executive board members to display.</div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {executiveBoard.map((member: SanityCommitteeMember) => (
                <Card key={member._id} className="glass-card hover-lift transition-all">
                  <CardHeader className="text-center">
                    <div className="text-7xl mb-6">👤</div>
                    <CardTitle className="text-2xl font-display mb-3">{member.name}</CardTitle>
                    <p className="text-primary font-semibold text-lg">{member.position}</p>
                  </CardHeader>
                  <CardContent className="text-center space-y-3">
                    <p className="text-sm text-muted-foreground">{member.department}</p>
                    {member.year && <p className="text-sm text-muted-foreground">{member.year}</p>}
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
                        <Mail className="w-4 h-4" /> {member.email}
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold mb-4 gradient-text">Committee Members</h2>
        </div>
        {isLoading ? (
          <div className="text-center text-muted-foreground">Loading committee members...</div>
        ) : teamMembers.length === 0 ? (
          <div className="text-center text-muted-foreground">No committee members to display.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member: SanityCommitteeMember) => (
              <Card key={member._id} className="glass-card hover-lift transition-all">
                <CardHeader>
                  <CardTitle className="text-xl font-display">{member.name}</CardTitle>
                  <p className="text-primary font-semibold">{member.position}</p>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">{member.department}</p>
                  {member.year && <p className="text-sm text-muted-foreground">{member.year}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section className="gradient-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <Users className="w-20 h-20 mx-auto mb-6 text-white" />
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Interested in Joining the Committee?</h2>
          <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto leading-relaxed">We hold elections annually for committee positions.</p>
        </div>
      </section>
    </div>
  );
};

export default Committee;