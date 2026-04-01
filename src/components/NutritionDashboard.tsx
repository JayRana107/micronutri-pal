import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, TrendingUp, ArrowLeft, Heart } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { NUTRIENTS, MealEntry, calculateTotalNutrients, getHealthScore, getDeficiencyStatus, FOOD_RECOMMENDATIONS } from '@/data/nutritionDatabase';

interface NutritionDashboardProps {
  meals: MealEntry[];
  onBack: () => void;
}

const statusColors = {
  deficient: 'hsl(0, 72%, 55%)',
  moderate: 'hsl(38, 92%, 55%)',
  adequate: 'hsl(152, 55%, 42%)',
};

const NutritionDashboard = ({ meals, onBack }: NutritionDashboardProps) => {
  const totals = calculateTotalNutrients(meals);
  const healthScore = getHealthScore(totals);

  const vitaminData = NUTRIENTS.filter(n => n.category === 'vitamin').map(n => ({
    ...n,
    intake: totals[n.key] || 0,
    percentage: Math.min(((totals[n.key] || 0) / n.rda) * 100, 150),
    status: getDeficiencyStatus(totals[n.key] || 0, n.rda),
  }));

  const mineralData = NUTRIENTS.filter(n => n.category === 'mineral').map(n => ({
    ...n,
    intake: totals[n.key] || 0,
    percentage: Math.min(((totals[n.key] || 0) / n.rda) * 100, 150),
    status: getDeficiencyStatus(totals[n.key] || 0, n.rda),
  }));

  const macroData = NUTRIENTS.filter(n => n.category === 'macro').map(n => ({
    ...n,
    intake: totals[n.key] || 0,
    percentage: Math.min(((totals[n.key] || 0) / n.rda) * 100, 150),
    status: getDeficiencyStatus(totals[n.key] || 0, n.rda),
  }));

  const allNutrientData = [...vitaminData, ...mineralData, ...macroData];
  const deficiencies = allNutrientData.filter(n => n.status === 'deficient');
  const moderates = allNutrientData.filter(n => n.status === 'moderate');

  const radarData = vitaminData.map(n => ({
    name: n.name.replace('Vitamin ', 'Vit '),
    value: Math.min(n.percentage, 100),
    fullMark: 100,
  }));

  const barData = [...mineralData, ...macroData].map(n => ({
    name: n.name,
    percentage: Math.round(n.percentage),
    status: n.status,
  }));

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to food input
        </motion.button>

        {/* Health Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 text-center mb-8"
        >
          <h2 className="font-heading text-2xl font-bold text-foreground mb-4 flex items-center justify-center gap-2">
            <Heart className="w-6 h-6 text-primary" /> Your Health Score
          </h2>
          <div className="relative inline-flex items-center justify-center">
            <svg viewBox="0 0 120 120" className="w-40 h-40">
              <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
              <circle
                cx="60" cy="60" r="52" fill="none"
                stroke={healthScore >= 70 ? statusColors.adequate : healthScore >= 50 ? statusColors.moderate : statusColors.deficient}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(healthScore / 100) * 327} 327`}
                transform="rotate(-90 60 60)"
              />
            </svg>
            <span className="absolute text-4xl font-heading font-bold text-foreground">{healthScore}</span>
          </div>
          <p className="text-muted-foreground mt-3">
            {healthScore >= 80 ? 'Great nutrition today! 🎉' : healthScore >= 60 ? 'Good start, some areas to improve 💪' : 'Several nutrients need attention ⚠️'}
          </p>
        </motion.div>

        {/* Deficiency Alerts */}
        {deficiencies.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 mb-6 border-l-4 border-destructive">
            <h3 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" /> Deficiencies Detected
            </h3>
            <div className="space-y-3">
              {deficiencies.map(d => (
                <div key={d.key} className="flex items-start gap-3">
                  <span className="text-lg">{d.icon}</span>
                  <div>
                    <p className="text-foreground font-medium">You may be deficient in {d.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Intake: {d.intake.toFixed(1)}{d.unit} / {d.rda}{d.unit} RDA ({Math.round(d.percentage)}%)
                    </p>
                    <p className="text-sm text-primary mt-1">
                      Try: {FOOD_RECOMMENDATIONS[d.key]?.slice(0, 3).join(', ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {moderates.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6 mb-6 border-l-4 border-warning">
            <h3 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-warning" /> Could Be Better
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {moderates.map(d => (
                <div key={d.key} className="flex items-center gap-2">
                  <span>{d.icon}</span>
                  <span className="text-foreground text-sm">{d.name}: {Math.round(d.percentage)}% of RDA</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {deficiencies.length === 0 && moderates.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 mb-6 border-l-4 border-primary">
            <h3 className="font-heading font-semibold text-foreground flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" /> All nutrients look adequate! Keep it up! 🌟
            </h3>
          </motion.div>
        )}

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Radar Chart - Vitamins */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6">
            <h3 className="font-heading font-semibold text-foreground mb-4">Vitamin Profile</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="name" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                <Radar name="Intake" dataKey="value" stroke="hsl(152, 55%, 42%)" fill="hsl(152, 55%, 42%)" fillOpacity={0.3} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Bar Chart - Minerals & Macros */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-6">
            <h3 className="font-heading font-semibold text-foreground mb-4">Minerals & Macros</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData} layout="vertical" margin={{ left: 10 }}>
                <XAxis type="number" domain={[0, 150]} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip
                  formatter={(value: number) => [`${value}% of RDA`]}
                  contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px' }}
                />
                <Bar dataKey="percentage" radius={[0, 6, 6, 0]}>
                  {barData.map((entry, i) => (
                    <Cell key={i} fill={statusColors[entry.status]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Detailed Nutrient Breakdown */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass-card p-6">
          <h3 className="font-heading font-semibold text-foreground mb-4">Full Nutrient Breakdown</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allNutrientData.map(n => (
              <div key={n.key} className="bg-muted/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground flex items-center gap-1.5">
                    <span>{n.icon}</span> {n.name}
                  </span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    n.status === 'adequate' ? 'bg-primary/15 text-primary' :
                    n.status === 'moderate' ? 'bg-warning/15 text-warning' :
                    'bg-destructive/15 text-destructive'
                  }`}>
                    {Math.round(n.percentage)}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.min(n.percentage, 100)}%`,
                      background: statusColors[n.status],
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">
                  {n.intake.toFixed(1)} / {n.rda} {n.unit}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground text-center mt-8 max-w-lg mx-auto">
          ⚠️ This tool provides general nutritional insights and is not a substitute for professional medical advice. Consult a healthcare provider for personalized guidance.
        </p>
      </div>
    </section>
  );
};

export default NutritionDashboard;
