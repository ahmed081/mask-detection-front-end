
import React, { useState } from "react";
import Webcam from "react-webcam";
import Axios from "axios";
import image from "./WIN_20201201_16_55_55_Pro.jpg";
import { Button, Col, Row } from "antd";


const videoConstraints = {
    width: 1200,
    height: 1270,
    facingMode: "user"
  };
function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
} 
  const WebcamCapture = () => {
    const webcamRef = React.useRef(null);
    const [image,setImage]= useState()
    
    const capture = React.useCallback(
      () => {
            const imageSrc = webcamRef.current.getScreenshot();
            console.log(imageSrc)
            
            
            //Usage example:
            var file = dataURLtoFile(imageSrc, 'a.png');
            const data = new FormData() 
            data.append('file', file)
            Axios.post("http://127.0.0.1:8000/predict/image",data,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    }
            }).then(resp=>{
                console.log(resp.data)
                setImage(resp.data)
            }).catch(err=>{
                console.log(err)
            })
      },
      [webcamRef]
    );
   
    return (
      <>
       <Row>
           <Col offset={2} span={7}>
                <Webcam
                audio={false}
                height={400}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={400}
                videoConstraints={videoConstraints}
                /><br/>
                <center>
                    <Button onClick={capture}>Capture photo</Button>
                </center>
           </Col>
           <Col span={8}>
            
              {
                image?<img src={`data:image/jpg;base64,${image}`} />:""
              }
              
            </Col>
       </Row>
      </>
    );
  };

export default WebcamCapture  