
import {Row,Col} from "antd"
import { Link} from "react-router-dom"

const Home=()=>{

    return(
        <Row>
            <Col offset={8} span={4}> 
                <Link to='/upload'>
                  <center>
                      upload
                  </center>
                </Link>
                
                </Col>
                <Col span={4}>
                  
                <Link to='/camera'>
                  <center>
                      camera
                  </center>
                </Link>
            </Col>
        </Row>
    )
}

export default Home