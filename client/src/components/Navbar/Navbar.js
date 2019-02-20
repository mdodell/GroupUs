import React, { Component } from 'react';

import {Row, Col, Icon} from 'antd';

class Navbar extends Component {
    render(){
        return (
            <Row
                type="flex"
                style={{position: 'absolute', width: '100vw', backgroundColor: '#0198ED', height: '50px', boxShadow: '0 2px 8px #f0f1f2'}}
                justify="space-between"
                align="middle"
            >

                <Col xs={{span: 20}} md={{span: 8}} lg={{span: 6}} >
                    <Row
                        type="flex"
                        align="middle"
                        justify="space-between"
                    >
                        <Col span={5}>
                            <Icon type="code" style={{margin: '0', fontSize: '3em', color: 'white'}}/>
                        </Col>
                        <Col span={19}>
                            <h1 style={{margin: '0', color: 'white'}}>GroupUs</h1>
                        </Col>
                    </Row>
                </Col>


        </Row>
        );
    }
}

export default Navbar;