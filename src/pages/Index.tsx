import { useState, useCallback } from "react";
import { Sparkles, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageDropZone from "@/components/ImageDropZone";
import ClassificationResult from "@/components/ClassificationResult";
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
  const { toast } = useToast();

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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-2xl mx-auto flex items-center gap-3 py-4 px-4">
          <div className="rounded-xl bg-primary/10 p-2">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Image Classifier</h1>
            <p className="text-sm text-muted-foreground">Upload an image to classify it instantly</p>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 container max-w-2xl mx-auto px-4 py-8 space-y-6">
        <ImageDropZone
          onImageSelect={handleImageSelect}
          preview={preview}
          disabled={loading}
        />

        {/* Actions */}
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

        {/* Result */}
        {result && <ClassificationResult result={result} />}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-4 text-center text-sm text-muted-foreground">
        Configure your API endpoint in the source code
      </footer>
    </div>
  );
};

export default Index;
