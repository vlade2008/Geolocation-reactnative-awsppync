import React, { Component } from 'react';
import { Text, View,Image,ScrollView } from 'react-native';
import { NavigationActions,StackNavigator } from 'react-navigation'
import { MaterialIcons } from '@expo/vector-icons';
import {computeSize} from '../utils/DeviceRatio'

import { Button,Icon,WingBlank,WhiteSpace,Carousel } from 'antd-mobile'
import { graphql, compose } from 'react-apollo'


import cj1 from '../../assets/cj1.jpg'
import cj2 from '../../assets/cj2.jpg'
import cj3 from '../../assets/cj3.jpg'
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

    let data = [
      {imagesource:cj1},
      {imagesource:cj2},
      {imagesource:cj3}
    ]


    return (
      <ScrollView style={{flex:1}}>


        <WingBlank>
          <WhiteSpace />

            <View style={{paddingHorizontal:computeSize(15)}}>
              <Carousel
                style={{backgroundColor: '#fff'}}
                cellSpacing={10}
                slideWidth={0.1}
                autoplay={true}
                infinite
                dots={true}>
                {
                  data.map((item,i)=>{
                    return(
                      <View key={i}>
                        <Image  source={item.imagesource} style={{width:computeSize(800),height:computeSize(800)}}/>
                      </View>
                    )
                  })
                }
              </Carousel>
              <WhiteSpace/>
              <Text style={{fontSize:computeSize(50),color:'gray',fontWeight:'bold'}}>About Me</Text>
              <WhiteSpace/>

              <Text  style={{fontSize:computeSize(30),color:'gray'}}>
                2 years of experience in SPA framework using react js and react native and also an experience using redux, dva,ant design, react-bootstrap, node js in the company where I am currently working right now, I have gained so much skills and knowledge.  I am also harnessed with the knowledge and skill of web development, web design, mobile app development and programming. I have also a full stock background of back end using spring framework and php larvel.

              </Text>


            </View>


        </WingBlank>
      </ScrollView>
    );
  }
}


export default About
