import { motion } from 'framer-motion';
import { Leaf, Sparkles, ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center gradient-hero overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-muted-foreground">AI-Powered Nutrition Analysis</span>
          </div>

          <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="text-foreground">Nutri</span>
            <span className="text-primary">Scan</span>
            <span className="text-foreground"> AI</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-light">
            Smart Vitamin Deficiency Detector
          </p>

          <p className="text-base text-muted-foreground mb-10 max-w-xl mx-auto">
            Track your nutrition in seconds. Get instant deficiency insights and personalized food recommendations powered by AI.
          </p>

          <motion.button
            onClick={onGetStarted}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="gradient-primary text-primary-foreground px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow inline-flex items-center gap-3"
          >
            <Leaf className="w-5 h-5" />
            Start Scanning Your Diet
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-16"
          >
            <ArrowDown className="w-5 h-5 text-muted-foreground mx-auto animate-bounce" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
