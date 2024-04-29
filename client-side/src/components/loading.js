import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import backgroundVideo from '../assets/img/video.mp4';

export const WaterBottle = () => {
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const water = document.querySelector(".water");
    const fillLevel = document.querySelector(".fill-level");

    water.style.animation = "fillWater 5s forwards";

    const interval = setInterval(() => {
      setCurrentPercentage((prevPercentage) => {
        const newPercentage = prevPercentage + 1;
        if (newPercentage === 100) {
          clearInterval(interval);
          setShowOptions(true); // Show options when the animation completes
        }
        return newPercentage;
      });
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="containerbottle">
      <video autoPlay loop muted className="background-video">
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      <div className="water-bottle">
        <div className="bottle-body">
          <div className="water">
            <span className="fill-level">{currentPercentage}%</span>
          </div>
          <div className="bottle-neck"></div>
          <div className="bottle-cap"></div>
        </div>
      </div>
      {showOptions && (
        <div className="options-box">
          <p>Choose an option:</p>
          <button className="option-button">
            <Link to="/home" style={{ fontSize: '20px', color: 'white' }}>
              Guest Login
            </Link>
          </button>
          <button className="option-button">
            <Link to="/login" style={{ fontSize: '20px', color: 'white' }}>
              Login
            </Link>
          </button>
          <button className="option-button">
            <Link to="/signup" style={{ fontSize: '20px', color: 'white' }}>
              Signup
            </Link>
          </button>
        </div>
      )}
    </div>
  );
};