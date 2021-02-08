
import React, { useState } from "react";
import Webcam from "react-webcam";
import Axios from "axios";
import image from "./WIN_20201201_16_55_55_Pro.jpg";
import { Button, Col, Image, Row } from "antd";


const videoConstraints = {
    width: 400,
    height: 500,
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
    const [image,setImage]= useState([])
    const [loading,setLoading]= useState(true)
    
    const capture = React.useCallback(
      () => {
            const imageSrc = webcamRef.current.getScreenshot();//base64
            console.log(imageSrc)
            
            
            //Usage example:
            let file = dataURLtoFile(imageSrc, 'a.png');
            const data = new FormData() 
            data.append('file', file)
            Axios.post("http://127.0.0.1:8000/predict/image",data,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    }
            }).then(resp=>{//200
                
                setImage([resp.data,...image])
                //setImage([...image,resp.data])
            }).catch(err=>{
                console.log(err)
            })
      },
      [webcamRef]
    );
   
    return (
      <>
       <Row>
           <Col offset={1} span={9}>
                <div>
                    <center>
                        <h1>
                            Take a picture
                        </h1>
                    </center>
                </div>
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
           <Col offset={1} span={13}>
                <div>
                    <center>
                        <h1>
                            Results
                        </h1>
                    </center>
                </div>
                <Row>
                    {
                        image.length >0 ?image.map(img =>{
                            return (
                                <Col>
                                    <Image
                                        width={200}
                                        src={`data:image/jpg;base64,${img}`}
                                        />
                                </Col>
                            )
                        }):""
                    }
                </Row>
              
            </Col>
       </Row>
      </>
    );
  };

export default WebcamCapture  