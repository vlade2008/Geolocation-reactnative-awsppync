import React, { Component } from 'react';
import { Text, View,TextInput,FlatList } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


import { MaterialIcons } from '@expo/vector-icons';
import { Button,Icon,WingBlank,WhiteSpace,List,Flex } from 'antd-mobile'
import { graphql, compose } from 'react-apollo'
import {computeSize} from '../utils/DeviceRatio'
import CreateConversation from '../mutations/CreateConversation'
import ListConversation from '../queries/ListConversation'
import uuidV4 from 'uuid/v4'
import _ from 'lodash'
import moment from 'moment'

//redux
import { connect } from 'react-redux'

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
      userId:this.props.auth.activeAuth.userId,
      name:this.props.auth.activeAuth.name,
      message:this.state.message,
      createdAt:moment().format('MMMM Do YYYY, h:mm:ss a')

    }
     this.props.onAdd(payload)

     this.setState({
       id:'',
       userId:'',
       name:'',
       message:'',
     })
  }

  _keyExtractor = (item,index) => index


  _renderItem = (item) =>{
    return (
      <List style={{flex:1,justifyContent:'flex-end'}}>

      {/* <List style={{flex:1,justifyContent:'flex-end'}} renderHeader={()=>(
        <Text style={{textAlign:'center',color:'#8c8c8c',marginBottom:computeSize(20)}}>October 24,1994</Text>
      )}> */}

      {
        _.includes(item.userId,this.props.auth.activeAuth.userId) ?(
          <View style={{padding:computeSize(20)}}>
            <View style={{backgroundColor:'#108ee9',padding:computeSize(20),borderRadius:5}}>
              <Text style={{fontWeight:'bold',color:'white'}}>Me</Text>
              <Text style={{color:'white'}}>{item.message}</Text>
              <WhiteSpace/>
              <Text style={{fontSize:computeSize(20),color:'white'}}>{item.createdAt} </Text>
            </View>
          </View>

        ): (
          <View style={{padding:computeSize(20)}}>
            <View style={{backgroundColor:'#efefef',padding:computeSize(20),borderRadius:5}}>

              <Text style={{fontWeight:'bold'}}>{item.name}</Text>
              <Text>{item.message}</Text>

              <WhiteSpace/>
              <Text style={{fontSize:computeSize(20)}}>{item.createdAt}</Text>

            </View>
          </View>
        )
      }
      </List>

    )
  }

  render() {

    return (
      <View style={{flex:1,backgroundColor:'white',justifyContent:'flex-end'}}>

            <FlatList
              data={this.props.conversation}
              keyExtractor={this._keyExtractor}
              renderItem={({ item }) => this._renderItem(item)}
            />

          {/* Form */}
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

// export default compose(
//   graphql(CreateConversation,{
//     props: props => (
//         {
//           onAdd : (value)=>{
//             console.log(props,'unsay props niya ane gd');
//             // props.mutate({
//             //   variables:value
//             // })
//           }
//         }
//     )
//   })
// )(ChatPage)

const withCloneChat = compose(
  graphql(ListConversation, {
      options: {
        fetchPolicy: 'cache-and-network'
      },
        props: (props) => {
        console.log(props,'unsa naa ane niya gd ngano ka?');
        return {
          conversation:_.isEmpty(props.data) || _.isEmpty(props.data.listConversations) ? [] : props.data.listConversations.items
        }
          // ({
          //   conversation: props.data.listConversations ? props.data.listConversations.items : [],
          // })
      }

  }),
  graphql(CreateConversation,{
      options:{
        fetchPolicy: 'cache-and-network'
      },
      props: props => (
          {
            onAdd:(value)=>{
              props.mutate({
                  variables: value
                })
            }
          }
      ),
      options: {
        refetchQueries: [{ query: ListConversation }],
        update: (dataProxy, { data: { createConversation } }) => {
          const query = ListConversation;
          const data = dataProxy.readQuery({ query });
          data.listConversations.items.push(createConversation);
          dataProxy.writeQuery({ query, data });
        }
      }
    }
  ),


)

 const SubmitConversation = withCloneChat(ChatPage)

 export default Conversation = connect(
   (state) => ({
     items:state.items,
     auth:state.auth
   })
 )(SubmitConversation)
