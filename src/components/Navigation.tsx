import { NavLink } from "react-router-dom";
import { Menu, X, Wrench } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/events", label: "Events" },
    { to: "/workshops", label: "Workshops" },
    { to: "/committee", label: "Committee" },
    { to: "/alumni", label: "Alumni" },
    { to: "/join", label: "Get Started" },
  ];

  return (
    <nav className="sticky top-0 z-50 glass border-b border-border/50 shadow-md backdrop-blur-2xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="gradient-primary p-3 rounded-xl shadow-md group-hover:shadow-lg transition-all">
              <Wrench className="w-7 h-7 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-display font-bold gradient-text leading-tight">CUET CAD Club</span>
              <span className="text-xs font-medium text-accent leading-tight tracking-wide">Design & Innovation</span>
            </div>
          </NavLink>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `text-sm font-medium transition-all duration-300 relative group ${
                    isActive ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"
                  }`
                }
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300"></span>
              </NavLink>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-3 rounded-xl hover:bg-primary/10 transition-colors"
          >
            {isOpen ? <X size={28} className="text-primary" /> : <Menu size={28} className="text-primary" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-6 border-t border-border/50 glass-card rounded-b-2xl">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block py-3 px-4 text-base font-medium rounded-lg mb-2 transition-all duration-300 ${
                    isActive ? "text-primary bg-primary/10 font-semibold" : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;