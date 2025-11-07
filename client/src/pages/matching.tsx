import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Search } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { Laptop } from "@shared/schema";

interface MatchResult {
  laptop: Laptop;
  matchScore: number;
}

export default function Matching() {
  const [searchCriteria, setSearchCriteria] = useState({
    name: "",
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

  const matchMutation = useMutation({
    mutationFn: async (criteria: typeof searchCriteria) => {
      const response = await apiRequest("POST", "/api/laptops/match", criteria);
      const data = await response.json();
      return data as MatchResult[];
    },
  });

  const handleInputChange = (field: string, value: string) => {
    setSearchCriteria((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    matchMutation.mutate(searchCriteria);
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

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center" data-testid="text-matching-title">
          Find Your Perfect Match
        </h1>

        {/* Search Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search Criteria</CardTitle>
            <p className="text-sm text-muted-foreground">
              Fill in any specifications you're looking for. All fields are optional.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Laptop Name</Label>
                  <Input
                    id="name"
                    data-testid="input-name"
                    placeholder="e.g., Dell XPS 15"
                    value={searchCriteria.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cpu">CPU</Label>
                  <Input
                    id="cpu"
                    data-testid="input-cpu"
                    placeholder="e.g., Intel i7, AMD Ryzen 9"
                    value={searchCriteria.cpu}
                    onChange={(e) => handleInputChange("cpu", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gpu">GPU</Label>
                  <Input
                    id="gpu"
                    data-testid="input-gpu"
                    placeholder="e.g., NVIDIA RTX 3060"
                    value={searchCriteria.gpu}
                    onChange={(e) => handleInputChange("gpu", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ram">RAM</Label>
                  <Input
                    id="ram"
                    data-testid="input-ram"
                    placeholder="e.g., 16GB, 32GB DDR4"
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
                  <Label htmlFor="screenSpecs">Screen Specs</Label>
                  <Input
                    id="screenSpecs"
                    data-testid="input-screen"
                    placeholder='e.g., 15.6" FHD 144Hz'
                    value={searchCriteria.screenSpecs}
                    onChange={(e) => handleInputChange("screenSpecs", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    data-testid="input-weight"
                    type="number"
                    step="0.01"
                    placeholder="e.g., 1.8"
                    value={searchCriteria.weight}
                    onChange={(e) => handleInputChange("weight", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Max Price (USD)</Label>
                  <Input
                    id="price"
                    data-testid="input-price"
                    type="number"
                    step="0.01"
                    placeholder="e.g., 2000"
                    value={searchCriteria.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="useCase">Use Case</Label>
                  <Select
                    value={searchCriteria.useCase}
                    onValueChange={(value) => handleInputChange("useCase", value === "any" ? "" : value)}
                  >
                    <SelectTrigger id="useCase" data-testid="select-usecase">
                      <SelectValue placeholder="Select use case" />
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

              <Button
                type="submit"
                size="lg"
                className="w-full md:w-auto"
                disabled={matchMutation.isPending}
                data-testid="button-find-match"
              >
                {matchMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Finding Matches...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Find Best Match
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        {matchMutation.isSuccess && matchMutation.data && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold" data-testid="text-results-title">
              {matchMutation.data.length > 0
                ? `Found ${matchMutation.data.length} Matching Laptop${matchMutation.data.length !== 1 ? "s" : ""}`
                : "No Matches Found"}
            </h2>

            {matchMutation.data.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground" data-testid="text-no-results">
                    No laptops match your criteria. Try adjusting your search parameters or adding fewer filters.
                  </p>
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
                    <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-4">
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
                          <span className="font-mono text-right">{result.laptop.cpu}</span>
                        </div>
                        <div className="flex justify-between gap-2">
                          <span className="font-medium text-muted-foreground">GPU:</span>
                          <span className="font-mono text-right">{result.laptop.gpu}</span>
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
                          <span className="font-mono text-right">{result.laptop.screenSpecs}</span>
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
        )}

        {matchMutation.isError && (
          <Card className="border-destructive">
            <CardContent className="py-12 text-center">
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
