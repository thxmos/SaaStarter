import { useState } from "react";
import { MarketingStep, mockMarketingSteps } from "./mocks";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Plus, Table } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

function AddMarketingStepForm({
  onAddStep,
}: {
  onAddStep: (step: MarketingStep) => void;
}) {
  const [name, setName] = useState("");
  const [completeByDate, setCompleteByDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddStep({ name, completeByDate, description });
    setName("");
    setCompleteByDate("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="stepName">Step Name</Label>
        <Input
          id="stepName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="completeByDate">Complete By Date</Label>
        <Input
          id="completeByDate"
          type="date"
          value={completeByDate}
          onChange={(e) => setCompleteByDate(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Add Marketing Step</Button>
    </form>
  );
}

export default function MarketingTab() {
  const [marketingSteps, setMarketingSteps] =
    useState<MarketingStep[]>(mockMarketingSteps);

  const addMarketingStep = (newStep: MarketingStep) => {
    setMarketingSteps((prev) =>
      [...prev, newStep].sort(
        (a, b) =>
          new Date(a.completeByDate).getTime() -
          new Date(b.completeByDate).getTime(),
      ),
    );
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Marketing Steps</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Marketing Step</DialogTitle>
              </DialogHeader>
              <AddMarketingStepForm onAddStep={addMarketingStep} />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Complete By</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {marketingSteps.map((step, index) => (
                <TableRow key={index}>
                  <TableCell>{step.name}</TableCell>
                  <TableCell>{step.completeByDate}</TableCell>
                  <TableCell>{step.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
