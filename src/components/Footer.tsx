import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";

const Footer = () => {
  const quickLinks = [
    { to: "/about", label: "About Us" },
    { to: "/events", label: "Events" },
    { to: "/workshops", label: "Workshops" },
    { to: "/committee", label: "Committee" },
    { to: "/alumni", label: "Alumni" },
    { to: "/join", label: "Join Us" },
  ];

  const socialLinks = [
    { icon: Facebook, label: "Facebook", href: "#", color: "hover:text-[#1877F2]" },
    { icon: Instagram, label: "Instagram", href: "#", color: "hover:text-[#E4405F]" },
    { icon: Linkedin, label: "LinkedIn", href: "#", color: "hover:text-[#0A66C2]" },
  ];

  return (
    <footer className="relative gradient-secondary text-white mt-32 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-grid-white/[0.02]"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="gradient-accent p-3 rounded-xl shadow-gold">
                <span className="text-2xl">⚙️</span>
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold">CUET CAD Club</h3>
                <p className="text-sm text-accent font-semibold">Design & Innovation</p>
              </div>
            </div>
            <p className="text-white/80 leading-relaxed mb-6">
              Empowering students with Computer-Aided Design skills and innovation. Building the future, one design at a time.
            </p>
            <Button asChild size="sm" className="btn-premium bg-white text-primary hover:bg-white/90">
              <NavLink to="/join" className="flex items-center gap-2">
                Join Now
                <ArrowRight className="w-4 h-4" />
              </NavLink>
            </Button>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6 text-accent">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <NavLink 
                  key={link.to}
                  to={link.to} 
                  className="text-white/80 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group"
                >
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6 text-accent">Contact Us</h4>
            <div className="flex flex-col gap-4 text-white/80">
              <div className="flex items-start gap-3 group hover:text-white transition-colors">
                <MapPin className="w-5 h-5 mt-0.5 text-accent" />
                <div>
                  <p className="font-medium">CUET Campus</p>
                  <p className="text-sm">Chittagong, Bangladesh</p>
                </div>
              </div>
              <div className="flex items-center gap-3 group hover:text-white transition-colors">
                <Mail className="w-5 h-5 text-accent" />
                <a href="mailto:cadclub@cuet.ac.bd" className="hover:underline">
                  cadclub@cuet.ac.bd
                </a>
              </div>
              <div className="flex items-center gap-3 group hover:text-white transition-colors">
                <Phone className="w-5 h-5 text-accent" />
                <a href="tel:+8801234567890" className="hover:underline">
                  +880 123 456 7890
                </a>
              </div>
            </div>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6 text-accent">Connect With Us</h4>
            <p className="text-white/80 mb-4 text-sm">
              Follow us on social media for the latest updates and events.
            </p>
            <div className="flex gap-4 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={`p-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300 hover:-translate-y-1 ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <div className="glass-card p-4 rounded-lg">
              <p className="text-sm text-white/90 font-medium">
                🎯 Join <span className="text-accent font-bold">150+</span> active members
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/70 text-sm">
              &copy; {new Date().getFullYear()} CUET CAD Club. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-white/70">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Code of Conduct</a>
            </div>
          </div>
          <p className="text-center md:text-left text-white/50 text-xs mt-4">
            Made with ❤️ by CUET CAD Club Development Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;