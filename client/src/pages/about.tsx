import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function About() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center" data-testid="text-about-title">
          About Us
        </h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p data-testid="text-mission">
              We believe finding the perfect laptop shouldn't be overwhelming. With countless models, specifications, and price points, making an informed decision can be challenging. Our laptop matching platform simplifies this process by using intelligent algorithms to match your requirements with the best available options.
            </p>
            <p>
              Whether you're a gamer seeking high-performance graphics, a business professional needing portability and battery life, or a content creator requiring powerful processing capabilities, our platform helps you discover laptops that truly fit your needs.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex gap-4" data-testid="step-1">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Enter Your Requirements</h3>
                  <p className="text-sm text-muted-foreground">
                    Fill in any specifications you're looking for - CPU, GPU, RAM, storage, screen size, weight, price range, or use case. You don't need to fill every field; our algorithm works with partial information.
                  </p>
                </div>
              </div>

              <div className="flex gap-4" data-testid="step-2">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Smart Algorithm Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Our matching algorithm analyzes your criteria against our comprehensive database, calculating similarity scores across all specifications to find the best matches.
                  </p>
                </div>
              </div>

              <div className="flex gap-4" data-testid="step-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Review Your Matches</h3>
                  <p className="text-sm text-muted-foreground">
                    Get a sorted list of laptops ranked by how well they match your requirements. Each result shows a match score and complete specifications for easy comparison.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
