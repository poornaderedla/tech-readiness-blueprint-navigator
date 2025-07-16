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
  const psychometricScore = Number(assessmentData.psychometricScore) || 0;
  const technicalScore = Number(assessmentData.technicalScore) || 0;
  const wiscarScores = assessmentData.wiscarScores || {};
  
  const wiscarValues = Object.values(wiscarScores);
  const wiscarAverage = wiscarValues.length > 0 
    ? wiscarValues.reduce((sum: number, score) => sum + Number(score), 0) / 6 
    : 0;
    
  const overallScore = Math.round((psychometricScore + technicalScore + wiscarAverage) / 3);

  // Determine recommendation
  const getRecommendation = () => {
    if (overallScore >= 75) {
      return {
        type: "YES",
        title: "✅ Start Full Stack Java Learning Now",
        color: "green",
        icon: CheckCircle,
        message: "You demonstrate strong alignment with Full Stack Java development. Your analytical thinking, technical readiness, and motivational profile make you an excellent candidate for this path."
      };
    } else if (overallScore >= 55) {
      return {
        type: "MAYBE",
        title: "⚠️ Take Foundational Prep Steps",
        color: "yellow",
        icon: AlertCircle,
        message: "You show potential for Full Stack Java development but would benefit from strengthening some foundational areas before diving in. With focused preparation, you can succeed in this field."
      };
    } else {
      return {
        type: "NO",
        title: "❌ Explore Alternative Pathways",
        color: "red",
        icon: XCircle,
        message: "Based on your current profile, Full Stack Java may not be the best fit at this time. Consider exploring alternative paths that better align with your strengths and interests."
      };
    }
  };

  const recommendation = getRecommendation();
  const RecommendationIcon = recommendation.icon;

  // Identify skill gaps
  const getSkillGaps = () => {
    const gaps = [];
    
    if (technicalScore < 70) {
      gaps.push("Core Java fundamentals");
      gaps.push("Object-Oriented Programming");
    }
    if (technicalScore < 60) {
      gaps.push("Spring Boot framework");
      gaps.push("REST API development");
      gaps.push("Database integration");
    }
    if (psychometricScore < 60) {
      gaps.push("Structured thinking approach");
      gaps.push("Tolerance for complexity");
    }
    if (wiscarScores.skill < 60) {
      gaps.push("Technical skill confidence");
    }
    if (wiscarScores.will < 60) {
      gaps.push("Learning persistence");
    }
    
    return gaps;
  };

  const skillGaps = getSkillGaps();

  // Get next steps
  const getNextSteps = () => {
    if (recommendation.type === "YES") {
      return [
        "Start with Java OOP Mastery course",
        "Learn Spring Boot fundamentals",
        "Build your first REST API",
        "Create a full-stack project portfolio"
      ];
    } else if (recommendation.type === "MAYBE") {
      return [
        "Complete Java fundamentals course",
        "Practice programming logic daily",
        "Build simple console applications",
        "Re-assess after 3 months of study"
      ];
    } else {
      return [
        "Explore alternative career paths",
        "Consider frontend-focused development",
        "Look into UI/UX design",
        "Try no-code/low-code platforms"
      ];
    }
  };

  const nextSteps = getNextSteps();

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          Your Personalized Recommendation
        </h2>
        <p className="text-gray-600 mb-4">
          Based on your comprehensive assessment results
        </p>
      </div>

      {/* Overall Score */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="text-center">Overall Readiness Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="text-6xl font-bold text-blue-600">{overallScore}%</div>
            <Progress value={overallScore} className="h-4" />
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold">Psychometric</div>
                <div className="text-purple-600">{psychometricScore}%</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">Technical</div>
                <div className="text-blue-600">{technicalScore}%</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">WISCAR</div>
                <div className="text-green-600">{Math.round(wiscarAverage)}%</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Recommendation */}
      <Card className={`border-2 border-${recommendation.color}-300 bg-${recommendation.color}-50`}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 text-${recommendation.color}-800`}>
            <RecommendationIcon className={`w-6 h-6 text-${recommendation.color}-600`} />
            {recommendation.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className={`text-${recommendation.color}-800 text-lg`}>
            {recommendation.message}
          </p>
        </CardContent>
      </Card>

      {/* Detailed Breakdown */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Strengths */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <CheckCircle className="w-5 h-5" />
              Your Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {psychometricScore >= 60 && (
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-700">Psychometric</Badge>
                  <span className="text-sm">Good psychological fit</span>
                </div>
              )}
              {technicalScore >= 60 && (
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">Technical</Badge>
                  <span className="text-sm">Solid technical foundation</span>
                </div>
              )}
              {wiscarScores.will >= 60 && (
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">Will</Badge>
                  <span className="text-sm">Strong motivation & persistence</span>
                </div>
              )}
              {wiscarScores.interest >= 60 && (
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-pink-100 text-pink-700">Interest</Badge>
                  <span className="text-sm">Genuine curiosity for Java</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Areas for Improvement */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <Target className="w-5 h-5" />
              Areas to Strengthen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {skillGaps.length > 0 ? (
                skillGaps.map((gap, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">{gap}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-600">No significant gaps identified!</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="w-5 h-5 text-blue-600" />
            Recommended Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {nextSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <span className="text-gray-800">{step}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* WISCAR Radar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>WISCAR Dimension Scores</CardTitle>
          <CardDescription>Your readiness across six key dimensions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(wiscarScores).map(([dimension, score]) => (
              <div key={dimension} className="text-center">
                <div className="text-2xl font-bold text-blue-600">{Number(score)}%</div>
                <div className="text-sm text-gray-600 capitalize">{dimension}</div>
                <Progress value={Number(score)} className="h-2 mt-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrev}>
          ← Back
        </Button>
        <Button onClick={onNext} className="px-8">
          View Career Guidance →
        </Button>
      </div>
    </div>
  );
};

export default RecommendationEngine;
