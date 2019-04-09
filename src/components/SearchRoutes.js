import React from 'react';
import { Form, Input, Button, message, Avatar, Spin, Switch } from 'antd';
import { API_ROOT, TOKEN_KEY, AUTH_HEADER} from '../constants';
import { Footer } from './Footer';
import { SubmitOrder } from './SubmitOrder';
import { Bilibili } from './Bilibili';
//import { DeliveryOptions } from './DeliveryOptions';

/** useful little tools
   <Spin spinning={this.state.spin} delay={500}></Spin>
*/

class SearchForm extends React.Component {
    constructor() {
      super();
      this.state = {
        formItemLayout: { labelCol: { span: 4 }, wrapperCol: { span: 14 } },
        buttonItemLayout: { wrapperCol: { span: 14, offset: 4 } },
        loading: false,
        visible: false,
        spin: false,
        confirmLoading: false,
        searchRes: null,
        bilibiliStatus: false,
        checked: false,
        droneStatus: false,
        groundStatus: false,
      };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem(TOKEN_KEY);

        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Inputs for searchRoutes: ', values);
            this.setSpin();
            this.setBilibili();
            //Fire API Call
            fetch(`${API_ROOT}/searchroute`, {
              method: 'POST',
              headers:{
                Authorization: `${AUTH_HEADER} ${token}`
              },
              body: JSON.stringify({
                  origin: values.origin,
                  destination: values.destination,
              }),
            })
              .then((response) => {
                  if (response.ok) {
                      return response.json();
                  }
                  throw new Error(response.statusText)
              })
              .then ((data) => {
                  this.setState({
                    loading: false,
                    spin: false,
                    searchRes: data ? data : null,
                  })
                  message.success("Both bots are available!", 5);
                  console.log(this.state.searchRes);
                  if(data.GroundBot.avail_status === "no" && data.Drone.avail_status === "no"){
                    //message.error("unfortunately, all bots are busy at the moment", 5)
                  }else if(data.GroundBot.avail_status === "no"){
                    //message.warning("unfortunately, all ground bots are busy at the moment", 5)
                  }else if(data.Drone.avail_status === "no"){
                    //message.warning("unfortunately, all droens are busy at the moment", 5)
                    this.setState({
                      groundStatus: true,
                    })
                  }else{
                    message.success("Both bots are available!", 5)
                    this.setState({
                      groundStatus: true,
                      droneStatus: true,
                    })
                    console.log(this.state.searchRes);
                  }
              })
              .catch((e) => {
                  this.setState({
                    loading: true,
                    spin: false,
                  })
                  message.error("fail:(")
                  console.log(e)
              })
          }
        });
    }

    setSpin = () => {
      this.setState({ spin: true });
    }

    offSpin = () => {
      this.setState({ spin: false });
    }

    setBilibili = () => {
      this.setState({ bilibiliStatus: true });
    }

    deliveryOptions = () => {
      const { searchRes, loading, droneStatus, groundStatus, } = this.state;
      console.log("I am in deliveryOptions");
      console.log({searchRes});
      console.log(searchRes == null)

      if(searchRes == null){
        return(
          <div>
            <Bilibili loading = {this.state.bilibiliStatus} />
          </div>
        )
      }else {
        return(
          <div className="divTable"><div className="divTableBody"><div className="divTableRow">
            <div className="divTableCell">
              <div className="cardLeft">
              <Spin spinning={this.state.spin} delay={200}>
                <SubmitOrder 
                  botResult = {searchRes.GroundBot} 
                  robotType = {"ground"} 
                  address = {searchRes.DeliveryAddress} 
                  cLoading = {loading}
                  botAvatar = {<Avatar src={require("../assets/images/groundBot.png")} />}
                  chooseButton = {"Choose GroundBot"} 
                  status = {groundStatus}
                />
              </Spin>
              </div>      
            </div>
            <div className="divTableCell">
              <div className="cardRight">
              <Spin spinning={this.state.spin} delay={200}>
                <SubmitOrder 
                  botResult = {searchRes.Drone} 
                  robotType = {"drone"} 
                  address = {searchRes.DeliveryAddress}
                  botAvatar = {<Avatar src={require("../assets/images/drone.jpg")} />}
                  chooseButton = {"Choose Drone"}
                  status = {droneStatus}
                />
              </Spin>
              </div>
            </div>
          </div></div></div>
        )
       }
    }

    handleClear = () => {
      this.props.form.resetFields();
      this.setState({
        searchRes: null,
        bilibiliStatus: false,
      })
    }    

    Switching = (checked) => {
      if(checked){
        this.autoFill();
      }else{
        this.props.form.resetFields();
      }
    }

    autoFill = () => {
      this.props.form.setFieldsValue({
        origin: `3369 Mission St, San Francisco, CA 94110`,
        destination: `448 Cortland Ave, San Francisco, CA 94110`,
      });
    }

    render() {
      const { formItemLayout, buttonItemLayout } = this.state;
      const { getFieldDecorator } = this.props.form;

      return (
        <div className="PlaceOrderUI">
          <div className="SearchFormWrapper">
            <div className="SearchForm">
              <Form layout={"horizontal"} onSubmit={this.handleSubmit} onClick={this.offSpin} className="search-form">
                <Form.Item label="Pick-up Addr" {...formItemLayout} >
                  {getFieldDecorator('origin', {
                    rules: [{ required: true, message: 'pick-up address cannot be empty' }],
                  })(
                    <Input type="text" placeholder="Street, City, State Zip" />
                  )}
                </Form.Item>
                <Form.Item label="Destination" {...formItemLayout} >
                  {getFieldDecorator('destination', {
                    rules: [{ required: true, message: 'destination cannot be empty' }],
                  })(
                    <Input type="text" placeholder="Street, City, State Zip" />
                  )}
                </Form.Item>
                <Form.Item {...buttonItemLayout}>
                  <div className="searchBtn">
                    <Switch className="autoFillSwitch" onChange={this.Switching} />
                    <Button icon="search" type="primary" htmlType="submit" className="search-form-button-Search" >Search</Button>
                    <Button className="search-form-button-Clear" onClick={this.handleClear}>Clear</Button>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </div>
          {this.deliveryOptions()}
          {/* <DeliveryOptions res={this.state.searchRes} /> */}
          <Footer className="footer"/>
        </div>
      );
    }
  }

  export const CreateSearchForm = Form.create()(SearchForm);