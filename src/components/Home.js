import React from 'react';
import { Tabs, Button } from 'antd';
import { Track } from './Track.js';
import { CreateSearchForm } from './CreateSearchForm.js';
import { OrderHistory } from './OrderHistory';
import { TOKEN_KEY, AUTH_HEADER, API_ROOT } from '../constants';

export class Home extends React.Component {
    state = {
        error: '',
        isLoadingCurrentOrders: true,
        isLoadingHistoryOrders: true,
        currentOrders: [],
        historyOrders: [],
    }

    getFormRef = (formInstance) => {
        this.form = formInstance;
    }

    loadOrderHistory = () => {
        const token = localStorage.getItem(TOKEN_KEY);
        // Fire API call
        fetch(`${API_ROOT}/orderhistory`, {
            method: "GET",
            headers: {
                Authorization: `${AUTH_HEADER} ${token}`
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Fail to load posts.");
            })
            .then((data) => {
                this.setState({
                    isLoadingHistoryOrders: false,
                    historyOrders: data ? data : [],
                })
                // console.log(this.state.historyOrders);
            })
            .catch((e) => {
                this.setState({
                    isLoadingHistoryOrders: false,
                    error: e.message,
                })
            })
        console.log("History Order");
    }

    loadCurrentOrders = () => {

        const token = localStorage.getItem(TOKEN_KEY);
        // Fire API call
        fetch(`${API_ROOT}/currentorder`, {
            method: "GET",
            headers: {
                Authorization: `${AUTH_HEADER} ${token}`
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Fail to load current orders.");
            })
            .then((data) => {
                this.setState({
                    isLoadingCurrentOrders: false,
                    currentOrders: data ? data : [],
                })
                // console.log(this.state.currentOrders);
            })
            .catch((e) => {
                this.setState({
                    isLoadingCurrentOrders: false,
                    error: e.message,
                })
                console.log(e);
            })

        console.log("Current Order");

    }

    render() {
        const TabPane = Tabs.TabPane;

        return (
            <Tabs className="main-tabs" defaultActiveKey="1">
                <TabPane className="wrapper" tab="Home" key="1">
                    <div className="box1">
                        <img src={require('../assets/images/aboutus.jpg')} alt="info1" />
                        <div className="blackblock">
                            <h2 className="title">About Us</h2>
                        </div>
                        <p className="text">
                            Boliver® is working on ground-robot and drone deliveries, a
                            “future delivery system - designed to safely
                             get packages to customers in 30 minutes.
                             Our mission is to improve lifestyles by making delivery instant
                            for everyone. We're the first robot delivery service in the world
                            and we’re pioneering an industry, not just a company.
                        </p>

                        <Button className="readmorebutton" href="http://www.fehrandpeers.com/drone-delivery/" target="_blank">Read More</Button>
                    </div>
                    <div className="box2">
                        <img src={require('../assets/images/groundBot.png')} alt="info2" />
                        <div className="blackblock">
                            <h2 className="title">GroundRobot Delivers</h2>
                        </div>
                        <p className="text">
                            Scout walks at a human pace and appears
                            large enough to accommodate small and
                            medium-sized parcels. No word yet what's
                            under the hood, but the standard sensor
                            package in autonomous mobile robots
                            includes GPS, several cameras or stereo
                            cameras, inertial measuring devices, and
                            occasionally LiDAR.
                        </p>
                        <Button className="readmorebutton" href="https://www.fastcompany.com/90291820/8-robots-racing-to-win-the-delivery-wars" target="_blank">Read More</Button>
                    </div>
                    <div className="box3">
                        <img src={require('../assets/images/drone.jpg')} alt="info2" />
                        <div className="blackblock">
                            <h2 className="title">Drone Delivers</h2>
                        </div>
                        <p className="text">
                            Boliver’s vision for the drones is a
                            fleet of vehicles equipped with self-operating technology,
                            similar to self-driving cars, where the drones can run
                            independently of a human “pilot.” Automated collision
                            avoidance technology will allow the drones to avoid
                            crashing into objects or animals while in flight.
                        </p>
                        <Button className="readmorebutton" href="https://www.araglegal.com/individuals/learning-center/topics/home-and-property/six-ways-drone-delivery-could-be-a-game-changer" target="_blank">Read More</Button>
                    </div>
                </TabPane>

                <TabPane tab="Ship" key="2">
                    <CreateSearchForm
                        ref={this.getFormRef}
                        loadCurrentOrders={this.loadCurrentOrders} />
                </TabPane>

                <TabPane tab="Track" key="3">
                    <Track
                        loadCurrentOrders={this.loadCurrentOrders}
                        loadOrderHistory={this.loadOrderHistory}
                        state={this.state} />
                </TabPane>

                <TabPane tab="History" key="4">
                    <OrderHistory
                        loadOrderHistory={this.loadOrderHistory}
                        state={this.state} />
                </TabPane>
            </Tabs>


        )
    }
}