import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Database, Target } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4" data-testid="text-hero-title">
            Find Your Perfect Laptop
          </h1>
          <p className="text-xl text-muted-foreground mb-8" data-testid="text-hero-subtitle">
            Our smart matching algorithm analyzes your requirements and finds the best laptops that fit your needs, even with partial specifications.
          </p>
          <Link href="/matching">
            <Button size="lg" className="text-lg px-8" data-testid="button-start-matching">
              Start Matching
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover-elevate" data-testid="card-feature-smart-matching">
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-3 rounded-md bg-primary/10">
                    <Search className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Smart Matching</CardTitle>
                </div>
                <CardDescription>
                  Advanced algorithm that finds the best laptop matches based on your criteria, even with incomplete specifications.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-elevate" data-testid="card-feature-comprehensive">
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-3 rounded-md bg-primary/10">
                    <Database className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Comprehensive Database</CardTitle>
                </div>
                <CardDescription>
                  Extensive collection of laptops with detailed specifications including CPU, GPU, RAM, storage, and more.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-elevate" data-testid="card-feature-best-price">
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-3 rounded-md bg-primary/10">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Best Price-Performance</CardTitle>
                </div>
                <CardDescription>
                  Compare laptops across different tiers and use cases to find the perfect balance of features and value.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
