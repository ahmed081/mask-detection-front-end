
import 'antd/dist/antd.css';
import {Row,Col,Upload, message} from "antd"
import { InboxOutlined } from '@ant-design/icons';
import { useState } from 'react';


const { Dragger } = Upload;
function UploadImage() {

  const [image,setImage]= useState()
  const props = {
    name: 'file',
    multiple: true,
    action: 'http://127.0.0.1:8000/predict/image',
    
    method:"post",
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        console.log(".......................................")
        //console.log(info.file.response)
        setImage(info.file.response)
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <div>
        
        <Row>
          <Col offset={4} span={8}>
              <Dragger style={{height:80}} {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                  band files
                </p>
              </Dragger>
          </Col>
          <Col span={8}>
            
              {
                image?<img src={`data:image/jpg;base64,${image}`} />:""
              }
              
          </Col>
          
        </Row>
    </div>
  );
}

export default UploadImage;
