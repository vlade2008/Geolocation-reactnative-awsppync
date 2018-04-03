import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { NavigationActions,StackNavigator } from 'react-navigation'
import { MaterialIcons } from '@expo/vector-icons';
import {computeSize} from '../utils/DeviceRatio'

import { Button,Icon,WingBlank,WhiteSpace } from 'antd-mobile'
import { graphql, compose } from 'react-apollo'


class About extends Component {

  static navigationOptions = {
    title: 'About',
    tabBarLabel: 'About',
    tabBarIcon:(icn)=>{
      return(
        <MaterialIcons name="info" size={computeSize(60)} color={icn.tintColor}    />
      )
    }
  }



  render() {
    return (
      <WingBlank>
        <WhiteSpace />
          <Text style={{fontSize:computeSize(45),color:'gray'}}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </Text>
      </WingBlank>
    );
  }
}


export default About
