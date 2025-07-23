import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, Zap, Heart, Brain, TrendingUp, MapPin, ArrowRight } from "lucide-react";

interface WiscarSectionProps {
  onComplete: (data: any) => void;
}

interface QuestionOption {
  question: string;
  type: string;
  options?: string[];
  correct?: number;
}

const WiscarSection = ({ onComplete }: { onComplete: (data: any) => void }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  // Flattened Java-specific WISCAR questions
  const questions = [
    {
      category: 'Will (Perseverance)',
      question: "I often stick to learning goals even when it's hard or boring.",
      options: [
        { value: '5', label: 'Always true' },
        { value: '4', label: 'Usually true' },
        { value: '3', label: 'Sometimes true' },
        { value: '2', label: 'Rarely true' },
        { value: '1', label: 'Never true' }
      ]
    },
    {
      category: 'Will (Perseverance)',
      question: 'I have completed challenging projects or courses in the past.',
      options: [
        { value: '5', label: 'Multiple certifications' },
        { value: '4', label: 'Several courses' },
        { value: '3', label: 'A few courses' },
        { value: '2', label: 'One or two' },
        { value: '1', label: 'None completed' }
      ]
    },
    {
      category: 'Interest (Long-term)',
      question: 'I\'m curious about how enterprise applications are built and scaled.',
      options: [
        { value: '5', label: 'Very frequently' },
        { value: '4', label: 'Often' },
        { value: '3', label: 'Sometimes' },
        { value: '2', label: 'Rarely' },
        { value: '1', label: 'Never' }
      ]
    },
    {
      category: 'Interest (Long-term)',
      question: 'I enjoy understanding both frontend and backend development.',
      options: [
        { value: '5', label: 'Strongly agree' },
        { value: '4', label: 'Agree' },
        { value: '3', label: 'Neutral' },
        { value: '2', label: 'Disagree' },
        { value: '1', label: 'Strongly disagree' }
      ]
    },
    {
      category: 'Skill (Current Level)',
      question: 'Rate your confidence in Object-Oriented Programming concepts.',
      options: [
        { value: '5', label: 'Advanced (Programming, databases, etc.)' },
        { value: '4', label: 'Intermediate (Some scripting/coding)' },
        { value: '3', label: 'Basic (Computer literate, some tools)' },
        { value: '2', label: 'Beginner (Limited technical experience)' },
        { value: '1', label: 'No technical background' }
      ]
    },
    {
      category: 'Skill (Current Level)',
      question: 'Rate your confidence in database design and SQL queries.',
      options: [
        { value: '5', label: 'Extensively (Led projects)' },
        { value: '4', label: 'Moderately (Participated in projects)' },
        { value: '3', label: 'Some exposure' },
        { value: '2', label: 'Very limited' },
        { value: '1', label: 'No experience' }
      ]
    },
    {
      category: 'Cognitive Readiness',
      question: 'I can understand complex relationships between different business processes',
      options: [
        { value: '5', label: 'Very easily' },
        { value: '4', label: 'Usually' },
        { value: '3', label: 'Sometimes' },
        { value: '2', label: 'With difficulty' },
        { value: '1', label: 'Very difficult' }
      ]
    },
    {
      category: 'Cognitive Readiness',
      question: 'When faced with a complex problem, I can break it down into smaller parts',
      options: [
        { value: '5', label: 'Always' },
        { value: '4', label: 'Usually' },
        { value: '3', label: 'Sometimes' },
        { value: '2', label: 'Rarely' },
        { value: '1', label: 'Never' }
      ]
    },
    {
      category: 'Ability to Learn',
      question: 'When I fail at something, I analyze what went wrong and improve.',
      options: [
        { value: '5', label: 'Completely confident' },
        { value: '4', label: 'Very confident' },
        { value: '3', label: 'Somewhat confident' },
        { value: '2', label: 'Not very confident' },
        { value: '1', label: 'Not confident at all' }
      ]
    },
    {
      category: 'Ability to Learn',
      question: 'I actively seek feedback and use it to improve my performance',
        options: [
        { value: '5', label: 'Always' },
        { value: '4', label: 'Usually' },
        { value: '3', label: 'Sometimes' },
        { value: '2', label: 'Rarely' },
        { value: '1', label: 'Never' }
      ]
    },
    {
      category: 'Real-World Alignment',
      question: 'Which Java career path appeals to you most?',
        options: [
        { value: '5', label: 'Full Stack Developer (Frontend + Backend)' },
        { value: '4', label: 'Backend Developer (APIs + Business Logic)' },
        { value: '3', label: 'DevOps Engineer (Deployment + Infrastructure)' },
        { value: '2', label: 'Enterprise Architect (System Design)' }
      ]
    },
    {
      category: 'Real-World Alignment',
      question: 'How important is job market demand in your career choice?',
        options: [
        { value: '5', label: 'Very much' },
        { value: '4', label: 'Quite a bit' },
        { value: '3', label: 'Somewhat' },
        { value: '2', label: 'A little' },
        { value: '1', label: 'Not at all' }
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
      // Calculate scores and complete
      // For demo, just average all answers
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
      <Card className="border-2 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-6 h-6 text-orange-600" />
            <span>WISCAR Framework Analysis</span>
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
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-orange-700 mb-2">
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
              className="bg-orange-600 hover:bg-orange-700"
            >
              {isLastQuestion ? 'Complete Assessment' : 'Next Question'}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          {/* WISCAR Explanation */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">WISCAR Framework</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              <div><strong>W</strong>ill - Perseverance</div>
              <div><strong>I</strong>nterest - Long-term curiosity</div>
              <div><strong>S</strong>kill - Current abilities</div>
              <div><strong>C</strong>ognitive - Problem-solving</div>
              <div><strong>A</strong>bility - Learning capacity</div>
              <div><strong>R</strong>eal-world - Job alignment</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WiscarSection;
