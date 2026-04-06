import { useRef, useState, useCallback } from "react";
import { Sparkles, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageDropZone from "@/components/ImageDropZone";
import ClassificationResult from "@/components/ClassificationResult";
import HeroSection from "@/components/HeroSection";
import { useToast } from "@/hooks/use-toast";

const API_URL = "http://localhost:8000/predict"; // Change to your backend API URL

interface Prediction {
  predicted_class: string;
  confidence: number;
  probabilities: Record<string, number>;
}

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState(false);
  const classifierRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToClassifier = () => {
    classifierRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleImageSelect = useCallback((f: File) => {
    setFile(f);
    setResult(null);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  }, []);

  const handleClassify = async () => {
    if (!file) return;
    setLoading(true);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(API_URL, { method: "POST", body: formData });
      if (!res.ok) throw new Error("Classification failed");
      const data: Prediction = await res.json();
      setResult(data);
    } catch {
      toast({
        title: "Error",
        description: "Could not classify image. Check your API endpoint.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero / Landing */}
      <HeroSection onScrollToClassifier={scrollToClassifier} />

      {/* Classifier Section */}
      <section
        ref={classifierRef}
        className="py-16 sm:py-24"
        id="classify"
      >
        <div className="container max-w-2xl mx-auto px-4 space-y-8">
          {/* Section Header */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-foreground">Classify Your Image</h2>
            <p className="text-muted-foreground">
              Upload a JPG or PNG image and hit classify to get instant results
            </p>
          </div>

          {/* Upload + Actions */}
          <div className="space-y-5">
            <ImageDropZone
              onImageSelect={handleImageSelect}
              preview={preview}
              disabled={loading}
            />

            <div className="flex gap-3">
              <Button
                onClick={handleClassify}
                disabled={!file || loading}
                className="flex-1 h-12 text-base font-semibold"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Classifying…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" /> Classify
                  </span>
                )}
              </Button>
              {(file || result) && (
                <Button variant="outline" onClick={handleReset} className="h-12 px-4">
                  <RotateCcw className="h-5 w-5" />
                </Button>
              )}
            </div>

            {result && <ClassificationResult result={result} />}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        Powered by AI · Configure your API endpoint in the source code
      </footer>
    </div>
  );
};

export default Index;
