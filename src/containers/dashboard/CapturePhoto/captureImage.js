import React, { Component } from 'react';

export class CaptureImage extends Component {

    constructor(props) {
        super(props);
        this.state ={
            image: null
        }
    }
    /**
     * Processes available devices and identifies one by the label
     * @memberof CameraFeed
     * @instance
     */
    processDevices(devices) {
        devices.forEach(device => {
            console.log(device.label);
            this.setDevice(device);
        });
    }

    /**
     * Sets the active device and starts playing the feed
     * @memberof CameraFeed
     * @instance
     */
    async setDevice(device) {
        const { deviceId } = device;
        const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: { deviceId } });
        this.videoPlayer.srcObject = stream;
        this.videoPlayer.play();
    }

    /**
     * On mount, grab the users connected devices and process them
     * @memberof CaptureImage
     * @instance
     * @override
     */
    async componentDidMount() {
        const cameras = await navigator.mediaDevices.enumerateDevices();
        this.processDevices(cameras);
    }

    /**
     * Handles taking a still image from the video feed on the camera
     * @memberof CaptureImage
     * @instance
     */
    takePhoto = () => {
        // const { sendFile } = this.props;
        // const context = this.canvas.getContext('2d');
        // context.drawImage(this.videoPlayer, 0, 0, 680, 360);
        // console.log(this.videoPlayer)
        // // this.canvas.toBlob(sendFile);
        // var data = context.toDataURL();
        // console.log(data);
        // const video = this.videoPlayer.video;
        this.videoPlayer.setAttribute('crossOrigin', 'anonymous');
        // console.log(video);
        
        // const buf = captureFrame(video);
        const image = document.createElement('img');
        image.setAttribute('crossOrigin', 'anonymous');
        image.setAttribute('src', window.URL.createObjectURL(new window.Blob([this.videoPlayer])));
        
        
        console.log('captured frame src', image);
        this.setState({ image: image.src });
    };

    render() {
        return (
            <div className="c-camera-feed">
                <div className="c-camera-feed__viewer">
                    <video ref={ref => (this.videoPlayer = ref)} width="680" heigh="360" />
                </div>
                <button onClick={this.takePhoto}>Take photo!</button>
                <div className="c-camera-feed__stage">
                    {/* <canvas width="680" height="360" ref={ref => (this.canvas = ref)} /> */}
                    <img src={this.state.image} />
                </div>
            </div>
        );
    }
}
