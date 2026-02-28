import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WAGE_CONFIG } from "@/lib/config";
import { calculateWage, type WageInput } from "@/lib/calculate";
import { WageBreakdown } from "./WageBreakdown";

export function WageCalculator() {
  const [input, setInput] = useState<WageInput>({
    startlonn: WAGE_CONFIG.defaultStartlonn,
    erfaringsNiva: 0,
    omrade: "Probe",
    fagbrev: false,
    skift: false,
    lederFader: false,
    ansvarCount: 0,
    kompetanseCount: 0,
    ansiennitetIndex: 0,
  });

  const result = calculateWage(input);

  function update(partial: Partial<WageInput>) {
    setInput((prev) => ({ ...prev, ...partial }));
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Lønnskalkulator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Startlønn */}
          <div className="space-y-2">
            <Label htmlFor="startlonn">
              Startlønn (kr/time)
            </Label>
            <p className="text-xs text-muted-foreground">
              Grunnlønn per time før tillegg
            </p>
            <Input
              id="startlonn"
              type="number"
              min={0}
              value={input.startlonn}
              onChange={(e) =>
                update({ startlonn: Number(e.target.value) || 0 })
              }
            />
          </div>

          {/* Område */}
          <div className="space-y-2">
            <Label>Område</Label>
            <p className="text-xs text-muted-foreground">
              Avdeling/arbeidsområde
            </p>
            <Select
              value={input.omrade}
              onValueChange={(v) => update({ omrade: v })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(WAGE_CONFIG.omrade).map(([key, val]) => (
                  <SelectItem key={key} value={key}>
                    {key} (+{val} kr)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Toggle fields */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <Label htmlFor="fagbrev" className="cursor-pointer">
                  Fagbrev
                </Label>
                <p className="text-xs text-muted-foreground">
                  +{WAGE_CONFIG.fagbrev} kr
                </p>
              </div>
              <Switch
                id="fagbrev"
                checked={input.fagbrev}
                onCheckedChange={(v) => update({ fagbrev: v })}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <Label htmlFor="skift" className="cursor-pointer">
                  Skift
                </Label>
                <p className="text-xs text-muted-foreground">
                  +{WAGE_CONFIG.skift} kr
                </p>
              </div>
              <Switch
                id="skift"
                checked={input.skift}
                onCheckedChange={(v) => update({ skift: v })}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <Label htmlFor="leder" className="cursor-pointer">
                  Leder/Fader
                </Label>
                <p className="text-xs text-muted-foreground">
                  +{WAGE_CONFIG.lederFader} kr
                </p>
              </div>
              <Switch
                id="leder"
                checked={input.lederFader}
                onCheckedChange={(v) => update({ lederFader: v })}
              />
            </div>
          </div>

          {/* Ansiennitet */}
          <div className="space-y-2">
            <Label>Ansiennitet</Label>
            <p className="text-xs text-muted-foreground">
              Ansettelsestid i bedriften
            </p>
            <Select
              value={String(input.ansiennitetIndex)}
              onValueChange={(v) => update({ ansiennitetIndex: Number(v) })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {WAGE_CONFIG.ansiennitet.map((a, i) => (
                  <SelectItem key={i} value={String(i)}>
                    {a.years} (+{a.addition} kr)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <WageBreakdown result={result} />
    </div>
  );
}
