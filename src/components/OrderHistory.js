import React from 'react';
import { Spin, List, Avatar, Empty, Collapse } from 'antd';

export class OrderHistory extends React.Component {

    componentDidMount() {
        this.props.loadOrderHistory();
        // console.log(this.props.state);
    }

    getHistoryOrders = () => {
        const { error, historyOrders, isLoadingOrders } = this.props.state;
        const Panel = Collapse.Panel;

        if (error) {
            return error;
        } else if (isLoadingOrders) {
            return <Spin tip="Loading history order ... " />;
        } else if (historyOrders && historyOrders.length > 0) {
            return (
                <div className="order-history">
                    <List className="list"
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            onChange: (page) => {
                                console.log(page);
                            },
                            pageSize: 2,
                        }}
                        dataSource={historyOrders}
                        renderItem={item => (
                            <List.Item
                                key={item.order_id}
                            // extra={<img width={100} alt="delivered" src={require('../assets/images/delivered.jpeg')} />}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={require("../assets/images/imagebox.png")} alt="imagebox" />}
                                    title={<div className="order-id">Order ID:  {item.order_id}</div>}
                                    description={
                                        <div>
                                            <div className="form-entry">
                                                <div className='form-entry-left'>Ship From: </div>
                                                <div className='form-entry-middle'>Name: <br /> Address:  </div>
                                                <div className='form-entry-right'>{item.sender}<br />{item.origin}</div>
                                            </div>
                                            <div className="form-entry">
                                                <div className='form-entry-left'>Ship To:</div>
                                                <div className='form-entry-middle'>Name: <br /> Address:  </div>
                                                <div className='form-entry-right'>{item.receiver}<br />{item.destination}</div>
                                            </div>
                                        </div>
                                    }
                                />

                                <Collapse bordered={false}>
                                    <Panel header="Detail" key="1">
                                        <div className="form-entry">
                                            <div className='form-entry-left'>Create Time:</div>
                                            {/* <div className='form-entry-right'>{this.convertTime(item.create_time)}</div> */}
                                            <div className='form-entry-right'>{item.create_time}</div>
                                        </div>
                                        <div className="form-entry">
                                            <div className='form-entry-left'>Order Status:</div>
                                            {
                                                item.orderStatus === '3' ?
                                                    (<div className='form-entry-right'>Completed</div>) :
                                                    (<div className='form-entry-right'>Canceled</div>)
                                            }
                                        </div>
                                        <div className="form-entry">
                                            {item.orderStatus === '3' ?
                                                (<div className='form-entry-left'>Completed Time: </div>) :
                                                (<div className='form-entry-left'>Canceled Time: </div>)}
                                            <div className='form-entry-right'>{item.a_arrival}</div>
                                        </div>
                                        <div className="form-entry">
                                            <div className='form-entry-left'>Cost</div>
                                            <div className='form-entry-right'>${item.cost}</div>
                                        </div>
                                        <div className="form-entry">
                                            <div className='form-entry-left'>Robot Type: </div>
                                            <div className='form-entry-right'>{item.robotType}</div>
                                        </div>
                                    </Panel>
                                </Collapse>

                            </List.Item>
                        )} />

                </div>
            );
        } else {
            return <Empty description={"No Order"} />;
        }
    }

    render() {
        return (
            <div>
                {this.getHistoryOrders()}
            </div>
        )
    }
}