import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
export function Footer() {
  const quickLinks = [{
    name: "Home",
    path: "/"
  }, {
    name: "Solutions",
    path: "/solutions"
  }, {
    name: "Work",
    path: "/work"
  }, {
    name: "About",
    path: "/about"
  }, {
    name: "Privacy Policy",
    path: "/privacy"
  }, {
    name: "Terms of Use",
    path: "/terms"
  }];
  const companyInfo = [{
    name: "Our Story",
    path: "/story"
  }, {
    name: "Careers",
    path: "/careers"
  }, {
    name: "Press",
    path: "/press"
  }, {
    name: "Contact",
    path: "/contact"
  }, {
    name: "Support",
    path: "/support"
  }];
  return <footer className="border-t bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <span className="text-lg font-bold text-teal-500">S</span>
              </div>
              <span className="font-bold text-foreground">SynergySphere</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering teams to collaborate, innovate, and achieve extraordinary results together.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Company</h3>
            <ul className="space-y-3">
              {companyInfo.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Connect With Us</h3>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Stay updated with our latest features and updates.
              </p>
              <div className="flex space-x-2">
                <input type="email" placeholder="Enter your email" className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                <Button size="sm" className="bg-gradient-primary text-white hover:opacity-90">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Banner Area */}
        <div className="mt-12 rounded-lg bg-gradient-primary p-8 text-center">
          <h3 className="mb-2 text-xl font-semibold text-slate-950">
            Ready to Transform Your Team's Productivity?
          </h3>
          <p className="mb-4 text-slate-950">
            Join thousands of teams already using SynergySphere to achieve their goals.
          </p>
          <Button variant="secondary" size="lg">
            Get Started Free
          </Button>
        </div>

        {/* Bottom Footer */}
        <div className="mt-8 border-t pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2024 SynergySphere. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>;
}