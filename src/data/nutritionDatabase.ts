export interface FoodItem {
  name: string;
  category: string;
  servingSize: string;
  servingGrams: number;
  nutrients: Record<string, number>; // nutrient key -> amount per serving
}

export interface Nutrient {
  key: string;
  name: string;
  unit: string;
  rda: number; // Recommended Daily Allowance
  icon: string;
  category: 'vitamin' | 'mineral' | 'macro';
}

export const NUTRIENTS: Nutrient[] = [
  { key: 'vitA', name: 'Vitamin A', unit: 'mcg', rda: 900, icon: '👁', category: 'vitamin' },
  { key: 'vitB1', name: 'Vitamin B1', unit: 'mg', rda: 1.2, icon: '⚡', category: 'vitamin' },
  { key: 'vitB2', name: 'Vitamin B2', unit: 'mg', rda: 1.3, icon: '🔋', category: 'vitamin' },
  { key: 'vitB3', name: 'Vitamin B3', unit: 'mg', rda: 16, icon: '💪', category: 'vitamin' },
  { key: 'vitB6', name: 'Vitamin B6', unit: 'mg', rda: 1.7, icon: '🧠', category: 'vitamin' },
  { key: 'vitB12', name: 'Vitamin B12', unit: 'mcg', rda: 2.4, icon: '🩸', category: 'vitamin' },
  { key: 'vitC', name: 'Vitamin C', unit: 'mg', rda: 90, icon: '🍊', category: 'vitamin' },
  { key: 'vitD', name: 'Vitamin D', unit: 'mcg', rda: 20, icon: '☀️', category: 'vitamin' },
  { key: 'vitE', name: 'Vitamin E', unit: 'mg', rda: 15, icon: '🛡', category: 'vitamin' },
  { key: 'vitK', name: 'Vitamin K', unit: 'mcg', rda: 120, icon: '🦴', category: 'vitamin' },
  { key: 'iron', name: 'Iron', unit: 'mg', rda: 18, icon: '🔩', category: 'mineral' },
  { key: 'calcium', name: 'Calcium', unit: 'mg', rda: 1000, icon: '🦷', category: 'mineral' },
  { key: 'zinc', name: 'Zinc', unit: 'mg', rda: 11, icon: '⚙️', category: 'mineral' },
  { key: 'magnesium', name: 'Magnesium', unit: 'mg', rda: 420, icon: '💎', category: 'mineral' },
  { key: 'protein', name: 'Protein', unit: 'g', rda: 50, icon: '🥩', category: 'macro' },
  { key: 'carbs', name: 'Carbohydrates', unit: 'g', rda: 275, icon: '🌾', category: 'macro' },
  { key: 'fats', name: 'Fats', unit: 'g', rda: 78, icon: '🥑', category: 'macro' },
  { key: 'fiber', name: 'Fiber', unit: 'g', rda: 28, icon: '🥦', category: 'macro' },
];

export const FOOD_DATABASE: FoodItem[] = [
  // Indian foods
  { name: 'Roti (Chapati)', category: 'Indian', servingSize: '1 piece', servingGrams: 40, nutrients: { vitB1: 0.07, vitB3: 1.1, iron: 1.2, calcium: 10, protein: 3.1, carbs: 18, fats: 0.9, fiber: 1.9, magnesium: 15, zinc: 0.4 }},
  { name: 'Dal (Lentil Curry)', category: 'Indian', servingSize: '1 cup', servingGrams: 200, nutrients: { vitB1: 0.15, vitB6: 0.2, vitB9: 120, iron: 3.3, calcium: 19, zinc: 1.3, protein: 9, carbs: 20, fats: 3.5, fiber: 5, magnesium: 36 }},
  { name: 'Paneer Sabzi', category: 'Indian', servingSize: '1 cup', servingGrams: 150, nutrients: { vitA: 120, vitB2: 0.3, vitB12: 0.8, calcium: 280, zinc: 1.5, protein: 14, carbs: 6, fats: 18, magnesium: 20 }},
  { name: 'Rice (Steamed)', category: 'Indian', servingSize: '1 cup', servingGrams: 158, nutrients: { vitB1: 0.26, vitB3: 2.3, iron: 1.9, protein: 4.3, carbs: 45, fats: 0.4, fiber: 0.6, magnesium: 24, zinc: 0.8 }},
  { name: 'Idli', category: 'Indian', servingSize: '2 pieces', servingGrams: 80, nutrients: { vitB1: 0.05, iron: 0.8, calcium: 12, protein: 3.2, carbs: 16, fats: 0.4, fiber: 0.8, magnesium: 10 }},
  { name: 'Dosa', category: 'Indian', servingSize: '1 piece', servingGrams: 100, nutrients: { vitB1: 0.08, vitB3: 1.0, iron: 1.5, calcium: 18, protein: 4.5, carbs: 28, fats: 3.5, fiber: 1.2, magnesium: 18 }},
  { name: 'Biryani (Chicken)', category: 'Indian', servingSize: '1 cup', servingGrams: 250, nutrients: { vitA: 60, vitB3: 5.0, vitB6: 0.4, vitB12: 0.5, iron: 2.5, calcium: 30, zinc: 2.0, protein: 18, carbs: 40, fats: 12, fiber: 1.5, magnesium: 30 }},
  { name: 'Poha', category: 'Indian', servingSize: '1 cup', servingGrams: 180, nutrients: { vitB1: 0.1, iron: 2.5, calcium: 8, protein: 3.8, carbs: 30, fats: 4, fiber: 1.5, magnesium: 14 }},
  { name: 'Pav Bhaji', category: 'Indian', servingSize: '1 serving', servingGrams: 300, nutrients: { vitA: 200, vitC: 25, vitB1: 0.15, iron: 2.8, calcium: 45, protein: 8, carbs: 45, fats: 15, fiber: 5, magnesium: 28, zinc: 1.2 }},
  { name: 'Curd (Yogurt)', category: 'Indian', servingSize: '1 cup', servingGrams: 200, nutrients: { vitA: 50, vitB2: 0.35, vitB12: 1.1, calcium: 300, zinc: 1.5, protein: 8.5, carbs: 7.5, fats: 6.5, magnesium: 28 }},
  { name: 'Chai (Milk Tea)', category: 'Indian', servingSize: '1 cup', servingGrams: 200, nutrients: { vitB2: 0.15, calcium: 80, protein: 2, carbs: 12, fats: 2.5, magnesium: 8 }},
  { name: 'Samosa', category: 'Indian', servingSize: '1 piece', servingGrams: 80, nutrients: { vitA: 15, iron: 1.0, protein: 3.5, carbs: 22, fats: 10, fiber: 1.5, magnesium: 10, zinc: 0.3 }},
  { name: 'Palak Paneer', category: 'Indian', servingSize: '1 cup', servingGrams: 200, nutrients: { vitA: 500, vitC: 15, vitK: 300, vitB2: 0.25, iron: 4.5, calcium: 350, zinc: 1.8, protein: 12, carbs: 8, fats: 16, fiber: 3, magnesium: 60 }},
  { name: 'Rajma (Kidney Bean Curry)', category: 'Indian', servingSize: '1 cup', servingGrams: 200, nutrients: { vitB1: 0.18, vitB6: 0.12, iron: 3.9, zinc: 1.8, protein: 8.7, carbs: 22, fats: 4.5, fiber: 6.5, magnesium: 45, calcium: 35 }},
  // Global foods
  { name: 'Egg (Boiled)', category: 'Global', servingSize: '1 large', servingGrams: 50, nutrients: { vitA: 80, vitB2: 0.25, vitB12: 0.6, vitD: 1.1, vitE: 0.5, iron: 0.9, zinc: 0.6, protein: 6.3, carbs: 0.6, fats: 5.3, calcium: 25, magnesium: 5 }},
  { name: 'Banana', category: 'Global', servingSize: '1 medium', servingGrams: 118, nutrients: { vitB6: 0.43, vitC: 10.3, magnesium: 32, protein: 1.3, carbs: 27, fats: 0.4, fiber: 3.1, calcium: 6 }},
  { name: 'Spinach (Cooked)', category: 'Global', servingSize: '1 cup', servingGrams: 180, nutrients: { vitA: 943, vitC: 17.6, vitE: 3.7, vitK: 888, vitB2: 0.42, vitB6: 0.44, iron: 6.4, calcium: 245, magnesium: 157, zinc: 1.4, protein: 5.3, carbs: 6.8, fats: 0.5, fiber: 4.3 }},
  { name: 'Chicken Breast', category: 'Global', servingSize: '100g', servingGrams: 100, nutrients: { vitB3: 13.7, vitB6: 0.6, vitB12: 0.3, iron: 0.7, zinc: 0.7, protein: 31, carbs: 0, fats: 3.6, magnesium: 29 }},
  { name: 'Salmon', category: 'Global', servingSize: '100g', servingGrams: 100, nutrients: { vitB3: 8.0, vitB6: 0.6, vitB12: 3.2, vitD: 11, vitE: 1.8, iron: 0.3, zinc: 0.4, protein: 20, carbs: 0, fats: 13, magnesium: 27, calcium: 9 }},
  { name: 'Milk (Whole)', category: 'Global', servingSize: '1 cup', servingGrams: 244, nutrients: { vitA: 68, vitB2: 0.45, vitB12: 1.1, vitD: 3.2, calcium: 276, zinc: 1.0, protein: 7.7, carbs: 12, fats: 7.9, magnesium: 24 }},
  { name: 'Orange', category: 'Global', servingSize: '1 medium', servingGrams: 131, nutrients: { vitC: 70, vitB1: 0.11, vitA: 14, calcium: 52, magnesium: 13, protein: 1.2, carbs: 15.4, fats: 0.2, fiber: 3.1 }},
  { name: 'Almonds', category: 'Global', servingSize: '1 oz (28g)', servingGrams: 28, nutrients: { vitE: 7.3, vitB2: 0.32, iron: 1.0, calcium: 76, magnesium: 77, zinc: 0.9, protein: 6, carbs: 6, fats: 14, fiber: 3.5 }},
  { name: 'Broccoli', category: 'Global', servingSize: '1 cup', servingGrams: 91, nutrients: { vitA: 60, vitC: 81, vitK: 92, vitB6: 0.16, iron: 0.7, calcium: 43, magnesium: 19, zinc: 0.4, protein: 2.6, carbs: 6, fats: 0.3, fiber: 2.4 }},
  { name: 'Sweet Potato', category: 'Global', servingSize: '1 medium', servingGrams: 130, nutrients: { vitA: 1096, vitC: 22, vitB6: 0.29, iron: 0.7, calcium: 39, magnesium: 33, protein: 2, carbs: 26, fats: 0.1, fiber: 3.8 }},
  { name: 'Oats (Cooked)', category: 'Global', servingSize: '1 cup', servingGrams: 234, nutrients: { vitB1: 0.26, iron: 2.1, magnesium: 56, zinc: 2.3, protein: 5.9, carbs: 27, fats: 3.6, fiber: 4, calcium: 21 }},
  { name: 'Tofu', category: 'Global', servingSize: '100g', servingGrams: 100, nutrients: { vitB1: 0.06, iron: 2.7, calcium: 350, magnesium: 30, zinc: 0.8, protein: 8, carbs: 1.9, fats: 4.8, fiber: 0.3 }},
  { name: 'Lentils (Cooked)', category: 'Global', servingSize: '1 cup', servingGrams: 198, nutrients: { vitB1: 0.33, vitB6: 0.35, iron: 6.6, zinc: 2.5, magnesium: 71, protein: 17.9, carbs: 40, fats: 0.8, fiber: 15.6, calcium: 38 }},
];

export const MEAL_CATEGORIES = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'] as const;
export type MealCategory = typeof MEAL_CATEGORIES[number];

export interface MealEntry {
  id: string;
  food: FoodItem;
  quantity: number;
  mealCategory: MealCategory;
}

export function parseNaturalLanguage(input: string): { name: string; quantity: number }[] {
  const items = input.split(/,|and|\+/).map(s => s.trim()).filter(Boolean);
  return items.map(item => {
    const match = item.match(/^(\d+)\s*/);
    const quantity = match ? parseInt(match[1]) : 1;
    const name = item.replace(/^\d+\s*/, '').trim();
    return { name, quantity };
  });
}

export function findFood(query: string): FoodItem | undefined {
  const q = query.toLowerCase();
  return FOOD_DATABASE.find(f =>
    f.name.toLowerCase().includes(q) || q.includes(f.name.toLowerCase().split('(')[0].trim())
  );
}

export function calculateTotalNutrients(meals: MealEntry[]): Record<string, number> {
  const totals: Record<string, number> = {};
  for (const meal of meals) {
    for (const [key, value] of Object.entries(meal.food.nutrients)) {
      totals[key] = (totals[key] || 0) + value * meal.quantity;
    }
  }
  return totals;
}

export function getHealthScore(totals: Record<string, number>): number {
  let score = 0;
  let count = 0;
  for (const nutrient of NUTRIENTS) {
    const intake = totals[nutrient.key] || 0;
    const pct = Math.min(intake / nutrient.rda, 1.5);
    // Penalize over 1.5x RDA slightly
    const nutrientScore = pct <= 1 ? pct * 100 : 100 - (pct - 1) * 20;
    score += Math.max(0, Math.min(100, nutrientScore));
    count++;
  }
  return Math.round(score / count);
}

export function getDeficiencyStatus(intake: number, rda: number): 'deficient' | 'moderate' | 'adequate' {
  const pct = intake / rda;
  if (pct < 0.5) return 'deficient';
  if (pct < 0.8) return 'moderate';
  return 'adequate';
}

export const FOOD_RECOMMENDATIONS: Record<string, string[]> = {
  vitA: ['Sweet potato', 'Spinach', 'Carrots', 'Pumpkin', 'Mango'],
  vitB1: ['Oats', 'Brown rice', 'Lentils', 'Sunflower seeds'],
  vitB2: ['Almonds', 'Milk', 'Eggs', 'Mushrooms', 'Spinach'],
  vitB3: ['Chicken breast', 'Tuna', 'Peanuts', 'Mushrooms'],
  vitB6: ['Chickpeas', 'Banana', 'Potatoes', 'Chicken'],
  vitB12: ['Eggs', 'Milk', 'Curd', 'Paneer', 'Fortified cereals'],
  vitC: ['Orange', 'Amla', 'Guava', 'Bell pepper', 'Broccoli'],
  vitD: ['Sunlight exposure', 'Salmon', 'Fortified milk', 'Eggs'],
  vitE: ['Almonds', 'Sunflower seeds', 'Spinach', 'Avocado'],
  vitK: ['Spinach', 'Kale', 'Broccoli', 'Palak paneer'],
  iron: ['Spinach', 'Lentils', 'Jaggery', 'Rajma', 'Tofu'],
  calcium: ['Milk', 'Curd', 'Paneer', 'Ragi', 'Tofu', 'Sesame seeds'],
  zinc: ['Pumpkin seeds', 'Lentils', 'Chickpeas', 'Cashews'],
  magnesium: ['Almonds', 'Spinach', 'Dark chocolate', 'Bananas', 'Oats'],
  protein: ['Dal', 'Paneer', 'Eggs', 'Chicken', 'Lentils', 'Tofu'],
  carbs: ['Rice', 'Roti', 'Oats', 'Sweet potato', 'Banana'],
  fats: ['Ghee', 'Almonds', 'Avocado', 'Olive oil', 'Peanut butter'],
  fiber: ['Rajma', 'Lentils', 'Oats', 'Broccoli', 'Apple with skin'],
};
