import React, { Component } from 'react';
import {  View , StyleSheet } from 'react-native';
import { NavigationActions,StackNavigator } from 'react-navigation'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {computeSize} from '../../utils/DeviceRatio'

import _ from 'lodash'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Toast ,WingBlank,InputItem,Text,Button,WhiteSpace} from 'antd-mobile';
import { graphql, compose } from 'react-apollo'

import { Auth } from 'aws-amplify';


import Confirm from './Confirm'

class Signup extends Component {

  constructor(props){
    super(props)

    this.state = {
      username:'',
      password:'',
      email:'',
      phone:''
    }


  }

  static navigationOptions = {
    title: 'Signup',
    tabBarLabel: 'Signup',
    tabBarIcon:(icn)=>{
      return(
        <MaterialCommunityIcons name="account-plus" size={computeSize(60)} color={icn.tintColor}    />
      )
    }
  }


  onHandleChange = (name) =>{
    return (value)=>{
        this.setState({
          [name]:value
        })

    }
  }


  onHandleSubmit = () =>{

    let {username,password,email,phone} = this.state

    if (!_.isEmpty(username) && !_.isEmpty(password) && !_.isEmpty(email) && !_.isEmpty(phone)) {

      let payload = {username,password,email,phone}
      this.onSignUp(payload)

    }else {
      Toast.fail('Please input all form!', 1);
    }

  }




  onSignUp = (data) =>{
    Auth.signUp({
        username:data.username,
        password:data.password,
        attributes: {
            email:data.email,          // optional
            phone_number:data.phone,   // optional - E.164 number convention
            // other custom attributes
        },
        validationData: []  //optional
    })
    .then(data =>{
        this.onConfirmComponent();
        // console.log(data,'unsay return niya');
    })
    .catch(err => {
      console.log(err,'unsa cath niya');
      if (_.includes(err.code,'UsernameExistsException')) {
        this.onConfirmComponent()
      }
      Toast.offline(err.message, 1);
    });
  }


  onConfirmCode = () =>{

    Auth.confirmSignUp(this.state.username, this.state.code)
    .then(data => {
      Toast.success('Confirm Successful', 1);
      this.onClear();
    })
    .catch(err => {
      console.log(err,'unsay error niya');
      this.onConfirmComponent()
      Toast.fail("Error Confirm", 1);
    });

  }


  onConfirmComponent = () =>{
    this.setState({
      confirmCom:!this.state.confirmCom
    })
  }

  onClear = () =>{
    this.setState({
      username:'',
      password:'',
      email:'',
      phone:'',
      code:'',
      confirmCom:false
    },()=>{
      this.props.navigation.navigate('Login')
    })
  }




  render() {
    return (
      <View style={styles.container}>
        <WhiteSpace/>
        <WhiteSpace/>
        <KeyboardAwareScrollView>

          {
            !this.state.confirmCom ? (
              <View style={{flex:1}}>

                <WingBlank>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Username</Text>
                  </WingBlank>
                  <InputItem
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    returnKeyType={'next'}
                    placeholder={'Enter username'}
                    value={this.state.username}
                    onChange={this.onHandleChange('username')}
                  />


                  <WingBlank>
                      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Password</Text>
                    </WingBlank>
                    <InputItem
                      type={"password"}
                      autoCorrect={false}
                      autoCapitalize={'none'}
                      returnKeyType={'next'}
                      placeholder={'Enter password'}
                      value={this.state.password}
                      onChange={this.onHandleChange('password')}
                    />


                    <WingBlank>
                      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Email</Text>
                    </WingBlank>
                    <InputItem
                      autoCorrect={false}
                      autoCapitalize={'none'}
                      returnKeyType={'next'}
                      placeholder={'Enter Email'}
                      value={this.state.email}
                      onChange={this.onHandleChange('email')}
                    />

                    <WingBlank>
                      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Phone</Text>
                    </WingBlank>
                    <InputItem
                      type={'digit'}
                      autoCorrect={false}
                      autoCapitalize={'none'}
                      returnKeyType={'next'}
                      placeholder={'Enter Phone Number'}
                      value={this.state.phone}
                      onChange={this.onHandleChange('phone')}
                    />

                    <WingBlank>
                      <Button type="primary" inline size="large" onClick={this.onHandleSubmit}>Sign Up</Button>
                    </WingBlank>

                    <WhiteSpace/>

                    <WingBlank>
                      <Button type="warning" inline size="large" onClick={this.onConfirmComponent}>Confirm Code</Button>
                    </WingBlank>

              </View>
            ): null
          }





              {
                this.state.confirmCom ? (
                  <Confirm onHide={this.onConfirmComponent} onHandleSubmit={this.onHandleSubmit} onHandleChange={this.onHandleChange} onConfirmCode={this.onConfirmCode} {...this.state} />
                ): null
              }


        </KeyboardAwareScrollView>
      </View>
    );
  }
}


export default Signup


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
