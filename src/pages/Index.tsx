
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Compass, Code, Brain, Target, TrendingUp, CheckCircle } from "lucide-react";
import AssessmentIntro from "@/components/assessment/AssessmentIntro";
import PsychometricSection from "@/components/assessment/PsychometricSection";
import TechnicalSection from "@/components/assessment/TechnicalSection";
import WiscarSection from "@/components/assessment/WiscarSection";
import RecommendationEngine from "@/components/assessment/RecommendationEngine";
import CareerGuidance from "@/components/assessment/CareerGuidance";

export interface AssessmentData {
  psychometricScore: number;
  technicalScore: number;
  wiscarScores: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
  };
  responses: any[];
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    psychometricScore: 0,
    technicalScore: 0,
    wiscarScores: {
      will: 0,
      interest: 0,
      skill: 0,
      cognitive: 0,
      ability: 0,
      realWorld: 0,
    },
    responses: [],
  });

  const steps = [
    { id: 0, title: "Introduction", icon: Compass, component: AssessmentIntro },
    { id: 1, title: "Psychometric", icon: Brain, component: PsychometricSection },
    { id: 2, title: "Technical", icon: Code, component: TechnicalSection },
    { id: 3, title: "WISCAR", icon: Target, component: WiscarSection },
    { id: 4, title: "Recommendations", icon: TrendingUp, component: RecommendationEngine },
    { id: 5, title: "Career Path", icon: CheckCircle, component: CareerGuidance },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateAssessmentData = (newData: Partial<AssessmentData>) => {
    setAssessmentData(prev => ({ ...prev, ...newData }));
  };

  const CurrentComponent = steps[currentStep].component;
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Compass className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TECH CAREER COMPASS
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-2">Should You Learn Full Stack Java?</p>
          <Badge variant="outline" className="text-sm">
            Complete Assessment • 20-30 minutes
          </Badge>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.id}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    index === currentStep
                      ? "bg-blue-600 text-white"
                      : index < currentStep
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{step.title}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {React.createElement(steps[currentStep].icon, { className: "w-6 h-6 text-blue-600" })}
                {steps[currentStep].title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CurrentComponent
                onNext={nextStep}
                onPrev={prevStep}
                assessmentData={assessmentData}
                updateAssessmentData={updateAssessmentData}
                isFirst={currentStep === 0}
                isLast={currentStep === steps.length - 1}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
