import React from 'react';
import './tiles.css';

function Tiles() {
  return (
    <section className='center-container'>
      <div className="tiles-container">
        <div className="tile-item1">
        <div className="tile-content">
          <img
            className="tile-image"
            src="./images/icon-1.png"
            alt="avatar1"
            
          />
          <button className='tile-button'>Global Content</button>
          </div>
        </div>
        <div className="tile-item1">
          <div className="tile-content">
          <img
            className="tile-image"
            src="./images/icon-2.png"
            alt="avatar2"
          />
           <button className='tile-button'>Customized Learning</button>
           </div>
        </div>
        <div className="tile-item1">
          <div className="tile-content">
          <img
            className="tile-image"
            src="./images/icon-3.png"
            alt="avatar3"
          />
           <button className='tile-button'>Personalized Tools</button>
           </div>
        </div>
        <div className="tile-item1">
          <div className="tile-content">
          <img
            className="tile-image"
            src="./images/icon-4.png"
            alt="avatar4"
          />
           <button className='tile-button'>Advance Technology</button>
           </div>
        </div>
        <div className="tile-item1">
          <div className="tile-content">
          <img
            className="tile-image"
            src="./images/icon-5.png"
            alt="avatar5"
          />
           <button className='tile-button'>Latest Context</button>
           </div>
        </div>
        <div className="tile-item1">
          <div className="tile-content">
          <img
            className="tile-image"
            src="./images/icon-6.png"
            alt="avatar6"
          />
           <button className='tile-button'>Schedule Learning</button>
           </div>
        </div>
      </div>
    </section>
  );
}

export default Tiles;
