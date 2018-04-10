import React, { Component } from 'react';
import { Text, View,TextInput } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { Button,Icon,WingBlank,WhiteSpace,List,Flex } from 'antd-mobile'
import { graphql, compose } from 'react-apollo'
import {computeSize} from '../utils/DeviceRatio'


class ChatPage extends Component {




  render() {
    return (
      <View style={{flex:1,backgroundColor:'white'}}>


        <List style={{flex:1,justifyContent:'flex-end'}} renderHeader={()=>(

            <Text style={{textAlign:'center',color:'#8c8c8c',marginBottom:computeSize(20)}}>October 24,1994</Text>
        )}>

        </List>

        <View style={{justifyContent:'flex-end',marginBottom:computeSize(50)}}>

          <Flex style={{margin:computeSize(20)}}>
            <Flex.Item style={{borderWidth:0.5,borderColor:'#8c8c8c',flex:0.9,borderRadius:computeSize(20)}}>
              <TextInput multiline={true} placeholder="Write a message" style={{marginTop:10,padding:computeSize(5)}}/>
            </Flex.Item>
            <Flex.Item style={{flex:0.1}}>
              <Button  style={{borderWidth:0}} size="small" inline><MaterialIcons name="send" size={computeSize(60)}  color={'red'} /></Button>
            </Flex.Item>
          </Flex>


        </View>


      </View>
    );
  }
}

export default ChatPage
