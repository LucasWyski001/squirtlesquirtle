import Webcam from 'react-webcam';
import { useRef, useState } from 'react';
import snappic from '../assets/img/icons8-plus-64.svg';

export const Cam = () => {
  const webRef = useRef(null);
  const [img, setImage] = useState(null);

  const showImage = () => {
    const screenshot = webRef.current.getScreenshot();
    setImage(screenshot);
  };

  return (
    <div className="Cam">
    <Webcam
      audio={false}
      ref={webRef}
      screenshotFormat="image/jpeg"
      className="webcam"
    />
    <button onClick={showImage} className="capture-button">
      Capture
    </button>
    <br />
    {img && <img src={img} alt="Screenshot" className="screenshot" />}
  </div>
  );
};