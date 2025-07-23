
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Code, Database, Server, Zap, CheckCircle, XCircle, ArrowRight } from "lucide-react";

interface TechnicalSectionProps {
  onComplete: (data: any) => void;
}

const TechnicalSection = ({ onComplete }: TechnicalSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);

  // Flatten all questions from all subsections into a single array, but keep Java-specific content
  const questions = [
    // General Aptitude
    {
      category: 'General Aptitude',
      question: 'If A = 2, B = 4, and C = A + B, what is C * 2?',
      options: [
        { value: '0', label: '8' },
        { value: '1', label: '10' },
        { value: '2', label: '12' },
        { value: '3', label: '14' }
      ],
      correct: '2',
      explanation: 'C = 2 + 4 = 6, so C * 2 = 12'
    },
    {
      category: 'General Aptitude',
      question: 'What comes next in the sequence: 2, 6, 18, 54, ?',
      options: [
        { value: '0', label: '108' },
        { value: '1', label: '162' },
        { value: '2', label: '216' },
        { value: '3', label: '324' }
      ],
      correct: '1',
      explanation: 'Each number is multiplied by 3: 2×3=6, 6×3=18, 18×3=54, 54×3=162'
    },
    {
      category: 'General Aptitude',
      question: 'In a flowchart, what does a diamond shape represent?',
      options: [
        { value: '0', label: 'Process' },
        { value: '1', label: 'Decision' },
        { value: '2', label: 'Input/Output' },
        { value: '3', label: 'Start/End' }
      ],
      correct: '1',
      explanation: 'Diamond shapes represent decision points in flowcharts'
    },
    {
      category: 'General Aptitude',
      question: 'If it takes 5 machines 5 minutes to make 5 widgets, how long does it take 100 machines to make 100 widgets?',
      options: [
        { value: '0', label: '5 minutes' },
        { value: '1', label: '20 minutes' },
        { value: '2', label: '100 minutes' },
        { value: '3', label: '500 minutes' }
      ],
      correct: '0',
      explanation: 'Each machine makes 1 widget in 5 minutes, so 100 machines make 100 widgets in 5 minutes'
    },
    // Foundational Knowledge
    {
      category: 'Foundational Knowledge',
      question: 'Which of the following is NOT a fundamental OOP principle?',
      options: [
        { value: '0', label: 'Encapsulation' },
        { value: '1', label: 'Inheritance' },
        { value: '2', label: 'Polymorphism' },
        { value: '3', label: 'Compilation' }
      ],
      correct: '3',
      explanation: 'Compilation is not an OOP principle. The four main principles are Encapsulation, Inheritance, Polymorphism, and Abstraction'
    },
    {
      category: 'Foundational Knowledge',
      question: 'What is the purpose of a "for" loop?',
      options: [
        { value: '0', label: 'To make decisions' },
        { value: '1', label: 'To repeat code a specific number of times' },
        { value: '2', label: 'To define functions' },
        { value: '3', label: 'To handle errors' }
      ],
      correct: '1',
      explanation: 'A for loop is used to repeat code a specific number of times'
    },
    {
      category: 'Foundational Knowledge',
      question: 'In HTML, which tag is used to create a hyperlink?',
      options: [
        { value: '0', label: '<link>' },
        { value: '1', label: '<url>' },
        { value: '2', label: '<a>' },
        { value: '3', label: '<href>' }
      ],
      correct: '2',
      explanation: 'The <a> tag is used to create hyperlinks in HTML'
    },
    {
      category: 'Foundational Knowledge',
      question: 'What does SQL stand for?',
      options: [
        { value: '0', label: 'Structured Query Language' },
        { value: '1', label: 'System Query Language' },
        { value: '2', label: 'Standard Query Language' },
        { value: '3', label: 'Simple Query Language' }
      ],
      correct: '0',
      explanation: 'SQL stands for Structured Query Language'
    },
    {
      category: 'Foundational Knowledge',
      question: 'Which CSS property is used to change the text color?',
      options: [
        { value: '0', label: 'font-color' },
        { value: '1', label: 'text-color' },
        { value: '2', label: 'color' },
        { value: '3', label: 'foreground-color' }
      ],
      correct: '2',
      explanation: "The 'color' property is used to change text color in CSS"
    },
    // Java Stack Specific
    {
      category: 'Java Stack Specific',
      question: 'Which of the following is the correct way to declare a String variable in Java?',
      options: [
        { value: '0', label: "String str = 'Hello';" },
        { value: '1', label: 'String str = "Hello";' },
        { value: '2', label: 'string str = "Hello";' },
        { value: '3', label: 'Str str = "Hello";' }
      ],
      correct: '1',
      explanation: 'In Java, strings are declared with double quotes and String with capital S'
    },
    {
      category: 'Java Stack Specific',
        question: "What is the purpose of the 'try-catch' block in Java?",
      options: [
        { value: '0', label: 'To define methods' },
        { value: '1', label: 'To handle exceptions' },
        { value: '2', label: 'To create loops' },
        { value: '3', label: 'To declare variables' }
      ],
      correct: '1',
      explanation: 'Try-catch blocks are used to handle exceptions in Java'
    },
    {
      category: 'Java Stack Specific',
      question: 'Which interface is commonly used for storing key-value pairs in Java?',
      options: [
        { value: '0', label: 'List' },
        { value: '1', label: 'Set' },
        { value: '2', label: 'Map' },
        { value: '3', label: 'Queue' }
      ],
      correct: '2',
      explanation: 'The Map interface is used for key-value pair storage'
    },
    {
      category: 'Java Stack Specific',
      question: 'What does REST stand for in web development?',
      options: [
        { value: '0', label: 'Representational State Transfer' },
        { value: '1', label: 'Remote State Transfer' },
        { value: '2', label: 'Relational State Transfer' },
        { value: '3', label: 'Responsive State Transfer' }
      ],
      correct: '0',
      explanation: 'REST stands for Representational State Transfer'
    },
    {
      category: 'Java Stack Specific',
      question: 'In Spring Boot, what annotation is used to mark a class as a REST controller?',
      options: [
        { value: '0', label: '@Controller' },
        { value: '1', label: '@RestController' },
        { value: '2', label: '@Service' },
        { value: '3', label: '@Component' }
      ],
      correct: '1',
      explanation: '@RestController combines @Controller and @ResponseBody for REST endpoints'
    },
    {
      category: 'Java Stack Specific',
      question: 'What is JSON primarily used for?',
      options: [
        { value: '0', label: 'Database storage' },
        { value: '1', label: 'Data interchange' },
        { value: '2', label: 'User interface' },
        { value: '3', label: 'Security' }
      ],
      correct: '1',
      explanation: 'JSON (JavaScript Object Notation) is primarily used for data interchange'
    }
  ];

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: value
    }));
    setShowExplanation(false);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setShowExplanation(false);
    } else {
      // Calculate score and complete
      let totalCorrect = 0;
      questions.forEach((q, idx) => {
        if (answers[idx] === q.correct) totalCorrect++;
      });
      const overallScore = Math.round((totalCorrect / questions.length) * 100);
      onComplete({
        overall: overallScore,
        correctAnswers: totalCorrect,
        totalQuestions: questions.length,
        answers
      });
    }
  };

  const showAnswer = () => {
    setShowExplanation(true);
  };

  const currentAnswer = answers[currentQuestion];
  const isCorrect = currentAnswer === questions[currentQuestion].correct;
  const canProceed = currentAnswer !== undefined;
  const isLastQuestion = currentQuestion === questions.length - 1;

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="border-2 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Code className="w-6 h-6 text-green-600" />
            <span>Technical & Aptitude Assessment</span>
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
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-green-700 mb-2">
              {questions[currentQuestion].category}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {questions[currentQuestion].question}
            </h3>
            <RadioGroup
              value={currentAnswer || ''}
              onValueChange={handleAnswerChange}
              className="space-y-3"
            >
              {questions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`option-${index}`} />
                  <Label 
                    htmlFor={`option-${index}`} 
                    className={`text-sm cursor-pointer flex-1 py-2 px-3 rounded transition-colors ${
                      showExplanation && option.value === questions[currentQuestion].correct
                        ? 'bg-green-200 border-green-400 border'
                        : showExplanation && currentAnswer === option.value && !isCorrect
                        ? 'bg-red-200 border-red-400 border'
                        : 'hover:bg-white/50'
                    }`}
                  >
                    {option.label}
                    </Label>
                  </div>
              ))}
            </RadioGroup>
            {showExplanation && (
              <div className={`mt-4 p-3 rounded-lg ${isCorrect ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'}`}>
                <div className="flex items-start space-x-2">
                  {isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  )}
                  <div>
                    <div className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                      {isCorrect ? 'Correct!' : 'Incorrect'}
                    </div>
                    <div className="text-sm text-gray-700 mt-1">
                      {questions[currentQuestion].explanation}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Category: {questions[currentQuestion].category}
            </div>
            <div className="space-x-3">
              {canProceed && !showExplanation && (
                <Button 
                  onClick={showAnswer}
                  variant="outline"
                  className="text-gray-600"
                >
                  Show Answer
                </Button>
              )}
              <Button 
                onClick={handleNext}
                disabled={!canProceed}
                className="bg-green-600 hover:bg-green-700"
              >
                {isLastQuestion ? 'Complete Section' : 'Next Question'}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TechnicalSection;
