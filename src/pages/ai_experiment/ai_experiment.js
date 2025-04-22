import React, { useState } from "react";
import "./ai_experiment.css";

function AIExperimentScreen({ aiPrediction, onContinue }) {
  const [userPrediction, setUserPrediction] = useState("");

  return (
    <div className="experiment-container">
      <div className="experiment-box">
        <h1 className="experiment-title">Experiment Trial</h1>

        <div className="experiment-section">
          <h2>Contextual Information</h2>
          <p>Handwriting sample for dysgraphia risk evaluation.</p>
        </div>

        <div className="experiment-image">
          <div className="image-placeholder">[Image Placeholder]</div>
        </div>

        <div className="experiment-section">
          <h2>AI Prediction</h2>
          <p className="ai-output">{aiPrediction}</p>
          <p className="ai-explanation">
            Explanation: [This is where the AI's reasoning will go.]
          </p>
        </div>

        <div className="experiment-section">
          <h2>Your Prediction</h2>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="prediction"
                value="low"
                checked={userPrediction === "low"}
                onChange={() => setUserPrediction("low")}
              />
              Low Risk
            </label>
            <label>
              <input
                type="radio"
                name="prediction"
                value="high"
                checked={userPrediction === "high"}
                onChange={() => setUserPrediction("high")}
              />
              High Risk
            </label>
          </div>
        </div>

        <button
          className="experiment-button"
          onClick={() => onContinue(userPrediction)}
          disabled={!userPrediction}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default AIExperimentScreen;
