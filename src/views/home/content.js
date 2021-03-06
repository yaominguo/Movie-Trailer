import React, {Component} from 'react'
import {
    Card,
    Row,
    Col,
    Badge,
    Icon,
    Spin,
    Modal
} from 'antd'
import {Link} from 'react-router-dom'
const site = 'http://video.iblack7.com/'
const Meta = Card.Meta
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

export default class Content extends Component{
    _renderContent=()=>{
        const {movies} = this.props
        return(
            <div style={{padding:'30px'}}>
                <Row>
                    {
                        movies.map((it, i)=>(
                            <Col 
                            key={i}
                            xl={{span: 6}}
                            lg={{span: 8}}
                            md={{span: 12}}
                            sm={{span: 24}}
                            style={{marginBottom: '8px'}}
                            >
                                <Card
                                bordered={false}
                                hoverable
                                style={{width:'100%'}}
                                actions={[
                                    <Badge>
                                        <Icon style={{marginRight:'2px'}} type='clock-circle' />
                                        {moment(it.meta.createdAt).fromNow(true)}前更新
                                    </Badge>,
                                    <Badge>
                                        <Icon style={{marginRight:'2px'}} type='star' />
                                        {it.rate}分
                                    </Badge>
                                ]}
                                cover = {<img src={site + it.posterKey + '?imageMongr2/thumbnail/x1680/crop/1080x1600'}/>}
                                >
                                    <Meta 
                                    style={{height: '202px', overflow: 'hidden'}}
                                    title={<Link to={`/detail/${it._id}`}>{it.title}</Link>}
                                    description={<Link to={`/detail/${it._id}`}>{it.summary}</Link>}
                                    />
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </div>
        )
    }
    render(){
        return(
            <div style={{padding: 10}}>
                {this._renderContent()}
            </div>
        )
    }
}