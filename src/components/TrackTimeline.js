import React from 'react';
import { Tooltip, Progress } from 'antd';

export class TrackTimeline extends React.Component {
    state = {
        time: ''
    }

    componentDidMount() {
        this.getLocalTime();
        console.log(this.state.time);
    }

    getLocalTime = () => {
        const time = new Date().toLocaleString();
        this.setState({
            time: time
        })
    }

    getTimeline = () => {
        const { orderStatus, e_arrival } = this.props.currentOrder;
        console.log(orderStatus);

        if (orderStatus === '0') {
            return (
                <div>
                    <Tooltip title="Delivered">
                        <p className="textStyle">
                            Your package has been delivered at {this.state.time}<br />
                            Please hit "Confirm Order" button to complete your order.
                        </p>
                        <Progress
                            percent={100}
                            status="success"
                        />
                    </Tooltip>
                </div>
            )
        } else if (orderStatus === '1') {
            return (
                <div>
                    <Tooltip title="In transit">
                        <p className="textStyle">
                            Your package is on the way.<br />
                            It is estimated to be delivered at {e_arrival}.
                        </p>
                        <Progress
                            percent={66}
                            status="active"
                        />

                    </Tooltip>
                </div>
            )
        } else if (orderStatus === '2') {
            return (
                <div>
                    <Tooltip title="Retriving package">
                        <p className="textStyle">
                            Robot is on its way to pick up your package. <br />
                            Your package is estimated to be delivered at {e_arrival}.
                        </p>

                        <Progress
                            percent={33}
                            status="active"
                        />
                    </Tooltip>

                </div>

            )
        } else {
            return (<p>Your order has been canceled or successfully delivered. Please check your order in orderHistory.</p>)
        }
    }

    render() {
        return (
            <div>{this.getTimeline()}</div>
        )
    }
}