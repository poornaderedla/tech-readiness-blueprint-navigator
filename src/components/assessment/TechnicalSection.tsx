
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Code, Database, Server, Zap } from "lucide-react";

interface TechnicalSectionProps {
  onNext: () => void;
  onPrev: () => void;
  assessmentData: any;
  updateAssessmentData: (data: any) => void;
  isFirst: boolean;
  isLast: boolean;
}

const TechnicalSection = ({ onNext, onPrev, assessmentData, updateAssessmentData }: TechnicalSectionProps) => {
  const [currentSubsection, setCurrentSubsection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<{ [key: string]: number }>({});

  const subsections = [
    {
      id: "aptitude",
      title: "General Aptitude",
      icon: Zap,
      description: "Logical reasoning, numerical reasoning, pattern recognition",
      duration: "10 min",
      color: "blue"
    },
    {
      id: "foundation",
      title: "Foundational Knowledge",
      icon: Code,
      description: "Programming logic, OOP principles, HTML/CSS, SQL basics",
      duration: "8 min",
      color: "green"
    },
    {
      id: "java",
      title: "Java Stack Specific",
      icon: Server,
      description: "Java syntax, Spring Boot, REST APIs, Collections",
      duration: "12 min",
      color: "orange"
    }
  ];

  const questions = {
    aptitude: [
      {
        question: "If A = 2, B = 4, and C = A + B, what is C * 2?",
        options: ["8", "10", "12", "14"],
        correct: 2,
        explanation: "C = 2 + 4 = 6, so C * 2 = 12"
      },
      {
        question: "What comes next in the sequence: 2, 6, 18, 54, ?",
        options: ["108", "162", "216", "324"],
        correct: 1,
        explanation: "Each number is multiplied by 3: 2×3=6, 6×3=18, 18×3=54, 54×3=162"
      },
      {
        question: "In a flowchart, what does a diamond shape represent?",
        options: ["Process", "Decision", "Input/Output", "Start/End"],
        correct: 1,
        explanation: "Diamond shapes represent decision points in flowcharts"
      },
      {
        question: "If it takes 5 machines 5 minutes to make 5 widgets, how long does it take 100 machines to make 100 widgets?",
        options: ["5 minutes", "20 minutes", "100 minutes", "500 minutes"],
        correct: 0,
        explanation: "Each machine makes 1 widget in 5 minutes, so 100 machines make 100 widgets in 5 minutes"
      }
    ],
    foundation: [
      {
        question: "Which of the following is NOT a fundamental OOP principle?",
        options: ["Encapsulation", "Inheritance", "Polymorphism", "Compilation"],
        correct: 3,
        explanation: "Compilation is not an OOP principle. The four main principles are Encapsulation, Inheritance, Polymorphism, and Abstraction"
      },
      {
        question: "What is the purpose of a 'for' loop?",
        options: ["To make decisions", "To repeat code a specific number of times", "To define functions", "To handle errors"],
        correct: 1,
        explanation: "A for loop is used to repeat code a specific number of times"
      },
      {
        question: "In HTML, which tag is used to create a hyperlink?",
        options: ["<link>", "<url>", "<a>", "<href>"],
        correct: 2,
        explanation: "The <a> tag is used to create hyperlinks in HTML"
      },
      {
        question: "What does SQL stand for?",
        options: ["Structured Query Language", "System Query Language", "Standard Query Language", "Simple Query Language"],
        correct: 0,
        explanation: "SQL stands for Structured Query Language"
      },
      {
        question: "Which CSS property is used to change the text color?",
        options: ["font-color", "text-color", "color", "foreground-color"],
        correct: 2,
        explanation: "The 'color' property is used to change text color in CSS"
      }
    ],
    java: [
      {
        question: "Which of the following is the correct way to declare a String variable in Java?",
        options: ["String str = 'Hello';", "String str = \"Hello\";", "string str = \"Hello\";", "Str str = \"Hello\";"],
        correct: 1,
        explanation: "In Java, strings are declared with double quotes and String with capital S"
      },
      {
        question: "What is the purpose of the 'try-catch' block in Java?",
        options: ["To define methods", "To handle exceptions", "To create loops", "To declare variables"],
        correct: 1,
        explanation: "Try-catch blocks are used to handle exceptions in Java"
      },
      {
        question: "Which interface is commonly used for storing key-value pairs in Java?",
        options: ["List", "Set", "Map", "Queue"],
        correct: 2,
        explanation: "The Map interface is used for key-value pair storage"
      },
      {
        question: "What does REST stand for in web development?",
        options: ["Representational State Transfer", "Remote State Transfer", "Relational State Transfer", "Responsive State Transfer"],
        correct: 0,
        explanation: "REST stands for Representational State Transfer"
      },
      {
        question: "In Spring Boot, what annotation is used to mark a class as a REST controller?",
        options: ["@Controller", "@RestController", "@Service", "@Component"],
        correct: 1,
        explanation: "@RestController combines @Controller and @ResponseBody for REST endpoints"
      },
      {
        question: "What is JSON primarily used for?",
        options: ["Database storage", "Data interchange", "User interface", "Security"],
        correct: 1,
        explanation: "JSON (JavaScript Object Notation) is primarily used for data interchange"
      }
    ]
  };

  const getCurrentQuestions = () => {
    const subsectionId = subsections[currentSubsection].id;
    return questions[subsectionId as keyof typeof questions];
  };

  const handleResponse = (value: string) => {
    const key = `${subsections[currentSubsection].id}_${currentQuestion}`;
    setResponses(prev => ({
      ...prev,
      [key]: parseInt(value)
    }));
  };

  const nextQuestion = () => {
    const currentQuestions = getCurrentQuestions();
    
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentSubsection < subsections.length - 1) {
      setCurrentSubsection(currentSubsection + 1);
      setCurrentQuestion(0);
    } else {
      // Calculate technical score
      let totalCorrect = 0;
      let totalQuestions = 0;
      
      Object.entries(questions).forEach(([sectionId, sectionQuestions]) => {
        sectionQuestions.forEach((q, index) => {
          const key = `${sectionId}_${index}`;
          if (responses[key] === q.correct) {
            totalCorrect++;
          }
          totalQuestions++;
        });
      });
      
      const technicalScore = Math.round((totalCorrect / totalQuestions) * 100);
      
      updateAssessmentData({
        technicalScore,
        technicalResponses: responses
      });
      
      onNext();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (currentSubsection > 0) {
      setCurrentSubsection(currentSubsection - 1);
      const prevSubsectionId = subsections[currentSubsection - 1].id;
      setCurrentQuestion(questions[prevSubsectionId as keyof typeof questions].length - 1);
    } else {
      onPrev();
    }
  };

  const currentQuestions = getCurrentQuestions();
  const currentQuestionData = currentQuestions[currentQuestion];
  const currentSubsectionData = subsections[currentSubsection];
  const Icon = currentSubsectionData.icon;

  // Calculate progress
  let totalQuestions = 0;
  let completedQuestions = 0;
  
  Object.values(questions).forEach(sectionQuestions => {
    totalQuestions += sectionQuestions.length;
  });
  
  for (let i = 0; i < currentSubsection; i++) {
    const sectionId = subsections[i].id;
    completedQuestions += questions[sectionId as keyof typeof questions].length;
  }
  completedQuestions += currentQuestion;
  
  const progress = ((completedQuestions + 1) / totalQuestions) * 100;

  const key = `${currentSubsectionData.id}_${currentQuestion}`;
  const selectedAnswer = responses[key];

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
          <Code className="w-6 h-6 text-blue-600" />
          Technical & Aptitude Assessment
        </h2>
        <p className="text-gray-600 mb-4">
          Testing general aptitude, foundational skills, and Java-specific knowledge
        </p>
      </div>

      {/* Subsection Navigation */}
      <div className="flex justify-center space-x-4 mb-6">
        {subsections.map((subsection, index) => {
          const SubIcon = subsection.icon;
          return (
            <div
              key={subsection.id}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium ${
                index === currentSubsection
                  ? `bg-${subsection.color}-100 text-${subsection.color}-700 border-2 border-${subsection.color}-300`
                  : index < currentSubsection
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              <SubIcon className="w-4 h-4" />
              <span>{subsection.title}</span>
              <Badge variant="outline" className="text-xs">
                {subsection.duration}
              </Badge>
            </div>
          );
        })}
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Question {currentQuestion + 1} of {currentQuestions.length} ({currentSubsectionData.title})</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Current Subsection Info */}
      <Card className={`border-2 border-${currentSubsectionData.color}-200 bg-${currentSubsectionData.color}-50`}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Icon className={`w-5 h-5 text-${currentSubsectionData.color}-600`} />
            {currentSubsectionData.title}
          </CardTitle>
          <CardDescription>{currentSubsectionData.description}</CardDescription>
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
          {currentQuestion === currentQuestions.length - 1 && currentSubsection === subsections.length - 1 
            ? 'Complete Section' 
            : 'Next Question'} →
        </Button>
      </div>
    </div>
  );
};

export default TechnicalSection;
