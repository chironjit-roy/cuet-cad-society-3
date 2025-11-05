import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Users, Award, Lightbulb } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getJoinContent } from "@/lib/sanity";

const Join = () => {
  const { toast } = useToast();
  const { data: joinContent } = useQuery({
    queryKey: ['joinContent'],
    queryFn: getJoinContent,
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentId: "",
    department: "",
    year: "",
    experience: "",
    motivation: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Submitted!",
      description: "Thank you for your interest. We'll contact you soon via email.",
    });
    setFormData({
      name: "",
      email: "",
      studentId: "",
      department: "",
      year: "",
      experience: "",
      motivation: "",
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const iconMap: Record<string, any> = {
    Users,
    Award,
    Lightbulb,
  };

  const benefits = joinContent?.benefits || [
    {
      icon: "Users",
      title: "Community Access",
      description: "Join a network of passionate designers and engineers from all departments.",
    },
    {
      icon: "Award",
      title: "Skill Development",
      description: "Free workshops, tutorials, and hands-on training with industry-standard software.",
    },
    {
      icon: "Lightbulb",
      title: "Project Opportunities",
      description: "Work on real-world projects and build an impressive portfolio for your career.",
    },
  ];

  return (
    <div className="min-h-screen gradient-surface">
      {/* Hero Section */}
      <section className="gradient-primary py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Join CUET CAD Club</h1>
          <p className="text-xl text-white/90 max-w-2xl leading-relaxed">
            Start your journey in Computer-Aided Design and engineering innovation
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-display font-bold text-center mb-16 text-foreground">Why Join Us?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => {
            const IconComponent = iconMap[benefit.icon] || Users;
            return (
              <Card 
                key={index} 
                className="text-center glass-card hover-lift transition-all"
              >
                <CardHeader>
                  <IconComponent className="w-16 h-16 mx-auto mb-6 text-primary" />
                  <CardTitle className="text-2xl font-display">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Membership Form */}
      <section className="glass py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-3xl font-display">Membership Application</CardTitle>
                <CardDescription className="text-base">
                  Fill out the form below to apply for membership. We welcome students from all departments and experience levels.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base font-semibold">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Enter your full name"
                      required
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-semibold">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="your.email@cuet.ac.bd"
                      required
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="studentId" className="text-base font-semibold">Student ID *</Label>
                    <Input
                      id="studentId"
                      value={formData.studentId}
                      onChange={(e) => handleChange("studentId", e.target.value)}
                      placeholder="e.g., 1904001"
                      required
                      className="h-12"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="department" className="text-base font-semibold">Department *</Label>
                      <Select value={formData.department} onValueChange={(value) => handleChange("department", value)}>
                        <SelectTrigger id="department" className="h-12">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ce">Civil Engineering</SelectItem>
                          <SelectItem value="me">Mechanical Engineering</SelectItem>
                          <SelectItem value="eee">Electrical & Electronic Engineering</SelectItem>
                          <SelectItem value="cse">Computer Science & Engineering</SelectItem>
                          <SelectItem value="architecture">Architecture</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="year" className="text-base font-semibold">Year of Study *</Label>
                      <Select value={formData.year} onValueChange={(value) => handleChange("year", value)}>
                        <SelectTrigger id="year" className="h-12">
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1st Year</SelectItem>
                          <SelectItem value="2">2nd Year</SelectItem>
                          <SelectItem value="3">3rd Year</SelectItem>
                          <SelectItem value="4">4th Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience" className="text-base font-semibold">CAD Experience Level *</Label>
                    <Select value={formData.experience} onValueChange={(value) => handleChange("experience", value)}>
                      <SelectTrigger id="experience" className="h-12">
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner (No prior experience)</SelectItem>
                        <SelectItem value="intermediate">Intermediate (Some experience)</SelectItem>
                        <SelectItem value="advanced">Advanced (Proficient user)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="motivation" className="text-base font-semibold">Why do you want to join? *</Label>
                    <Textarea
                      id="motivation"
                      value={formData.motivation}
                      onChange={(e) => handleChange("motivation", e.target.value)}
                      placeholder="Tell us about your interest in CAD and what you hope to achieve..."
                      rows={6}
                      required
                      className="resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full h-14 text-lg gradient-primary text-white shadow-glow" size="lg">
                    <CheckCircle2 className="w-6 h-6 mr-2" />
                    Submit Application
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-display font-bold mb-6 text-foreground">Have Questions?</h2>
        <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          Feel free to reach out to us via email or visit our club room during office hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-3xl mx-auto">
          <Card className="text-left glass-card hover-lift flex-1">
            <CardHeader>
              <CardTitle className="text-xl font-display">Email Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground font-medium">{joinContent?.contactEmail || "cadclub@cuet.ac.bd"}</p>
            </CardContent>
          </Card>
          <Card className="text-left glass-card hover-lift flex-1">
            <CardHeader>
              <CardTitle className="text-xl font-display">Visit Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground font-medium">{joinContent?.officeLocation || "Club Room 204, Student Center"}</p>
              <p className="text-sm text-muted-foreground mt-2">{joinContent?.officeHours || "Saturdays, 2 PM - 5 PM"}</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Join;
