import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { WageResult } from "@/lib/calculate";

interface WageBreakdownProps {
  result: WageResult;
}

export function WageBreakdown({ result }: WageBreakdownProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lønnsberegning</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 font-mono text-sm">
          {result.breakdown.map((item, i) => (
            <div key={i} className="flex justify-between">
              <span>{item.label}</span>
              <span>
                {i === 0 ? "" : "+ "}
                {item.value} kr
              </span>
            </div>
          ))}
          <div className="border-t pt-2 mt-2 flex justify-between font-bold text-base">
            <span>Timelønn</span>
            <span>{result.total} kr</span>
          </div>
          <div className="flex justify-between text-muted-foreground text-xs">
            <span>Estimert månedslønn (162,5 t)</span>
            <span>{result.monthlyEstimate.toLocaleString("nb-NO")} kr</span>
          </div>
          <div className="flex justify-between text-muted-foreground text-xs">
            <span>Estimert årslønn</span>
            <span>{result.yearlyEstimate.toLocaleString("nb-NO")} kr</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
