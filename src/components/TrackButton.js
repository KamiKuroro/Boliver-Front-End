import React from 'react';
import { Modal, Button, message } from 'antd';
import { TrackTimeline } from './TrackTimeline';
import { TOKEN_KEY, AUTH_HEADER, API_ROOT } from '../constants';

export class TrackButton extends React.Component {
    state = {
        visible: false,
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleClose = () => {
        this.setState({ visible: false });
    }

    handleConfirmOrder = () => {
        const order_id = this.props.currentOrder.order_id; //只取一个元素，就不加{}
        console.log(order_id);

        this.setState({ visible: false });
        const token = localStorage.getItem(TOKEN_KEY);


        // Fire API call - confirmorder
        fetch(`${API_ROOT}/confirmorder`, {
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
                throw new Error("Fail to confirm order.");
            })
            .then((data) => {
                this.setState({ visible: false });
                this.props.loadCurrentOrders();
                this.props.loadOrderHistory();
                message.success("Thank you for confirming your order!")
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
                    Track
            </Button>
                {this.props.currentOrder.orderStatus === '0' ?
                    <Modal
                        visible={visible}
                        title="Your Order Status:" //or put order Id
                        onCancel={this.handleClose}
                        footer={[
                            <Button key="back" onClick={this.handleClose}>Close</Button>,
                            <Button key="confirm" onClick={this.handleConfirmOrder}>Comfirm Order</Button>,
                        ]}
                    >
                        <TrackTimeline currentOrder={this.props.currentOrder} />


                    </Modal> :

                    <Modal
                        visible={visible}
                        title="Your Order Status:" //or put order Id
                        onCancel={this.handleClose}
                        footer={[
                            <Button key="back" onClick={this.handleClose}>Close</Button>,
                            // <Button key="confirm" onClick={this.handleConfirmOrder}>Comfirm Order</Button>,
                        ]}
                    >
                        <TrackTimeline currentOrder={this.props.currentOrder} />

                    </Modal>
                }
            </div>
        );
    }
}
