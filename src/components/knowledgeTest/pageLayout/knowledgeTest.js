import React from 'react';
import CameraMonitoring from '../cameraMonitoring/cameraMonitoring';
import Options from '../options/options';
import Question from '../question/question';
import './knowledgeTest.css';

function KnowledgeTest() {
  return (
    <div className="testing-screen">
      <div className="left">
        <div className="question">
          <Question />
        </div>
      </div>
      <div className="right">
        <div className="camera-feed">
          <CameraMonitoring />
        </div>
        <div className="options">
          <Options />
        </div>
      </div>
    </div>
  );
}

export default KnowledgeTest;
