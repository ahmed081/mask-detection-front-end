import { AutoComplete, Button, Col,Card, Input, Row, Space, Descriptions, Spin } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import Axios from "axios"
const { Search } = Input;
const api = "https://services3.arcgis.com/hjUMsSJ87zgoicvl/arcgis/rest/services/Covid_19/FeatureServer/6/query?where=1%3D1&outFields=NOM,cas_confir&outSR=4326&f=json"
const CovidState = ()=>{
    const [options, setOptions] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [value,setValue]= useState("")
    const onSelect = (data) => {
        setLoading(true)
        setValue(value)
        Axios.get(api).then(res=>{
            setData(
                res.data.features.filter(feature=>{
                    if(feature.attributes.NOM.trim()!=="" && feature.attributes.NOM== data)
                        return feature
                }).map(feature=>{
                    return {
                        city:feature.attributes.NOM,
                        cases : feature.attributes.cas_confir
                    }
                })
                
            )
            setLoading(false)
        }).catch(err=>{
            console.log(err)
        })
    };
    
    useEffect(()=>{
        Axios.get(api).then(res=>{
            console.log(res.data)
            setData(
                res.data.features.filter(feature=>{
                    if(feature.attributes.NOM.trim()!=="")
                        return feature
                }).map(feature=>{
                    return {
                        city:feature.attributes.NOM,
                        cases : feature.attributes.cas_confir
                    }
                })
            )
            setLoading(false)
            
        }).catch(err=>{
            console.log(err)
        })
    },[])
    const onSearch = (searchText) => {
        if(!searchText) setOptions([])
        else 
        {
            Axios.get(api).then(res=>{
                setOptions(
                    res.data.features.filter(feature=>{
                        if(feature.attributes.NOM.trim()!=="" && feature.attributes.NOM.includes(searchText))
                            return feature
                    }).map(feature=>{
                        return {value : feature.attributes.NOM}
                    })
                )
            }).catch(err=>{
                console.log(err)
            })
            setValue(searchText)
        }
            
        
      };
    return (
        <div>
            <div>
                <h1>
                    
                </h1>
            </div>
             <AutoComplete
                options={options}
                style={{ width: 200 }}
                onSelect={onSelect}
                onSearch={onSearch}
                placeholder="search for city"
            />
            <Button onClick={()=>{onSelect(value)}}>Searsh</Button>
            {
                loading?<center><Spin size="large" /></center>:
                <Row>
                    <Descriptions column={1} title="Covid states in Morocco" bordered>
                        {
                            data.map(feature =>{
                                return(
                                    <Descriptions.Item label={`${feature.city}`}>{`${feature.cases}`}</Descriptions.Item>
                                )
                            })
                        }
                    </Descriptions>

                </Row>
            }
            
        </div>
    )
}


export default CovidState;