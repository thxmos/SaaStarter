"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Coffee, Loader2 } from "lucide-react";

export default function BeanMachineTab() {
  const [beanType, setBeanType] = useState("arabica");
  const [roastLevel, setRoastLevel] = useState(50);
  const [isFairTrade, setIsFairTrade] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBean, setGeneratedBean]: any = useState(null);

  const handleGenerateMegaBean = () => {
    setIsGenerating(true);
    // Simulating API call
    setTimeout(() => {
      setGeneratedBean({
        type: beanType,
        roastLevel: roastLevel,
        fairTrade: isFairTrade,
        megaFactor: Math.floor(Math.random() * 100) + 1,
      });
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Mega Bean Generator</CardTitle>
          <CardDescription>
            Customize your bean and generate a Mega Bean!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bean Type
            </label>
            <Select value={beanType} onValueChange={setBeanType}>
              <SelectTrigger>
                <SelectValue placeholder="Select bean type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="arabica">Arabica</SelectItem>
                <SelectItem value="robusta">Robusta</SelectItem>
                <SelectItem value="liberica">Liberica</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Roast Level
            </label>
            <Slider
              min={0}
              max={100}
              step={1}
              value={[roastLevel]}
              onValueChange={(value) => setRoastLevel(value[0])}
              className="w-full"
            />
            <div className="mt-1 text-sm text-gray-500">
              {roastLevel < 33
                ? "Light Roast"
                : roastLevel < 66
                ? "Medium Roast"
                : "Dark Roast"}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="fair-trade"
              checked={isFairTrade}
              onCheckedChange={setIsFairTrade}
            />
            <label
              htmlFor="fair-trade"
              className="text-sm font-medium text-gray-700"
            >
              Fair Trade Certified
            </label>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleGenerateMegaBean}
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Mega Bean...
              </>
            ) : (
              <>
                <Coffee className="mr-2 h-4 w-4" />
                Generate Mega Bean
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {generatedBean && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Your Generated Mega Bean</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Bean Type</dt>
                <dd className="mt-1 text-sm text-gray-900 capitalize">
                  {generatedBean.type}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Roast Level
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {generatedBean.roastLevel}%
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Fair Trade
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {generatedBean.fairTrade ? "Yes" : "No"}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Mega Factor
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {generatedBean.megaFactor}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      )}
    </>
  );
}
