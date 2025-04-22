import React, { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import IntroScreen from "./pages/intro/intro";
import AIInstructionScreen from "./pages/ai_instruction/ai_instruction";
import AIPracticeScreen from "./pages/ai_practice/ai_practice";
import AIExperimentScreen from "./pages/ai_experiment/ai_experiment";
import NoAIInstructionScreen from "./pages/no_ai_instruction/no_ai_instruction";
import NoAIPracticeScreen from "./pages/no_ai_practice/no_ai_practice";
import NoAIExperimentScreen from "./pages/no_ai_experiment/no_ai_experiment";
import SurveyScreen from "./pages/survey/survey";
import ThankYouScreen from "./pages/thankyou/thankyou";

const AppRoutes = () => {
  // Data State
  const [surveyData, setSurveyData] = useState({});
  const [aiPracticeResponse, setAiPracticeResponse] = useState(null);
  const [aiExperimentResponse, setAiExperimentResponse] = useState(null);
  const [noAiPracticeResponse, setNoAiPracticeResponse] = useState(null);
  const [noAiExperimentResponse, setNoAiExperimentResponse] = useState(null);

  // Simulated AI predictions hardcoded for now but should change this!
  const aiPracticePrediction = "Low risk of dysgraphia";
  const aiExperimentPrediction = "High risk of dysgraphia";

  // Save function triggered from Thank You screen
  const handleReturnHome = () => {
    const result = {
      timestamp: new Date().toISOString(),
      survey: surveyData,
      aiPractice: aiPracticeResponse,
      aiExperiment: aiExperimentResponse,
      noAiPractice: noAiPracticeResponse,
      noAiExperiment: noAiExperimentResponse,
    };

    const blob = new Blob([JSON.stringify(result, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "participant_data.json";
    link.click();

    window.location.assign("/#/");
  };

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<IntroScreen />} />
        <Route path="/intro" element={<IntroScreen />} />
        <Route path="/ai_instruction" element={<AIInstructionScreen />} />
        <Route
          path="/ai_practice"
          element={
            <AIPracticeScreen
              aiPrediction={aiPracticePrediction}
              onContinue={(userPrediction) => {
                setAiPracticeResponse({
                  userPrediction,
                  aiPrediction: aiPracticePrediction,
                });
                window.location.assign("/#/ai_experiment");
              }}
            />
          }
        />

        <Route
          path="/ai_experiment"
          element={
            <AIExperimentScreen
              aiPrediction={aiExperimentPrediction}
              onContinue={(userPrediction) => {
                setAiExperimentResponse({
                  userPrediction,
                  aiPrediction: aiExperimentPrediction,
                });
                window.location.assign("/#/no_ai_instruction");
              }}
            />
          }
        />

        <Route path="/no_ai_instruction" element={<NoAIInstructionScreen />} />

        <Route
          path="/no_ai_practice"
          element={
            <NoAIPracticeScreen
              onContinue={(userPrediction) => {
                setNoAiPracticeResponse({ userPrediction });
                window.location.assign("/#/no_ai_experiment");
              }}
            />
          }
        />

        <Route
          path="/no_ai_experiment"
          element={
            <NoAIExperimentScreen
              onContinue={(userPrediction) => {
                setNoAiExperimentResponse({ userPrediction });
                window.location.assign("/#/survey");
              }}
            />
          }
        />

        <Route
          path="/survey"
          element={
            <SurveyScreen
              onSubmit={(data) => {
                setSurveyData(data);
                window.location.assign("/#/thankyou");
              }}
            />
          }
        />

        <Route
          path="/thankyou"
          element={
            <ThankYouScreen
              survey={surveyData}
              aiPractice={aiPracticeResponse}
              aiExperiment={aiExperimentResponse}
              noAiPractice={noAiPracticeResponse}
              noAiExperiment={noAiExperimentResponse}
              onReturnHome={handleReturnHome}
            />
          }
        />
      </Routes>
    </HashRouter>
  );
};

export default AppRoutes;
