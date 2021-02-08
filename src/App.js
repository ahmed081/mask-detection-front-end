
import 'antd/dist/antd.css';
import {Layout, Menu } from "antd"
import { Link, Route, Switch} from "react-router-dom"
import Home from './home/home';
import UploadImage from './upload/upload';
import WebcamCapture from './camera/Camera';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import CovidState from './covid-states/covidStates';

const { Header, Sider,Footer, Content } = Layout;
const { SubMenu } = Menu;

function App() {
  return (
    <div>
        
        <Layout>
    <Header style={{backgroundColor:"#0fe8d4"}} className="header">
            <center>
              <h1 style={{color:"white"}}>SAM Project</h1>
            </center>
    </Header>
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="1"><Link to ="/covid-states">Covid state</Link></Menu.Item>
         
          
          <SubMenu key="sub3" icon={<NotificationOutlined />} title="mask detection">
            <Menu.Item key="9"><Link to ="/upload">upload</Link></Menu.Item>
            <Menu.Item key="10"><Link to="/camera">Camera</Link></Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px', backgroundColor:"white" }}>
        
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            backgroundColor:"white"
          }}
        >
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
                <Route exact path='/covid-states'>
                  <CovidState/>
                </Route>
            </Switch>
        </Content>
      </Layout>
    </Layout>
  </Layout>
        
    </div>
  );
}
<Layout>
          <Header >
           
          </Header >
          <Content style={{backgroundColor:"white"}}>
            <div style={{backgroundColor:"white",height:100}}></div>
            
          </Content>
         
        </Layout>
export default App;
