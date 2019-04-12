import React from 'react';
import { List, Avatar, Spin } from 'antd';
import { TrackButton } from './TrackButton';
import { CancelButton } from './CancelButton';

export class Track extends React.Component {

    componentDidMount() {
        this.props.loadCurrentOrders();
        console.log(this.props.state);
    }

    getCurrentOrders = () => {
        const { error, currentOrders, isLoadingCurrentOrders } = this.props.state;

        if (error) {
            return error;
        } else if (isLoadingCurrentOrders) {
            return <Spin tip="Loading current orders ... " />;
        } else if (currentOrders && currentOrders.length > 0) {
            return (
                <div className="track" >
                    <List className="list"
                        itemLayout="horizontal"
                        pagination={{
                            onChange: (page) => {
                                console.log(page);
                            },
                            pageSize: 3,
                        }}
                        dataSource={currentOrders}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={require("../assets/images/imagebox.png")} alt="imagebox" />}
                                    title={<div className="text1">Order ID:  {item.order_id}</div>}
                                    description={
                                        <div>
                                            {/* {item.orderStatus == 0 ? "Delivered" : "On the way" } */}
                                            <b>Ship from: </b>{item.sender} <br />
                                            <b className="spacer1"></b>{item.origin} <br />
                                            <b>Ship to: </b> &nbsp; &nbsp; &nbsp;{item.receiver} <br />
                                            <b className="spacer2"></b>{item.destination} <br />
                                            <b>Created at: </b>{item.create_time} <br />
                                        </div>
                                    }
                                />
                                <TrackButton currentOrder={item} loadCurrentOrders={this.props.loadCurrentOrders} loadOrderHistory={this.props.loadOrderHistory} />
                                <CancelButton currentOrder={item} loadCurrentOrders={this.props.loadCurrentOrders} loadOrderHistory={this.props.loadOrderHistory} />
                            </List.Item>
                        )}
                    />
                </div>
            )
        } else {
            return "No History Orders.";
        }
    }

    render() {
        return (
            <div>
                <div>{this.getCurrentOrders()}</div>
                <div className="TrackFooter"></div>
            </div>
        )
    }
}





/** 乔先森
import { API_ROOT } from "../constants";
import { getData, postData } from "./Fetch.js";

export function fetchCurrentOrderList() {
    let url = API_ROOT + "/currentOrder";
    return getData(url);
}
export function fetchTrackOrder(orderId) {
    let url = API_ROOT + "/trackorder";
    let data = { order_id: orderId }
    return postData(url, data).then(res => console.log(res));

}
*/


