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

class Confirm extends Component {

  constructor(props){
    super(props)

    this.state = {
      username:'',
      code:''
    }


  }




  render() {
    return (
      <View style={{flex:1}}>


          <WingBlank>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Username</Text>
            </WingBlank>
            <InputItem
              autoCorrect={false}
              autoCapitalize={'none'}
              returnKeyType={'next'}
              placeholder={'Enter username'}
              value={this.props.username}
              onChange={this.props.onHandleChange('username')}
            />


            <WingBlank>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>code</Text>
              </WingBlank>
              <InputItem
                autoCorrect={false}
                autoCapitalize={'none'}
                returnKeyType={'next'}
                placeholder={'Enter code'}
                onChange={this.props.onHandleChange('code')}
              />

              <WingBlank>
                <Button type="primary" inline size="large" onClick={this.props.onConfirmCode}>Confirm Code</Button>
              </WingBlank>

              <WhiteSpace/>

              <WingBlank>
                <Button inline size="large" onClick={this.props.onHide}>Back</Button>
              </WingBlank>




      </View>
    );
  }
}


export default Confirm
