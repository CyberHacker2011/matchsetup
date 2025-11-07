import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Laptop } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/matching", label: "Find Match" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 font-semibold text-lg hover-elevate px-2 py-1 rounded-md cursor-pointer" data-testid="link-logo">
              <Laptop className="w-6 h-6 text-primary" />
              <span>LaptopMatch</span>
            </div>
          </Link>

          <nav className="flex items-center gap-2">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                variant={location === link.href ? "default" : "ghost"}
                data-testid={`link-nav-${link.label.toLowerCase().replace(" ", "-")}`}
                asChild
              >
                <Link href={link.href}>
                  {link.label}
                </Link>
              </Button>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t py-8 px-4 bg-card">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p data-testid="text-footer">
            © 2024 LaptopMatch. Find your perfect laptop with intelligent matching.
          </p>
        </div>
      </footer>
    </div>
  );
}
