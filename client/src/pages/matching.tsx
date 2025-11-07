import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Loader2, ArrowRight, ArrowLeft, SkipForward } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { Laptop } from "@shared/schema";

interface MatchResult {
  laptop: Laptop;
  matchScore: number;
}

export default function Matching() {
  const [currentStep, setCurrentStep] = useState(1);
  const [searchCriteria, setSearchCriteria] = useState({
    storage: "",
    ram: "",
    cpu: "",
    gpu: "",
    screenSpecs: "",
    weight: "",
    price: "",
    useCase: "",
    tier: "",
  });
  const [showResults, setShowResults] = useState(false);

  const matchMutation = useMutation({
    mutationFn: async (criteria: typeof searchCriteria) => {
      const response = await apiRequest("POST", "/api/laptops/match", criteria);
      const data = await response.json();
      return data as MatchResult[];
    },
    onSuccess: () => {
      setShowResults(true);
    },
  });

  const handleInputChange = (field: string, value: string) => {
    setSearchCriteria((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      matchMutation.mutate(searchCriteria);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      matchMutation.mutate(searchCriteria);
    }
  };

  const handleSearchAgain = () => {
    setShowResults(false);
    setCurrentStep(1);
    setSearchCriteria({
      storage: "",
      ram: "",
      cpu: "",
      gpu: "",
      screenSpecs: "",
      weight: "",
      price: "",
      useCase: "",
      tier: "",
    });
    matchMutation.reset();
  };

  const getTierColor = (tier: string) => {
    switch (tier.toLowerCase()) {
      case "budget":
        return "bg-secondary text-secondary-foreground";
      case "mid-range":
        return "bg-accent text-accent-foreground";
      case "premium":
        return "bg-primary text-primary-foreground";
      case "flagship":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const progressPercentage = (currentStep / 3) * 100;

  if (showResults && matchMutation.data) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold" data-testid="text-results-title">
              {matchMutation.data.length > 0
                ? `Found ${matchMutation.data.length} Matching Laptop${matchMutation.data.length !== 1 ? "s" : ""}`
                : "No Matches Found"}
            </h1>
            <Button onClick={handleSearchAgain} size="lg" data-testid="button-search-again">
              Search Again
            </Button>
          </div>

          {matchMutation.data.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-6" data-testid="text-no-results">
                  No laptops match your criteria. Try adjusting your search parameters.
                </p>
                <Button onClick={handleSearchAgain} data-testid="button-try-again">
                  Try Again
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchMutation.data.map((result, index) => (
                <Card
                  key={result.laptop.id}
                  className="hover-elevate"
                  data-testid={`card-laptop-${index}`}
                >
                  <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-4">
                    <CardTitle className="text-lg line-clamp-2">
                      {result.laptop.name}
                    </CardTitle>
                    <Badge
                      className="flex-shrink-0"
                      data-testid={`badge-match-${index}`}
                    >
                      {Math.round(result.matchScore)}% Match
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between gap-2">
                        <span className="font-medium text-muted-foreground">CPU:</span>
                        <span className="font-mono text-right text-xs">{result.laptop.cpu}</span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="font-medium text-muted-foreground">GPU:</span>
                        <span className="font-mono text-right text-xs">{result.laptop.gpu}</span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="font-medium text-muted-foreground">RAM:</span>
                        <span className="font-mono text-right">{result.laptop.ram}</span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="font-medium text-muted-foreground">Storage:</span>
                        <span className="font-mono text-right">{result.laptop.storage}</span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="font-medium text-muted-foreground">Screen:</span>
                        <span className="font-mono text-right text-xs">{result.laptop.screenSpecs}</span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="font-medium text-muted-foreground">Weight:</span>
                        <span className="font-mono text-right">{result.laptop.weight} kg</span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="font-medium text-muted-foreground">Use Case:</span>
                        <span className="text-right">{result.laptop.useCase}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t flex items-center justify-between gap-2">
                      <Badge className={getTierColor(result.laptop.tier)}>
                        {result.laptop.tier}
                      </Badge>
                      <span className="text-lg font-bold text-primary">
                        ${result.laptop.price}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-center" data-testid="text-matching-title">
            Find Your Perfect Laptop
          </h1>
          <p className="text-center text-muted-foreground">
            Step {currentStep} of 3
          </p>
        </div>

        <div className="mb-8">
          <Progress value={progressPercentage} className="h-2" data-testid="progress-wizard" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && "What will you use it for?"}
              {currentStep === 2 && "Portability & Display Preferences"}
              {currentStep === 3 && "Performance & Budget"}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Select your primary use case"}
              {currentStep === 2 && "Choose your preferred weight and screen size"}
              {currentStep === 3 && "Specify your performance requirements and budget"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="useCase">Use Case</Label>
                  <Select
                    value={searchCriteria.useCase}
                    onValueChange={(value) => handleInputChange("useCase", value === "any" ? "" : value)}
                  >
                    <SelectTrigger id="useCase" data-testid="select-usecase">
                      <SelectValue placeholder="Select your primary use case" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="Gaming">Gaming</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Content Creation">Content Creation</SelectItem>
                      <SelectItem value="General Use">General Use</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Maximum Weight (kg)</Label>
                  <Input
                    id="weight"
                    data-testid="input-weight"
                    type="number"
                    step="0.01"
                    placeholder="e.g., 2.0"
                    value={searchCriteria.weight}
                    onChange={(e) => handleInputChange("weight", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Leave empty if weight doesn't matter
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="screenSpecs">Screen Preferences</Label>
                  <Input
                    id="screenSpecs"
                    data-testid="input-screen"
                    placeholder='e.g., 15.6", FHD, 144Hz, OLED'
                    value={searchCriteria.screenSpecs}
                    onChange={(e) => handleInputChange("screenSpecs", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Specify size, resolution, refresh rate, or panel type
                  </p>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cpu">CPU Preference</Label>
                    <Input
                      id="cpu"
                      data-testid="input-cpu"
                      placeholder="e.g., Intel i7, AMD Ryzen 9"
                      value={searchCriteria.cpu}
                      onChange={(e) => handleInputChange("cpu", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gpu">GPU Preference</Label>
                    <Input
                      id="gpu"
                      data-testid="input-gpu"
                      placeholder="e.g., NVIDIA RTX 4060"
                      value={searchCriteria.gpu}
                      onChange={(e) => handleInputChange("gpu", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ram">RAM</Label>
                    <Input
                      id="ram"
                      data-testid="input-ram"
                      placeholder="e.g., 16GB, 32GB DDR5"
                      value={searchCriteria.ram}
                      onChange={(e) => handleInputChange("ram", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="storage">Storage</Label>
                    <Input
                      id="storage"
                      data-testid="input-storage"
                      placeholder="e.g., 512GB SSD, 1TB NVMe"
                      value={searchCriteria.storage}
                      onChange={(e) => handleInputChange("storage", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Maximum Budget (USD)</Label>
                    <Input
                      id="price"
                      data-testid="input-price"
                      type="number"
                      step="0.01"
                      placeholder="e.g., 1500"
                      value={searchCriteria.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tier">Tier</Label>
                    <Select
                      value={searchCriteria.tier}
                      onValueChange={(value) => handleInputChange("tier", value === "any" ? "" : value)}
                    >
                      <SelectTrigger id="tier" data-testid="select-tier">
                        <SelectValue placeholder="Select tier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="Budget">Budget</SelectItem>
                        <SelectItem value="Mid-Range">Mid-Range</SelectItem>
                        <SelectItem value="Premium">Premium</SelectItem>
                        <SelectItem value="Flagship">Flagship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between gap-4 pt-4">
              <div className="flex gap-2">
                {currentStep > 1 && (
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    data-testid="button-back"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  onClick={handleSkip}
                  data-testid="button-skip"
                >
                  <SkipForward className="mr-2 h-4 w-4" />
                  Skip
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={matchMutation.isPending}
                  data-testid="button-next"
                >
                  {matchMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Finding...
                    </>
                  ) : currentStep === 3 ? (
                    "Find Matches"
                  ) : (
                    <>
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {matchMutation.isError && (
          <Card className="mt-6 border-destructive">
            <CardContent className="py-6 text-center">
              <p className="text-destructive" data-testid="text-error">
                An error occurred while searching. Please try again.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
