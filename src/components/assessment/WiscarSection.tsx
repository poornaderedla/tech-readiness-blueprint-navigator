import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, Zap, Heart, Brain, TrendingUp, MapPin } from "lucide-react";

interface WiscarSectionProps {
  onNext: () => void;
  onPrev: () => void;
  assessmentData: any;
  updateAssessmentData: (data: any) => void;
  isFirst: boolean;
  isLast: boolean;
}

interface QuestionOption {
  question: string;
  type: string;
  options?: string[];
  correct?: number;
}

const WiscarSection = ({ onNext, onPrev, assessmentData, updateAssessmentData }: WiscarSectionProps) => {
  const [currentDimension, setCurrentDimension] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<{ [key: string]: number }>({});

  const dimensions = [
    {
      id: "will",
      title: "Will",
      icon: Zap,
      description: "Drive, grit, consistency",
      color: "red"
    },
    {
      id: "interest",
      title: "Interest", 
      icon: Heart,
      description: "Curiosity & purpose-fit",
      color: "pink"
    },
    {
      id: "skill",
      title: "Skill",
      icon: Target,
      description: "Current technical/soft skills",
      color: "blue"
    },
    {
      id: "cognitive",
      title: "Cognitive Readiness",
      icon: Brain,
      description: "Mental processing for complexity",
      color: "purple"
    },
    {
      id: "ability",
      title: "Ability to Learn",
      icon: TrendingUp,
      description: "Growth mindset & reflection",
      color: "green"
    },
    {
      id: "realWorld",
      title: "Real-World Alignment",
      icon: MapPin,
      description: "Job alignment, use-case clarity",
      color: "orange"
    }
  ];

  const questions: Record<string, QuestionOption[]> = {
    will: [
      {
        question: "I often stick to learning goals even when it's hard or boring.",
        type: "likert"
      },
      {
        question: "I have completed challenging projects or courses in the past.",
        type: "likert"
      },
      {
        question: "I'm willing to spend evenings and weekends learning Full Stack Java.",
        type: "likert"
      }
    ],
    interest: [
      {
        question: "I'm curious about how enterprise applications are built and scaled.",
        type: "likert"
      },
      {
        question: "I enjoy understanding both frontend and backend development.",
        type: "likert"
      },
      {
        question: "I'm excited about working with Java frameworks like Spring Boot.",
        type: "likert"
      }
    ],
    skill: [
      {
        question: "Rate your confidence in Object-Oriented Programming concepts.",
        type: "confidence"
      },
      {
        question: "Rate your confidence in database design and SQL queries.",
        type: "confidence"
      },
      {
        question: "Rate your confidence in web development (HTML, CSS, JavaScript).",
        type: "confidence"
      }
    ],
    cognitive: [
      {
        question: "Solve this logic puzzle: If all Bloops are Razzles and all Razzles are Lazzles, are all Bloops Lazzles?",
        options: ["Yes", "No", "Cannot be determined"],
        correct: 0,
        type: "logic"
      },
      {
        question: "You're debugging a complex application with multiple layers. How do you approach it?",
        options: [
          "Start randomly checking different parts",
          "Systematically trace through each layer",
          "Ask for help immediately",
          "Use only logs to understand the issue"
        ],
        correct: 1,
        type: "problem_solving"
      },
      {
        question: "How comfortable are you with learning interconnected systems (database + backend + frontend)?",
        type: "comfort"
      }
    ],
    ability: [
      {
        question: "When I fail at something, I analyze what went wrong and improve.",
        type: "likert"
      },
      {
        question: "I actively seek feedback to improve my skills.",
        type: "likert"
      },
      {
        question: "I can adapt my learning style based on the material.",
        type: "likert"
      }
    ],
    realWorld: [
      {
        question: "Which Java career path appeals to you most?",
        options: [
          "Full Stack Developer (Frontend + Backend)",
          "Backend Developer (APIs + Business Logic)",
          "DevOps Engineer (Deployment + Infrastructure)",
          "Enterprise Architect (System Design)"
        ],
        type: "career_preference"
      },
      {
        question: "What type of applications do you want to build?",
        options: [
          "E-commerce platforms",
          "Banking and financial systems",
          "Healthcare management systems",
          "Social media platforms"
        ],
        type: "application_preference"
      },
      {
        question: "How important is job market demand in your career choice?",
        type: "importance"
      }
    ]
  };

  const getCurrentQuestions = () => {
    const dimensionId = dimensions[currentDimension].id;
    return questions[dimensionId as keyof typeof questions];
  };

  const likertScale = [
    { value: 1, label: "Strongly Disagree" },
    { value: 2, label: "Disagree" },
    { value: 3, label: "Neutral" },
    { value: 4, label: "Agree" },
    { value: 5, label: "Strongly Agree" }
  ];

  const confidenceScale = [
    { value: 1, label: "Not Confident" },
    { value: 2, label: "Slightly Confident" },
    { value: 3, label: "Moderately Confident" },
    { value: 4, label: "Very Confident" },
    { value: 5, label: "Extremely Confident" }
  ];

  const comfortScale = [
    { value: 1, label: "Very Uncomfortable" },
    { value: 2, label: "Uncomfortable" },
    { value: 3, label: "Neutral" },
    { value: 4, label: "Comfortable" },
    { value: 5, label: "Very Comfortable" }
  ];

  const importanceScale = [
    { value: 1, label: "Not Important" },
    { value: 2, label: "Slightly Important" },
    { value: 3, label: "Moderately Important" },
    { value: 4, label: "Very Important" },
    { value: 5, label: "Extremely Important" }
  ];

  const handleResponse = (value: string) => {
    const key = `${dimensions[currentDimension].id}_${currentQuestion}`;
    setResponses(prev => ({
      ...prev,
      [key]: parseInt(value)
    }));
  };

  const nextQuestion = () => {
    const currentQuestions = getCurrentQuestions();
    
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentDimension < dimensions.length - 1) {
      setCurrentDimension(currentDimension + 1);
      setCurrentQuestion(0);
    } else {
      // Calculate WISCAR scores
      const wiscarScores = {};
      
      dimensions.forEach(dimension => {
        const dimensionQuestions = questions[dimension.id];
        let totalScore = 0;
        
        dimensionQuestions.forEach((_, index) => {
          const key = `${dimension.id}_${index}`;
          totalScore += responses[key] || 0;
        });
        
        const maxScore = dimensionQuestions.length * 5;
        wiscarScores[dimension.id] = Math.round((totalScore / maxScore) * 100);
      });
      
      updateAssessmentData({
        wiscarScores,
        wiscarResponses: responses
      });
      
      onNext();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (currentDimension > 0) {
      setCurrentDimension(currentDimension - 1);
      const prevDimensionId = dimensions[currentDimension - 1].id;
      setCurrentQuestion(questions[prevDimensionId as keyof typeof questions].length - 1);
    } else {
      onPrev();
    }
  };

  const currentQuestions = getCurrentQuestions();
  const currentQuestionData = currentQuestions[currentQuestion];
  const currentDimensionData = dimensions[currentDimension];
  const Icon = currentDimensionData.icon;

  // Calculate progress
  let totalQuestions = 0;
  let completedQuestions = 0;
  
  Object.values(questions).forEach(dimensionQuestions => {
    totalQuestions += dimensionQuestions.length;
  });
  
  for (let i = 0; i < currentDimension; i++) {
    const dimensionId = dimensions[i].id;
    completedQuestions += questions[dimensionId as keyof typeof questions].length;
  }
  completedQuestions += currentQuestion;
  
  const progress = ((completedQuestions + 1) / totalQuestions) * 100;

  const key = `${currentDimensionData.id}_${currentQuestion}`;
  const selectedAnswer = responses[key];

  const getScale = () => {
    const questionType = currentQuestionData.type;
    switch (questionType) {
      case 'confidence':
        return confidenceScale;
      case 'comfort':
        return comfortScale;
      case 'importance':
        return importanceScale;
      default:
        return likertScale;
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
          <Target className="w-6 h-6 text-blue-600" />
          WISCAR Framework Analysis
        </h2>
        <p className="text-gray-600 mb-4">
          Comprehensive readiness evaluation across six key dimensions
        </p>
      </div>

      {/* Framework Overview */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">WISCAR Dimensions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {dimensions.map((dim, index) => {
              const DimIcon = dim.icon;
              return (
                <div
                  key={dim.id}
                  className={`p-3 rounded-lg text-center ${
                    index === currentDimension
                      ? `bg-${dim.color}-100 border-2 border-${dim.color}-300`
                      : index < currentDimension
                      ? "bg-green-100 border-green-300"
                      : "bg-gray-100"
                  }`}
                >
                  <DimIcon className={`w-6 h-6 mx-auto mb-2 ${
                    index === currentDimension ? `text-${dim.color}-600` : "text-gray-600"
                  }`} />
                  <h4 className="font-semibold text-sm">{dim.title}</h4>
                  <p className="text-xs text-gray-600">{dim.description}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Question {currentQuestion + 1} of {currentQuestions.length} ({currentDimensionData.title})</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Current Dimension Info */}
      <Card className={`border-2 border-${currentDimensionData.color}-200 bg-${currentDimensionData.color}-50`}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Icon className={`w-5 h-5 text-${currentDimensionData.color}-600`} />
            {currentDimensionData.title}
          </CardTitle>
          <CardDescription>{currentDimensionData.description}</CardDescription>
        </CardHeader>
      </Card>

      {/* Question Card */}
      <Card className="border-2 border-blue-200">
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-lg font-medium text-gray-800 mb-6">
                {currentQuestionData.question}
              </p>
            </div>

            {(currentQuestionData.type === 'logic' || 
              currentQuestionData.type === 'problem_solving' || 
              currentQuestionData.type === 'career_preference' || 
              currentQuestionData.type === 'application_preference') && 
              currentQuestionData.options ? (
              <RadioGroup
                value={selectedAnswer?.toString()}
                onValueChange={handleResponse}
                className="space-y-4"
              >
                {currentQuestionData.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="cursor-pointer flex-1 text-gray-700">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <RadioGroup
                value={selectedAnswer?.toString()}
                onValueChange={handleResponse}
                className="space-y-4"
              >
                {getScale().map((option) => (
                  <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50">
                    <RadioGroupItem value={option.value.toString()} id={`scale-${option.value}`} />
                    <Label htmlFor={`scale-${option.value}`} className="cursor-pointer flex-1 text-gray-700">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={prevQuestion}>
          ← Back
        </Button>
        <Button 
          onClick={nextQuestion}
          disabled={selectedAnswer === undefined}
          className="px-8"
        >
          {currentQuestion === currentQuestions.length - 1 && currentDimension === dimensions.length - 1 
            ? 'Complete Section' 
            : 'Next Question'} →
        </Button>
      </div>
    </div>
  );
};

export default WiscarSection;
