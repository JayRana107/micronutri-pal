import { useState, useRef } from 'react';
import { MealEntry } from '@/data/nutritionDatabase';
import HeroSection from '@/components/HeroSection';
import FoodInput from '@/components/FoodInput';
import NutritionDashboard from '@/components/NutritionDashboard';

const Index = () => {
  const [meals, setMeals] = useState<MealEntry[]>([]);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    inputRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAddMeal = (entry: MealEntry) => {
    setMeals(prev => [...prev, entry]);
  };

  const handleRemoveMeal = (id: string) => {
    setMeals(prev => prev.filter(m => m.id !== id));
  };

  const handleAnalyze = () => {
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌿</span>
            <span className="font-heading font-bold text-foreground">
              Nutri<span className="text-primary">Scan</span>
            </span>
          </div>
          <span className="text-xs text-muted-foreground hidden sm:block">AI-Powered Nutrition</span>
        </div>
      </header>

      {showResults ? (
        <div className="pt-16">
          <NutritionDashboard meals={meals} onBack={handleBack} />
        </div>
      ) : (
        <>
          <HeroSection onGetStarted={handleGetStarted} />
          <div ref={inputRef}>
            <FoodInput
              meals={meals}
              onAddMeal={handleAddMeal}
              onRemoveMeal={handleRemoveMeal}
              onAnalyze={handleAnalyze}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
