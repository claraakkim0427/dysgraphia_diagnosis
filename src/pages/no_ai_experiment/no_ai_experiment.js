import React, { useState } from "react";
import "./no_ai_experiment.css";

function NoAIExperimentScreen({ onContinue }) {
  const [userPrediction, setUserPrediction] = useState("");

  return (
    <div className="experiment-container">
      <div className="experiment-box">
        <h1 className="experiment-title">Experiment Trial (No AI)</h1>

        <div className="experiment-section">
          <h2>Contextual Information</h2>
          <p>This is the main experiment trial. Please review the handwriting and decide.</p>
        </div>

        <div className="experiment-image">
          <div className="image-placeholder">[Image Placeholder]</div>
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

export default NoAIExperimentScreen;
