import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Heart,
  Activity,
  Moon,
  Users,
  Lightbulb,
  ArrowRight,
  Home,
} from "lucide-react";
import { useEffect } from "react";

interface Recommendation {
  icon: React.ReactNode;
  title: string;
  description: string;
  effectiveness: number;
  timeframe: string;
}

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { stressScore } = location.state || { stressScore: 0 };

  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
  }, [location.state, navigate]);

  const getStressLevel = (score: number) => {
    if (score <= 3) return { level: "Low", color: "success", confidence: 88 };
    if (score <= 6) return { level: "Moderate", color: "warning", confidence: 85 };
    return { level: "High", color: "danger", confidence: 82 };
  };

  const stressInfo = getStressLevel(stressScore);

  const recommendations: Recommendation[] = [
    {
      icon: <Moon className="h-6 w-6" />,
      title: "Optimize Sleep Schedule",
      description:
        "Establish a consistent sleep routine. Go to bed and wake up at the same time daily. Create a 1-hour wind-down period before sleep.",
      effectiveness: 5,
      timeframe: "7:00 AM - 7:10 AM daily",
    },
    {
      icon: <Activity className="h-6 w-6" />,
      title: "Daily Physical Activity",
      description:
        "30-minute evening walk or light exercise. Physical activity reduces cortisol by 23% according to research.",
      effectiveness: 5,
      timeframe: "7:00 PM - 7:30 PM daily",
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Mindfulness Practice",
      description:
        "10-minute morning meditation or breathing exercises. Proven to reduce stress markers by 31%.",
      effectiveness: 4,
      timeframe: "Morning routine",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Social Connection",
      description:
        "Schedule regular social interactions. Even 15 minutes of quality conversation can lower stress hormones.",
      effectiveness: 4,
      timeframe: "3x per week",
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Screen Time Management",
      description:
        "Implement 1-hour screen-free windows. Reduce non-essential screen time to under 2 hours daily.",
      effectiveness: 4,
      timeframe: "Before bed",
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Regular Breaks",
      description:
        "Take 5-10 minute breaks every hour during work/study. Use the Pomodoro Technique for better focus.",
      effectiveness: 3,
      timeframe: "Hourly during work",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-soft py-12 px-4">
      <div className="max-w-4xl mx-auto animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Your Stress Assessment Results
          </h1>
          <p className="text-muted-foreground">
            Based on your responses, here's your personalized stress profile
          </p>
        </div>

        {/* Stress Score Card */}
        <Card className="p-8 shadow-card bg-gradient-card border-primary/10 mb-8 text-center">
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-calm shadow-glow">
              <span className="text-5xl font-bold text-white">
                {stressScore.toFixed(1)}
              </span>
            </div>
            <div>
              <Badge
                variant="outline"
                className={`text-lg px-4 py-2 ${
                  stressInfo.color === "success"
                    ? "border-success text-success"
                    : stressInfo.color === "warning"
                    ? "border-warning text-warning"
                    : "border-danger text-danger"
                }`}
              >
                {stressInfo.level} Stress Level
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Confidence: {stressInfo.confidence}%
            </p>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              {stressScore <= 3
                ? "Your stress levels are well-managed. Continue with your current healthy habits and consider the recommendations below for maintaining your wellness."
                : stressScore <= 6
                ? "You're experiencing moderate stress. The recommendations below will help you reduce stress and improve your overall well-being."
                : "Your stress levels are elevated. It's important to prioritize stress reduction. Consider implementing the recommendations below and consult a healthcare professional if symptoms persist."}
            </p>
          </div>
        </Card>

        {/* Recommendations Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <Lightbulb className="mr-2 h-6 w-6 text-primary" />
            Personalized Recommendations
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {recommendations.slice(0, stressScore > 6 ? 6 : 4).map((rec, index) => (
              <Card
                key={index}
                className="p-6 shadow-soft hover:shadow-card transition-smooth border-primary/10"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    {rec.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">
                      {rec.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {rec.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className={`h-2 w-2 rounded-full ${
                              i < rec.effectiveness
                                ? "bg-primary"
                                : "bg-muted"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {rec.timeframe}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Weekly Goals */}
        <Card className="p-6 shadow-card bg-gradient-card border-primary/10 mb-8">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Your Weekly Goals
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-primary mr-3" />
              Increase physical activity to 5 days per week
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-primary mr-3" />
              Reduce non-essential screen time to under 2 hours daily
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-primary mr-3" />
              Practice mindfulness or meditation at least 3 times this week
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-primary mr-3" />
              Maintain consistent sleep schedule (7-8 hours)
            </li>
          </ul>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="lg" onClick={() => navigate("/assessment")}>
            Retake Assessment
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="soft" size="lg" onClick={() => navigate("/")}>
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>

        {/* Note */}
        <p className="text-center text-sm text-muted-foreground mt-8 max-w-2xl mx-auto">
          Note: This assessment is for informational purposes only and does not
          constitute medical advice. If you're experiencing severe stress or mental
          health concerns, please consult a healthcare professional.
        </p>
      </div>
    </div>
  );
};

export default Results;
