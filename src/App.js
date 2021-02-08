
import 'antd/dist/antd.css';
import {Layout } from "antd"
import { Route, Switch} from "react-router-dom"
import Home from './home/home';
import UploadImage from './upload/upload';
import WebcamCapture from './camera/Camera';
const { Header, Footer, Content } = Layout;

function App() {
  return (
    <div>
        
        <Layout>
          <Header style={{backgroundColor:"#0fe8d4"}}>
            <center>
              <h1 style={{color:"white"}}>SAM Project</h1>
            </center>
          </Header >
          <Content style={{backgroundColor:"white"}}>
            <div style={{backgroundColor:"white",height:100}}></div>
            <Switch>
                <Route exact path='/'>
                  <Home/>
                </Route>
                <Route exact path='/upload'>
                  <UploadImage/>
                </Route>
                <Route exact path='/camera'>
                  <WebcamCapture/>
                </Route>
            </Switch>
          </Content>
          <Footer>
            <center>
              <div>mask detection app</div>
              <div>developed by: Ahmed&Saad&Mohammed</div>
              <div>2021</div>
            </center>
          </Footer>
        </Layout>
        
    </div>
  );
}

export default App;
