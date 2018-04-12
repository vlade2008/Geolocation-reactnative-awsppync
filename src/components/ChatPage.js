import React, { Component } from 'react';
import { Text, View,TextInput } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { Button,Icon,WingBlank,WhiteSpace,List,Flex } from 'antd-mobile'
import { graphql, compose } from 'react-apollo'
import {computeSize} from '../utils/DeviceRatio'
import CreateConversation from '../mutations/CreateConversation'
import uuidV4 from 'uuid/v4'
import _ from 'lodash'
import moment from 'moment'

class ChatPage extends Component {

  constructor(props){
    super(props)

    this.state = {
      message:''
    }
  }

  onSumbit = ()=>{
    let payload = {
      id: uuidV4(),
      message:this.state.message,
      createdAt:moment().format('MMMM Do YYYY, h:mm:ss a'),
      userId:'test',
      name:'test'
    }
    this.props.onAdd(payload)



  }


  render() {


    return (
      <View style={{flex:1,backgroundColor:'white'}}>


        <List style={{flex:1,justifyContent:'flex-end'}} renderHeader={()=>(
          <Text style={{textAlign:'center',color:'#8c8c8c',marginBottom:computeSize(20)}}>October 24,1994</Text>
        )}>

        <View style={{padding:computeSize(20)}}>
          <View style={{backgroundColor:'#efefef',padding:computeSize(20),borderRadius:5}}>
            <Text style={{fontWeight:'bold'}}>Christian</Text>
            <Text>Gwapo jyd ko kaayo by ngano dli ko kabpogon</Text>
            <WhiteSpace/>
            <Text style={{fontSize:computeSize(20)}}>11:32pm </Text>
          </View>
        </View>

        <View style={{padding:computeSize(20)}}>
          <View style={{backgroundColor:'#108ee9',padding:computeSize(20),borderRadius:5}}>
            <Text style={{fontWeight:'bold',color:'white'}}>Me</Text>
            <Text style={{color:'white'}}>Gwapo jyd ko kaayo by ngano dli ko kabpogon</Text>
            <WhiteSpace/>
            <Text style={{fontSize:computeSize(20),color:'white'}}>11:32pm </Text>
          </View>
        </View>



        </List>

        <View style={{justifyContent:'flex-end',marginBottom:computeSize(50)}}>

          <Flex style={{margin:computeSize(20)}}>
            <Flex.Item style={{borderWidth:0.5,borderColor:'#8c8c8c',flex:0.9,borderRadius:computeSize(20)}}>
              <TextInput onChangeText={(message) => this.setState({message})} multiline={true} placeholder="Write a message" style={{marginTop:10,padding:computeSize(5)}}/>
            </Flex.Item>
            <Flex.Item style={{flex:0.1}}>
              <Button disabled={_.isEmpty(this.state.message) ? true : false} onClick={this.onSumbit}  style={{borderWidth:0,backgroundColor:'white',opacity:_.isEmpty(this.state.message) ? 0.5: 1}} size="small" inline><MaterialIcons name="send" size={computeSize(60)} color={'#108ee9'}/></Button>
            </Flex.Item>
          </Flex>


        </View>


      </View>
    );
  }
}

// export default ChatPage

export default compose(
  graphql(CreateConversation,{
    props: ({props,data}) => (
        {
          onAdd : (value)=>{
            console.log(data,'unsay props niya ane gd');
            // props.mutate({
            //   variables:value
            // })
          }
        }
        // {
        //   onAdd: city => props.mutate({
        //     variables: city
        //   })
        // }
    )
  })
)(ChatPage)
