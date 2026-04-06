import { Sparkles, Zap, Shield, BarChart3, ArrowDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { Button } from "@/components/ui/button";

const HeroSection = ({ onScrollToClassifier }: { onScrollToClassifier: () => void }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-foreground/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-sm text-primary-foreground backdrop-blur-sm">
          <Sparkles className="h-4 w-4" />
          AI-Powered Image Classification
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-primary-foreground leading-tight">
          Classify Images
          <br />
          <span className="text-primary">In Seconds</span>
        </h1>

        <p className="text-lg text-primary-foreground/80 max-w-xl mx-auto">
          Upload any image and let our AI instantly identify and classify it with high accuracy.
          Fast, simple, and powerful.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button variant="hero" size="lg" onClick={onScrollToClassifier} className="text-base px-8">
            Try It Now
            <ArrowDown className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* Features strip */}
      <div className="absolute bottom-0 left-0 right-0 bg-card/90 backdrop-blur-md border-t border-border">
        <div className="container max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 px-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Lightning Fast</p>
              <p className="text-xs text-muted-foreground">Results in milliseconds</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-success/10 p-2">
              <Shield className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">High Accuracy</p>
              <p className="text-xs text-muted-foreground">State-of-the-art models</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Detailed Results</p>
              <p className="text-xs text-muted-foreground">Full probability breakdown</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
