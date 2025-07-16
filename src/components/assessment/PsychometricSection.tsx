
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Brain, Target } from "lucide-react";

interface PsychometricSectionProps {
  onNext: () => void;
  onPrev: () => void;
  assessmentData: any;
  updateAssessmentData: (data: any) => void;
  isFirst: boolean;
  isLast: boolean;
}

const PsychometricSection = ({ onNext, onPrev, assessmentData, updateAssessmentData }: PsychometricSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<{ [key: number]: number }>({});

  const questions = [
    {
      category: "Conscientiousness",
      text: "I enjoy building robust systems that handle large-scale business logic.",
      trait: "structure_preference"
    },
    {
      category: "Conscientiousness", 
      text: "I prefer clarity and structure in my daily work.",
      trait: "structure_preference"
    },
    {
      category: "Openness",
      text: "I often explore how systems work behind the scenes.",
      trait: "investigative_nature"
    },
    {
      category: "Openness",
      text: "I enjoy learning new programming frameworks and tools.",
      trait: "learning_openness"
    },
    {
      category: "Conscientiousness",
      text: "I pay close attention to code quality and best practices.",
      trait: "detail_orientation"
    },
    {
      category: "Grit",
      text: "I persist through challenging debugging sessions until I find solutions.",
      trait: "persistence"
    },
    {
      category: "Holland Code - Investigative",
      text: "I enjoy analyzing complex problems and finding systematic solutions.",
      trait: "analytical_thinking"
    },
    {
      category: "Holland Code - Conventional",
      text: "I work well within established frameworks and conventions.",
      trait: "conventional_preference"
    },
    {
      category: "Motivational Style",
      text: "I'm more motivated by solving interesting problems than by salary alone.",
      trait: "intrinsic_motivation"
    },
    {
      category: "Growth Mindset",
      text: "I believe my programming abilities can be developed through practice.",
      trait: "growth_mindset"
    },
    {
      category: "Cognitive Style",
      text: "I prefer working with well-defined specifications and requirements.",
      trait: "structured_thinking"
    },
    {
      category: "Tolerance for Complexity",
      text: "I don't mind working with verbose but powerful frameworks like Spring.",
      trait: "complexity_tolerance"
    },
    {
      category: "Team Collaboration",
      text: "I work well in teams following established development processes.",
      trait: "team_collaboration"
    },
    {
      category: "Enterprise Mindset",
      text: "I'm interested in building applications that serve business needs.",
      trait: "business_orientation"
    },
    {
      category: "Learning Style",
      text: "I learn best through hands-on practice and structured tutorials.",
      trait: "practical_learning"
    }
  ];

  const likertScale = [
    { value: 1, label: "Strongly Disagree" },
    { value: 2, label: "Disagree" },
    { value: 3, label: "Neutral" },
    { value: 4, label: "Agree" },
    { value: 5, label: "Strongly Agree" }
  ];

  const handleResponse = (value: string) => {
    setResponses(prev => ({
      ...prev,
      [currentQuestion]: parseInt(value)
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate psychometric score
      const totalScore = Object.values(responses).reduce((sum, score) => sum + score, 0);
      const maxScore = questions.length * 5;
      const psychometricScore = Math.round((totalScore / maxScore) * 100);
      
      updateAssessmentData({
        psychometricScore,
        psychometricResponses: responses
      });
      
      onNext();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      onPrev();
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
          <Brain className="w-6 h-6 text-purple-600" />
          Psychometric Evaluation
        </h2>
        <p className="text-gray-600 mb-4">
          Evaluating your intrinsic traits, interests, and motivational alignment
        </p>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-purple-800">
            <strong>Purpose:</strong> To assess psychological fit using Big 5 Personality, Holland Codes, 
            Grit & Growth Mindset, and Cognitive Preferences
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="border-2 border-purple-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              {currentQuestionData.category}
            </CardTitle>
            <Target className="w-5 h-5 text-purple-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-lg font-medium text-gray-800 mb-6">
                "{currentQuestionData.text}"
              </p>
            </div>

            <RadioGroup
              value={responses[currentQuestion]?.toString()}
              onValueChange={handleResponse}
              className="space-y-4"
            >
              {likertScale.map((option) => (
                <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-50">
                  <RadioGroupItem value={option.value.toString()} id={`option-${option.value}`} />
                  <Label htmlFor={`option-${option.value}`} className="cursor-pointer flex-1 text-gray-700">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Trait Info */}
      <Card className="bg-gray-50">
        <CardContent className="p-4">
          <p className="text-sm text-gray-600">
            <strong>This question evaluates:</strong> {currentQuestionData.trait.replace(/_/g, ' ')}
          </p>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={prevQuestion}>
          ← Back
        </Button>
        <Button 
          onClick={nextQuestion}
          disabled={!responses[currentQuestion]}
          className="px-8"
        >
          {currentQuestion === questions.length - 1 ? 'Complete Section' : 'Next Question'} →
        </Button>
      </div>
    </div>
  );
};

export default PsychometricSection;
