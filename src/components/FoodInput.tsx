import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Utensils, X, Sparkles } from 'lucide-react';
import { FOOD_DATABASE, MEAL_CATEGORIES, MealCategory, MealEntry, FoodItem, parseNaturalLanguage, findFood } from '@/data/nutritionDatabase';
import { toast } from 'sonner';

interface FoodInputProps {
  meals: MealEntry[];
  onAddMeal: (entry: MealEntry) => void;
  onRemoveMeal: (id: string) => void;
  onAnalyze: () => void;
}

const FoodInput = ({ meals, onAddMeal, onRemoveMeal, onAnalyze }: FoodInputProps) => {
  const [textInput, setTextInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MealCategory>('Lunch');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredFoods = FOOD_DATABASE.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 8);

  const handleNaturalInput = () => {
    if (!textInput.trim()) return;
    const parsed = parseNaturalLanguage(textInput);
    let added = 0;
    for (const { name, quantity } of parsed) {
      const food = findFood(name);
      if (food) {
        onAddMeal({
          id: crypto.randomUUID(),
          food,
          quantity,
          mealCategory: selectedCategory,
        });
        added++;
      } else {
        toast.error(`Couldn't find "${name}" in our database`);
      }
    }
    if (added > 0) {
      toast.success(`Added ${added} item${added > 1 ? 's' : ''}`);
      setTextInput('');
    }
  };

  const handleSelectFood = (food: FoodItem) => {
    onAddMeal({
      id: crypto.randomUUID(),
      food,
      quantity: 1,
      mealCategory: selectedCategory,
    });
    setSearchQuery('');
    setShowDropdown(false);
    toast.success(`Added ${food.name}`);
  };

  const mealsByCategory = MEAL_CATEGORIES.map(cat => ({
    category: cat,
    items: meals.filter(m => m.mealCategory === cat),
  }));

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          {/* Meal Category Selector */}
          <div className="flex gap-2 justify-center flex-wrap">
            {MEAL_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  selectedCategory === cat
                    ? 'gradient-primary text-primary-foreground shadow-md'
                    : 'glass-card text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Natural Language Input */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-muted-foreground">Describe your meal</span>
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleNaturalInput()}
                placeholder="e.g., 2 rotis, dal, paneer sabzi, chai"
                className="flex-1 bg-muted/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
              <button
                onClick={handleNaturalInput}
                className="gradient-primary text-primary-foreground px-5 py-3 rounded-xl font-medium hover:shadow-lg transition-shadow flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
          </div>

          {/* Search Dropdown */}
          <div className="glass-card p-6 space-y-3 relative">
            <div className="flex items-center gap-2 mb-2">
              <Search className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Or search foods</span>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setShowDropdown(true); }}
              onFocus={() => setShowDropdown(true)}
              placeholder="Search for a food item..."
              className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
            <AnimatePresence>
              {showDropdown && searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute left-0 right-0 top-full mt-1 z-20 bg-card border border-border rounded-xl shadow-xl overflow-hidden mx-6"
                >
                  {filteredFoods.length === 0 ? (
                    <div className="p-4 text-muted-foreground text-sm">No foods found</div>
                  ) : (
                    filteredFoods.map(food => (
                      <button
                        key={food.name}
                        onClick={() => handleSelectFood(food)}
                        className="w-full text-left px-4 py-3 hover:bg-accent transition-colors flex justify-between items-center"
                      >
                        <span className="font-medium text-foreground">{food.name}</span>
                        <span className="text-xs text-muted-foreground">{food.servingSize} · {food.category}</span>
                      </button>
                    ))
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Added Meals */}
          {meals.length > 0 && (
            <div className="space-y-4">
              {mealsByCategory.filter(m => m.items.length > 0).map(({ category, items }) => (
                <div key={category} className="glass-card p-5">
                  <h3 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-primary" />
                    {category}
                  </h3>
                  <div className="space-y-2">
                    {items.map(meal => (
                      <motion.div
                        key={meal.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="flex items-center justify-between bg-muted/30 rounded-lg px-4 py-2.5"
                      >
                        <span className="text-foreground">
                          {meal.quantity > 1 && <span className="font-semibold text-primary">{meal.quantity}x </span>}
                          {meal.food.name}
                          <span className="text-muted-foreground text-xs ml-2">({meal.food.servingSize})</span>
                        </span>
                        <button onClick={() => onRemoveMeal(meal.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}

              <motion.button
                onClick={onAnalyze}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full gradient-primary text-primary-foreground py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-3"
              >
                <Sparkles className="w-5 h-5" />
                Analyze My Nutrition
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default FoodInput;
