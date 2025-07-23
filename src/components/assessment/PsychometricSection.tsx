
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Brain, Target, ArrowRight } from "lucide-react";

interface PsychometricSectionProps {
  onComplete: (data: any) => void;
}

const PsychometricSection = ({ onComplete }: PsychometricSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  // Use the Java-specific questions, but as a flat array
  const questions = [
    {
      category: "Conscientiousness",
      question: "I enjoy building robust systems that handle large-scale business logic.",
      options: [
        { value: '5', label: "Strongly Agree" },
        { value: '4', label: "Agree" },
        { value: '3', label: "Neutral" },
        { value: '2', label: "Disagree" },
        { value: '1', label: "Strongly Disagree" }
      ]
    },
    {
      category: "Conscientiousness",
      question: "I prefer clarity and structure in my daily work.",
      options: [
        { value: '5', label: "Strongly Agree" },
        { value: '4', label: "Agree" },
        { value: '3', label: "Neutral" },
        { value: '2', label: "Disagree" },
        { value: '1', label: "Strongly Disagree" }
      ]
    },
    {
      category: "Openness",
      question: "I often explore how systems work behind the scenes.",
      options: [
        { value: '5', label: "Strongly Agree" },
        { value: '4', label: "Agree" },
        { value: '3', label: "Neutral" },
        { value: '2', label: "Disagree" },
        { value: '1', label: "Strongly Disagree" }
      ]
    },
    {
      category: "Openness",
      question: "I enjoy learning new programming frameworks and tools.",
      options: [
        { value: '5', label: "Strongly Agree" },
        { value: '4', label: "Agree" },
        { value: '3', label: "Neutral" },
        { value: '2', label: "Disagree" },
        { value: '1', label: "Strongly Disagree" }
      ]
    },
    {
      category: "Conscientiousness",
      question: "I pay close attention to code quality and best practices.",
      options: [
        { value: '5', label: "Strongly Agree" },
        { value: '4', label: "Agree" },
        { value: '3', label: "Neutral" },
        { value: '2', label: "Disagree" },
        { value: '1', label: "Strongly Disagree" }
      ]
    },
    {
      category: "Grit",
      question: "I persist through challenging debugging sessions until I find solutions.",
      options: [
        { value: '5', label: "Strongly Agree" },
        { value: '4', label: "Agree" },
        { value: '3', label: "Neutral" },
        { value: '2', label: "Disagree" },
        { value: '1', label: "Strongly Disagree" }
      ]
    },
    {
      category: "Holland Code - Investigative",
      question: "I enjoy analyzing complex problems and finding systematic solutions.",
      options: [
        { value: '5', label: "Strongly Agree" },
        { value: '4', label: "Agree" },
        { value: '3', label: "Neutral" },
        { value: '2', label: "Disagree" },
        { value: '1', label: "Strongly Disagree" }
      ]
    },
    {
      category: "Holland Code - Conventional",
      question: "I work well within established frameworks and conventions.",
      options: [
        { value: '5', label: "Strongly Agree" },
        { value: '4', label: "Agree" },
        { value: '3', label: "Neutral" },
        { value: '2', label: "Disagree" },
        { value: '1', label: "Strongly Disagree" }
      ]
    },
    {
      category: "Motivational Style",
      question: "I'm more motivated by solving interesting problems than by salary alone.",
      options: [
        { value: '5', label: "Strongly Agree" },
        { value: '4', label: "Agree" },
        { value: '3', label: "Neutral" },
        { value: '2', label: "Disagree" },
        { value: '1', label: "Strongly Disagree" }
      ]
    },
    {
      category: "Growth Mindset",
      question: "I believe my programming abilities can be developed through practice.",
      options: [
        { value: '5', label: "Strongly Agree" },
        { value: '4', label: "Agree" },
        { value: '3', label: "Neutral" },
        { value: '2', label: "Disagree" },
        { value: '1', label: "Strongly Disagree" }
      ]
    },
    {
      category: "Cognitive Style",
      question: "I prefer working with well-defined specifications and requirements.",
      options: [
        { value: '5', label: "Strongly Agree" },
        { value: '4', label: "Agree" },
        { value: '3', label: "Neutral" },
        { value: '2', label: "Disagree" },
        { value: '1', label: "Strongly Disagree" }
      ]
    },
    {
      category: "Tolerance for Complexity",
      question: "I don't mind working with verbose but powerful frameworks like Spring.",
      options: [
        { value: '5', label: "Strongly Agree" },
        { value: '4', label: "Agree" },
        { value: '3', label: "Neutral" },
        { value: '2', label: "Disagree" },
        { value: '1', label: "Strongly Disagree" }
      ]
    },
    {
      category: "Team Collaboration",
      question: "I work well in teams following established development processes.",
      options: [
        { value: '5', label: "Strongly Agree" },
        { value: '4', label: "Agree" },
        { value: '3', label: "Neutral" },
        { value: '2', label: "Disagree" },
        { value: '1', label: "Strongly Disagree" }
      ]
    },
    {
      category: "Enterprise Mindset",
      question: "I'm interested in building applications that serve business needs.",
      options: [
        { value: '5', label: "Strongly Agree" },
        { value: '4', label: "Agree" },
        { value: '3', label: "Neutral" },
        { value: '2', label: "Disagree" },
        { value: '1', label: "Strongly Disagree" }
      ]
    },
    {
      category: "Learning Style",
      question: "I learn best through hands-on practice and structured tutorials.",
      options: [
        { value: '5', label: "Strongly Agree" },
        { value: '4', label: "Agree" },
        { value: '3', label: "Neutral" },
        { value: '2', label: "Disagree" },
        { value: '1', label: "Strongly Disagree" }
      ]
    }
  ];

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Calculate score and complete
      const totalScore = Object.values(answers).reduce((sum, score) => sum + parseInt(score), 0);
      const maxScore = questions.length * 5;
      const overallScore = Math.round((totalScore / maxScore) * 100);
      onComplete({
        overall: overallScore,
        answers
      });
    }
  };

  const canProceed = answers[currentQuestion] !== undefined;
  const isLastQuestion = currentQuestion === questions.length - 1;

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="border-2 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-purple-600" />
            <span>Psychological Fit Assessment</span>
          </CardTitle>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-purple-700 mb-2">
              {questions[currentQuestion].category}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {questions[currentQuestion].question}
            </h3>
            <RadioGroup
              value={answers[currentQuestion] || ''}
              onValueChange={handleAnswerChange}
              className="space-y-3"
            >
              {questions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`option-${index}`} />
                  <Label 
                    htmlFor={`option-${index}`} 
                    className="text-sm cursor-pointer flex-1 py-2 px-3 rounded hover:bg-white/50 transition-colors"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Evaluating: {questions[currentQuestion].category}
            </div>
            <Button 
              onClick={handleNext}
              disabled={!canProceed}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isLastQuestion ? 'Complete Section' : 'Next Question'}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PsychometricSection;
