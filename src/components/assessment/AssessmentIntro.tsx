
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Database, Server, Smartphone, Wrench, User } from "lucide-react";

interface AssessmentIntroProps {
  onNext: () => void;
  onPrev: () => void;
  assessmentData: any;
  updateAssessmentData: (data: any) => void;
  isFirst: boolean;
  isLast: boolean;
}

const AssessmentIntro = ({ onNext, isFirst, isLast }: AssessmentIntroProps) => {
  const techStack = [
    { name: "Frontend", icon: Smartphone, items: ["HTML", "CSS", "JavaScript", "React/Angular"] },
    { name: "Backend", icon: Server, items: ["Java", "Spring Boot", "REST APIs"] },
    { name: "Database", icon: Database, items: ["MySQL", "PostgreSQL", "MongoDB"] },
    { name: "DevOps", icon: Wrench, items: ["Jenkins", "Docker", "CI/CD"] },
  ];

  const careers = [
    "Java Full Stack Developer",
    "Spring Boot Developer", 
    "Backend Engineer (Java)",
    "Software Engineer (Enterprise Java)",
    "DevOps-enabled Full Stack Engineer"
  ];

  const successTraits = [
    "Strong attention to structure & detail",
    "Patience with complex ecosystems",
    "Analytical thinking",
    "Affinity for architecture, patterns, scalability",
    "Tolerance for verbose but powerful toolchains"
  ];

  return (
    <div className="space-y-8">
      {/* Purpose Section */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          🎯 Assessment Purpose
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          To guide you in deciding if Full Stack Java development aligns with your skills, 
          mindset, and career goals through comprehensive evaluation.
        </p>
      </div>

      {/* What is Full Stack Java */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-6 h-6 text-blue-600" />
            What Is Full Stack Java?
          </CardTitle>
          <CardDescription>
            Building both client-side and server-side applications using Java ecosystem
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {techStack.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <Icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900 mb-2">{tech.name}</h4>
                  <div className="space-y-1">
                    {tech.items.map((item, i) => (
                      <Badge key={i} variant="secondary" className="text-xs mr-1 mb-1">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Career Paths */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-6 h-6 text-green-600" />
            💼 Typical Career Paths
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3">
            {careers.map((career, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-800">{career}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Success Traits */}
      <Card>
        <CardHeader>
          <CardTitle>🧠 Personality & Skill Traits That Succeed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {successTraits.map((trait, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <span className="text-gray-700">{trait}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Assessment Overview */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">What This Assessment Covers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Evaluation Areas:</h4>
              <ul className="space-y-1 text-blue-800">
                <li>• Psychometric Fit (motivation, cognitive style)</li>
                <li>• Technical Readiness & Aptitude</li>
                <li>• WISCAR Framework Analysis</li>
                <li>• Skill Mapping vs Role Expectations</li>
                <li>• Career Path Alignment</li>
                <li>• Personalized Recommendations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">You'll Receive:</h4>
              <ul className="space-y-1 text-blue-800">
                <li>• Detailed fit analysis (0-100 score)</li>
                <li>• Skill gap identification</li>
                <li>• Tailored learning path</li>
                <li>• Alternative career suggestions</li>
                <li>• Next steps guidance</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <div></div>
        <Button onClick={onNext} size="lg" className="px-8">
          Start Assessment →
        </Button>
      </div>
    </div>
  );
};

export default AssessmentIntro;
