import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  Activity,
  LineChart,
  Shield,
  Clock,
  Heart,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import heroImage from "@/assets/hero-wellness.jpg";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Evidence-Based Assessment",
      description:
        "Validated stress metrics using clinically proven psychological frameworks.",
    },
    {
      icon: <Activity className="h-8 w-8" />,
      title: "Personalized Recommendations",
      description:
        "Tailored stress-reduction strategies based on your unique lifestyle and habits.",
    },
    {
      icon: <LineChart className="h-8 w-8" />,
      title: "Track Your Progress",
      description:
        "Monitor your stress levels over time with visual analytics and insights.",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Private & Secure",
      description:
        "Your data is encrypted and never shared. Complete privacy guaranteed.",
    },
  ];

  const benefits = [
    "10-minute comprehensive assessment",
    "82-88% prediction accuracy",
    "Science-backed recommendations",
    "Actionable daily wellness plan",
  ];

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Understand Your Stress.
              <br />
              <span className="bg-gradient-calm bg-clip-text text-transparent">
                Reclaim Your Peace.
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Take our evidence-based stress assessment to receive personalized
              recommendations for better mental wellness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button
                variant="hero"
                size="lg"
                onClick={() => navigate("/assessment")}
                className="text-lg px-8 py-6"
              >
                Start Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <div className="flex items-center text-muted-foreground">
                <Clock className="h-5 w-5 mr-2" />
                <span>Only 10 minutes</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="h-4 w-4 mr-2 text-primary" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why StressPredict?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built by psychologists and developers, combining clinical expertise with
            cutting-edge technology.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 shadow-soft hover:shadow-card transition-smooth border-primary/10 text-center animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex p-4 bg-primary/10 rounded-full text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-card/50 backdrop-blur-sm py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Three simple steps to better stress management
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Take Assessment",
                description:
                  "Answer 10 questions about your sleep, habits, and daily routines.",
              },
              {
                step: "02",
                title: "Get Your Score",
                description:
                  "Receive your stress level analysis with confidence metrics.",
              },
              {
                step: "03",
                title: "Follow Recommendations",
                description:
                  "Implement personalized strategies to reduce stress effectively.",
              },
            ].map((item, index) => (
              <div key={index} className="text-center animate-slide-up">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-calm text-white text-2xl font-bold mb-4 shadow-glow">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Card className="p-12 shadow-card bg-gradient-card border-primary/10 text-center">
          <Heart className="h-16 w-16 text-primary mx-auto mb-6 animate-pulse-soft" />
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Take Control of Your Stress?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of people who've found peace through understanding their
            stress patterns. Start your journey to wellness today.
          </p>
          <Button
            variant="hero"
            size="lg"
            onClick={() => navigate("/assessment")}
            className="text-lg px-8 py-6"
          >
            Begin Your Assessment
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 StressPredict. For informational purposes only. Not a substitute
            for professional medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
