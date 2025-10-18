import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Question {
  id: number;
  text: string;
  options: { value: string; label: string; score: number }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "How many hours did you sleep last night?",
    options: [
      { value: "less-than-5", label: "Less than 5 hours", score: 8 },
      { value: "5-6", label: "5-6 hours", score: 6 },
      { value: "7-8", label: "7-8 hours", score: 2 },
      { value: "more-than-8", label: "More than 8 hours", score: 3 },
    ],
  },
  {
    id: 2,
    text: "How much screen time (excluding work/study) did you have today?",
    options: [
      { value: "less-than-2", label: "Less than 2 hours", score: 2 },
      { value: "2-4", label: "2-4 hours", score: 4 },
      { value: "4-6", label: "4-6 hours", score: 7 },
      { value: "more-than-6", label: "More than 6 hours", score: 9 },
    ],
  },
  {
    id: 3,
    text: "How physically active were you today?",
    options: [
      { value: "very-active", label: "Very active (60+ minutes)", score: 1 },
      { value: "moderate", label: "Moderately active (30-60 minutes)", score: 3 },
      { value: "light", label: "Lightly active (10-30 minutes)", score: 6 },
      { value: "sedentary", label: "Mostly sedentary (0-10 minutes)", score: 8 },
    ],
  },
  {
    id: 4,
    text: "How often do you feel overwhelmed by your responsibilities?",
    options: [
      { value: "rarely", label: "Rarely or never", score: 1 },
      { value: "sometimes", label: "Sometimes", score: 4 },
      { value: "often", label: "Often", score: 7 },
      { value: "always", label: "Almost always", score: 10 },
    ],
  },
  {
    id: 5,
    text: "How well do you manage your work/study schedule?",
    options: [
      { value: "very-well", label: "Very well organized", score: 1 },
      { value: "fairly-well", label: "Fairly well", score: 3 },
      { value: "struggling", label: "Struggling to keep up", score: 7 },
      { value: "overwhelmed", label: "Completely overwhelmed", score: 10 },
    ],
  },
  {
    id: 6,
    text: "How often do you take breaks during work/study?",
    options: [
      { value: "regularly", label: "Regular breaks every hour", score: 1 },
      { value: "sometimes", label: "Occasional breaks", score: 4 },
      { value: "rarely", label: "Rarely take breaks", score: 7 },
      { value: "never", label: "Almost never", score: 9 },
    ],
  },
  {
    id: 7,
    text: "How would you rate your overall mood this week?",
    options: [
      { value: "excellent", label: "Excellent", score: 1 },
      { value: "good", label: "Good", score: 3 },
      { value: "fair", label: "Fair", score: 6 },
      { value: "poor", label: "Poor", score: 9 },
    ],
  },
  {
    id: 8,
    text: "How often do you feel anxious or worried?",
    options: [
      { value: "rarely", label: "Rarely", score: 1 },
      { value: "sometimes", label: "Sometimes", score: 4 },
      { value: "often", label: "Often", score: 7 },
      { value: "constantly", label: "Almost constantly", score: 10 },
    ],
  },
  {
    id: 9,
    text: "How satisfied are you with your social connections?",
    options: [
      { value: "very-satisfied", label: "Very satisfied", score: 1 },
      { value: "satisfied", label: "Satisfied", score: 3 },
      { value: "somewhat", label: "Somewhat dissatisfied", score: 6 },
      { value: "dissatisfied", label: "Very dissatisfied", score: 9 },
    ],
  },
  {
    id: 10,
    text: "How often do you practice relaxation or mindfulness?",
    options: [
      { value: "daily", label: "Daily", score: 1 },
      { value: "weekly", label: "Several times a week", score: 3 },
      { value: "rarely", label: "Rarely", score: 7 },
      { value: "never", label: "Never", score: 10 },
    ],
  },
];

const Assessment = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate stress score
      const totalScore = questions.reduce((sum, question) => {
        const answer = answers[question.id];
        const option = question.options.find((opt) => opt.value === answer);
        return sum + (option?.score || 0);
      }, 0);
      const stressScore = (totalScore / 100) * 10; // Convert to 1-10 scale
      navigate("/results", { state: { stressScore, answers } });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const canProceed = answers[questions[currentQuestion].id] !== undefined;

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4">
      <div className="w-full max-w-3xl animate-fade-in">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Stress Assessment</h1>
          <p className="text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        <div className="mb-6">
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="p-8 shadow-card bg-gradient-card border-primary/10">
          <div className="space-y-6 animate-slide-up">
            <h2 className="text-xl font-semibold text-foreground">
              {questions[currentQuestion].text}
            </h2>

            <RadioGroup
              value={answers[questions[currentQuestion].id]}
              onValueChange={handleAnswer}
              className="space-y-3"
            >
              {questions[currentQuestion].options.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-smooth cursor-pointer"
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label
                    htmlFor={option.value}
                    className="flex-1 cursor-pointer text-base"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </Card>

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button onClick={handleNext} disabled={!canProceed} variant="hero">
            {currentQuestion === questions.length - 1 ? "View Results" : "Next"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
