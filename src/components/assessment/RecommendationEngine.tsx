import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle, XCircle, TrendingUp, Target, Book } from "lucide-react";

interface RecommendationEngineProps {
  onNext: () => void;
  onPrev: () => void;
  assessmentData: any;
  updateAssessmentData: (data: any) => void;
  isFirst: boolean;
  isLast: boolean;
}

const RecommendationEngine = ({ onNext, onPrev, assessmentData }: RecommendationEngineProps) => {
  // Calculate overall score with proper type handling
  const psychometric = assessmentData.psychometric || {};
  const technical = assessmentData.technical || {};
  const wiscar = assessmentData.wiscar || {};

  const psychometricScore = psychometric.overall || 0;
  const technicalScore = technical.overall || 0;
  const wiscarScore = wiscar.overall || 0;

  const overallScore = Math.round((psychometricScore + technicalScore + wiscarScore) / 3);

  // Recommendation logic
  const calculateOverallRecommendation = () => {
    if (overallScore >= 75) {
      return {
        recommendation: 'YES',
        title: 'Java Full Stack is an Excellent Fit for You!',
        color: 'green',
        icon: CheckCircle,
        description: 'You show strong alignment across psychological fit, technical readiness, and holistic assessment dimensions.'
      };
    } else if (overallScore >= 60) {
      return {
        recommendation: 'MAYBE',
        title: 'Java Full Stack Could Be Right with Preparation',
        color: 'orange',
        icon: AlertCircle,
        description: 'You have potential but may need to strengthen certain areas before diving deep into Java Full Stack.'
      };
    } else {
      return {
        recommendation: 'NO',
        title: 'Consider Alternative Paths',
        color: 'red',
        icon: XCircle,
        description: 'Based on your current profile, other technology paths might be a better fit for your interests and skills.'
      };
    }
  };
  const recommendation = calculateOverallRecommendation();
  const RecommendationIcon = recommendation.icon;

  // Java/tech-specific career paths
  const careerPaths = [
    {
      title: 'Java Full Stack Developer',
      description: 'Build complete web applications with both frontend and backend',
      skillMatch: Math.max(technicalScore, 70),
      requirements: ['Java', 'Spring Boot', 'React/Angular', 'SQL']
    },
    {
      title: 'Spring Boot Developer',
      description: 'Specialize in backend and REST APIs with Spring Boot',
      skillMatch: Math.max(technicalScore, 65),
      requirements: ['Java', 'Spring Boot', 'REST APIs']
    },
    {
      title: 'Backend Engineer (Java)',
      description: 'Focus on server-side logic, APIs, and business processes',
      skillMatch: Math.max(technicalScore, 60),
      requirements: ['Java', 'APIs', 'Database', 'OOP']
    },
    {
      title: 'DevOps-enabled Full Stack Engineer',
      description: 'Integrate DevOps practices into full stack development',
      skillMatch: Math.max(technicalScore, 55),
      requirements: ['Java', 'CI/CD', 'Docker', 'Cloud']
    }
  ];

  // Java learning path
  const learningPath = [
    {
      stage: 'Foundation',
      modules: ['Java Basics', 'OOP Principles', 'Version Control (Git)'],
      duration: '2-4 weeks',
    },
    {
      stage: 'Intermediate',
      modules: ['Spring Boot Fundamentals', 'REST API Development', 'Frontend Basics (React/Angular)'],
      duration: '6-8 weeks',
    },
    {
      stage: 'Advanced',
      modules: ['Full Stack Project', 'Database Integration', 'DevOps Basics'],
      duration: '8-12 weeks',
    },
    {
      stage: 'Portfolio & Certification',
      modules: ['Build Portfolio Projects', 'Prepare for Java Certification'],
      duration: '4-6 weeks',
    }
  ];

  // Alternatives
  const alternatives = [
    { title: 'Frontend Development', reason: 'Focus on UI/UX and web interfaces' },
    { title: 'Python Backend', reason: 'Simpler backend stack, rapid prototyping' },
    { title: 'Cloud/DevOps', reason: 'Infrastructure, automation, and deployment' },
    { title: 'Business Analysis', reason: 'Bridge business and technology' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Overall Recommendation */}
      <Card className={`border-2 ${
        recommendation.color === 'green' ? 'border-green-200 bg-green-50' :
        recommendation.color === 'orange' ? 'border-orange-200 bg-orange-50' :
        'border-red-200 bg-red-50'
      }`}>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className={`p-4 rounded-full ${
              recommendation.color === 'green' ? 'bg-green-100' :
              recommendation.color === 'orange' ? 'bg-orange-100' :
              'bg-red-100'
            }`}>
              <RecommendationIcon className={`w-12 h-12 ${
                recommendation.color === 'green' ? 'text-green-600' :
                recommendation.color === 'orange' ? 'text-orange-600' :
                'text-red-600'
              }`} />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
            {recommendation.title}
          </CardTitle>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {recommendation.description}
          </p>
          <Badge 
            variant="outline" 
            className={`mt-4 text-lg px-4 py-2 ${
              recommendation.color === 'green' ? 'bg-green-100 text-green-800 border-green-300' :
              recommendation.color === 'orange' ? 'bg-orange-100 text-orange-800 border-orange-300' :
              'bg-red-100 text-red-800 border-red-300'
            }`}
          >
            Recommendation: {recommendation.recommendation}
          </Badge>
        </CardHeader>
      </Card>

      {/* Score Breakdown */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-purple-600" />
              <span>Psychological Fit</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-2xl font-bold text-purple-600">
                    {psychometricScore}%
                  </span>
                  <Badge variant={
                    psychometricScore >= 75 ? 'default' :
                    psychometricScore >= 60 ? 'secondary' : 'destructive'
                  }>
                    {psychometricScore >= 75 ? 'Excellent' :
                     psychometricScore >= 60 ? 'Good' : 'Needs Work'}
                  </Badge>
                </div>
                <Progress value={psychometricScore} className="h-3" />
              </div>
              <div className="space-y-2">
                {psychometric.categories && Object.entries(psychometric.categories).map(([category, score]) => (
                  <div key={category} className="flex justify-between text-sm">
                    <span className="text-gray-600">{category.replace(/\(.*\)/, '').trim()}</span>
                    <span className="font-medium">{typeof score === 'number' ? score : 0}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Technical Readiness</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-2xl font-bold text-green-600">
                    {technicalScore}%
                  </span>
                  <Badge variant={
                    technicalScore >= 75 ? 'default' :
                    technicalScore >= 60 ? 'secondary' : 'destructive'
                  }>
                    {technicalScore >= 75 ? 'Strong' :
                     technicalScore >= 60 ? 'Moderate' : 'Developing'}
                  </Badge>
                </div>
                <Progress value={technicalScore} className="h-3" />
              </div>
              <div className="text-sm text-gray-600">
                Correct: {technical.correctAnswers || 0} / {technical.totalQuestions || 0}
              </div>
              <div className="space-y-2">
                {technical.categories && Object.entries(technical.categories).map(([category, score]) => (
                  <div key={category} className="flex justify-between text-sm">
                    <span className="text-gray-600">{category}</span>
                    <span className="font-medium">{typeof score === 'number' ? score : 0}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-orange-600" />
              <span>WISCAR Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-2xl font-bold text-orange-600">
                    {wiscarScore}%
                  </span>
                  <Badge variant="outline" className="bg-orange-50 text-orange-700">
                    {wiscar.quadrant || 'Assessment Needed'}
                  </Badge>
                </div>
                <Progress value={wiscarScore} className="h-3" />
              </div>
              <div className="space-y-2">
                {wiscar.dimensions && Object.entries(wiscar.dimensions).map(([dimension, score]) => (
                  <div key={dimension} className="flex justify-between text-sm">
                    <span className="text-gray-600">{dimension.split(' ')[0]}</span>
                    <span className="font-medium">{typeof score === 'number' ? score : 0}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Career Path Matching */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            <span>Career Path Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {careerPaths.map((career, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900">{career.title}</h4>
                  <Badge variant="outline" className={
                    career.skillMatch >= 75 ? 'bg-green-50 text-green-700' :
                    career.skillMatch >= 60 ? 'bg-orange-50 text-orange-700' :
                    'bg-red-50 text-red-700'
                  }>
                    {career.skillMatch}% Match
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{career.description}</p>
                <div className="mb-3">
                  <Progress value={career.skillMatch} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-gray-500 mb-1">Key Requirements:</div>
                  {career.requirements.map((req, reqIndex) => (
                    <Badge key={reqIndex} variant="secondary" className="mr-1 mb-1 text-xs">
                      {req}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps or Alternatives */}
      {recommendation.recommendation === 'YES' && (
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Book className="w-5 h-5 text-green-600" />
              <span>Your Learning Path</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {learningPath.map((stage, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-700 font-semibold text-sm">{index + 1}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900">{stage.stage}</h4>
                      <Badge variant="outline">{stage.duration}</Badge>
                    </div>
                    <div className="space-y-1">
                      {stage.modules.map((module, moduleIndex) => (
                        <div key={moduleIndex} className="text-sm text-gray-600">
                          • {module}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Recommended Next Steps:</h4>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>• Join the Java Developer Community</li>
                <li>• Build a GitHub portfolio</li>
                <li>• Complete a full stack project</li>
                <li>• Practice with hands-on labs and tutorials</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
      {recommendation.recommendation !== 'YES' && (
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Book className="w-5 h-5 text-blue-600" />
              <span>Alternative Career Paths</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Based on your assessment results, here are some alternative technology paths that might be a better fit:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {alternatives.map((alt, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{alt.title}</h4>
                  <p className="text-sm text-gray-600">{alt.reason}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => window.location.reload()}
        >
          Retake Assessment
        </Button>
        {recommendation.recommendation === 'YES' && (
          <Button variant="outline" className="border-green-500 text-green-700 hover:bg-green-50">
            View Learning Resources
          </Button>
        )}
      </div>
    </div>
  );
};

export default RecommendationEngine;
