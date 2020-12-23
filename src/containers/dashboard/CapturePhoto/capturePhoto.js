import React from 'react';
import Camera, { IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import Webcam from "react-webcam";

export const CapturePhoto = (props) => { 
  const handleTakePhotoAnimationDone = (dataUri) => {
    props.handleCapture(dataUri)
  }
 
  return (
    <div>
      {
        (props.dataUrl)
          ? <img 
          src={props.dataUrl}
          style={{ height: 300 , width: 300}}
          />
          : 
          <div style={{ height: 300 , width: 300}}>
          <Camera 
          onTakePhotoAnimationDone = { (dataUri) => { handleTakePhotoAnimationDone(dataUri); } }
          imageType = {IMAGE_TYPES.JPG}
          sizeFactor={0.5}
          />
          </div>
      }
    </div>
  );
};


export class WebcamCapture extends React.Component {
  constructor(props) {
    super(props);
  }
    setRef = webcam => {
      this.webcam = webcam;
    };
  
    capture = () => {
      const imageSrc = this.webcam.getScreenshot();
      this.props.handleCapture(imageSrc)

    };
  
    render() {
      const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
      };
  
      return (
        <div>
            {
        (this.props.dataUrl)
          ? <img 
          src={this.props.dataUrl}
          style={{ height: 300 , width: 300}}
          />
          : 
          <div>
          <Webcam
            audio={false}
            height={350}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={350}
            videoConstraints={videoConstraints}
          />
          <button onClick={this.capture}>Capture photo</button>
            </div> }
            </div>
      );
    }
  }