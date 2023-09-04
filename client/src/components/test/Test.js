import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import ContentSection from './ContentSection';

function App() {
  const [progress, setProgress] = useState(0);

  const handleStepClick = (stepNumber) => {
    const stepProgress = (stepNumber - 1) * 25;
    setProgress(stepProgress);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold text-center my-8 uppercase">Our Process</h1>
      <div className="process-wrapper">
        <ProgressBar progress={progress} />
        <ul id="progress-bar-container">
          <li className="step step01 active" onClick={() => handleStepClick(1)}>
            <div className="step-inner">HOME WORK</div>
          </li>
          <li className="step step02" onClick={() => handleStepClick(2)}>
            <div className="step-inner">RESPONSIVE PART</div>
          </li>
          <li className="step step03" onClick={() => handleStepClick(3)}>
            <div className="step-inner">Creative CREATIONS</div>
          </li>
          <li className="step step04" onClick={() => handleStepClick(4)}>
            <div className="step-inner">TESTIMONIALS PART</div>
          </li>
          <li className="step step05" onClick={() => handleStepClick(5)}>
            <div className="step-inner">OUR LOCATIONS</div>
          </li>
        </ul>

        <div id="line">
          <div id="line-progress" style={{ width: progress + '%' }}></div>
        </div>
      </div>

      <div id="progress-content-section">
        <ContentSection
          title="HOME SECTION"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
        />
        <ContentSection
          title="GALLERY SECTION"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
        />
        <ContentSection
          title="Creative CREATIONS"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
        />
        <ContentSection
          title="TESTIMONIALS NOW"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
        />
        <ContentSection
          title="OUR LOCATIONS"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
        />
      </div>
    </div>
  );
}

export default App;
