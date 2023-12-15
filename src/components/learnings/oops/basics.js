import React, { useState } from 'react';
import { images } from './images';
import './basics.css';
import QuizCard from './quiz'; 
import ProgressBar from '../ui/progressBar';


function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  const goToNextImage = () => {
    if (showQuiz) {
      setShowQuiz(false);
    } else {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  const goToPreviousImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

 


  const toggleQuiz = () => {

if(currentIndex === images.length){
  showQuiz(true);
}
      goToNextImage(); 
    
  };

  const currentImage = images[currentIndex];

  return (
    <div className="fullscreen">
       <ProgressBar currentIndex={currentIndex} totalImages={images.length} />

     
      <div className="image-container">
        <img src={currentImage} alt={` ${currentIndex + 1}`} />
        {showQuiz && (
          <QuizCard
            question="What is the capital of France?"
            options={['Paris', 'London', 'Berlin']}
            onNextClick={goToNextImage}
          />
        )}
      </div>
  
      <div className="button-container">
        {!showQuiz && (
          <>
            <button className={(currentIndex === 0)?"hidebutton":"prev-button"} onClick={goToPreviousImage}>
              Previous
            </button>
            <button className={(currentIndex === images.length - 1)?"hidebutton":"next-button"} onClick={toggleQuiz}>
              Next
            </button>
          </>
        )}
      </div>
    </div>
  );
}


export default App;
