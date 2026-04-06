import { CheckCircle2 } from "lucide-react";

interface Prediction {
  predicted_class: string;
  confidence: number;
  probabilities: Record<string, number>;
}

const ClassificationResult = ({ result }: { result: Prediction }) => {
  const sortedProbs = Object.entries(result.probabilities).sort(
    ([, a], [, b]) => b - a
  );

  return (
    <div className="w-full rounded-2xl bg-card border border-border p-6 space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Top prediction */}
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-success/10 p-2">
          <CheckCircle2 className="h-6 w-6 text-success" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Predicted Class</p>
          <p className="text-2xl font-bold text-foreground capitalize">
            {result.predicted_class}
          </p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-sm text-muted-foreground">Confidence</p>
          <p className="text-2xl font-bold text-primary">
            {(result.confidence * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Probability bars */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">All Probabilities</p>
        {sortedProbs.map(([label, prob]) => (
          <div key={label} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="capitalize text-foreground">{label}</span>
              <span className="text-muted-foreground">{(prob * 100).toFixed(1)}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-700"
                style={{ width: `${prob * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassificationResult;
