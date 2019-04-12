import React from 'react';
import { Modal, Button, message } from 'antd';
import { TOKEN_KEY, AUTH_HEADER, API_ROOT } from '../constants';

/**pass currentorders data from track.js to here */
export class CancelButton extends React.Component {
    
    state = {
        visible: false,
        goRerender: false
    }
    
    showModal = () => {
        this.setState({
            visible: true,
        });
        console.log(this.props.currentOrder.order_id);
    }

    handleClose = () => {
        this.setState({ visible: false });
    }

    handleNo = () => {
        this.setState({ visible: false });
    }

    handleYes = () => {
        const order_id  = this.props.currentOrder.order_id; //只取一个元素，就不加{}
        console.log(order_id);

        this.setState({ visible: false });
        const token = localStorage.getItem(TOKEN_KEY);
    
        
        // Fire API call - cancelorder
        fetch(`${API_ROOT}/cancelorder`, {
            method: "POST",
            body: JSON.stringify({
                order_id: order_id
            }),
            headers: {
                Authorization: `${AUTH_HEADER} ${token}`
            }
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Fail to cancel order.");
        })
        .then((data) => {
            this.setState({ visible: false });
            this.props.loadCurrentOrders(); 
            this.props.loadOrderHistory(); 
            message.success("Your order has been canceled!")
            console.log(data);
        })
        .catch((e) => {
            this.setState({ visible: false });
            console.log(e);
        })
    }


    render() {
        const { visible } = this.state;
        return (
            <div>
            <Button type="primary" onClick={this.showModal}>
                Cancel
            </Button>

            {this.props.currentOrder.orderStatus === '2'  ? 
            
            <Modal 
                visible={visible}
                title={<div><b>Order Id: </b> {this.props.currentOrder.order_id}</div>}
                onCancel={this.handleClose}
                footer={[
                    <Button key="no" onClick={this.handleNo} >No</Button>,
                    <Button key="yes" onClick={this.handleYes} >Yes</Button>,
                ]}
            >
            <p className="textStyle">Do you really want to cancle your order?</p>
            </Modal> :  
            
            <Modal 
                visible={visible}
                title={<div><b>Order Id: </b> {this.props.currentOrder.order_id}</div>} 
                onCancel={this.handleClose}
                
                footer={[
                    <Button key="back" onClick={this.handleClose}>Close</Button>,
                ]}
            >
            <p className="textStyle"> Sorry, your order is on the way or has been delivered. Cancellation is not available now.</p>
            </Modal>} 
            
            </div>
        );
    }
}