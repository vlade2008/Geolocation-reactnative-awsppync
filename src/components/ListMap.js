import React, { Component } from 'react';
import { Text, View,ScrollView,FlatList } from 'react-native';
import { NavigationActions } from 'react-navigation'
import { List,WingBlank,WhiteSpace,SearchBar,Flex } from 'antd-mobile'
import { connect } from 'react-redux'
import { Ionicons ,MaterialIcons,MaterialCommunityIcons} from '@expo/vector-icons';
import {computeSize} from '../utils/DeviceRatio'
import _ from 'lodash'
import { graphql, compose } from 'react-apollo';
import Businesses from '../queries/Businesses'

const Item = List.Item;
const Brief = Item.Brief;


const restaurantIcon = <MaterialIcons name={"restaurant"} size={computeSize(60)}  color={'red'} />
const cafeeIcon = <MaterialCommunityIcons name={"coffee"} size={computeSize(60)}  color={'green'}/>

class ListMap extends Component {

  static navigationOptions = {
    title: 'List',
    tabBarLabel: 'List',
    tabBarIcon:(icn)=>{
      return(
        <Ionicons name="md-list" size={computeSize(60)}  color={icn.tintColor} />
      )
    }
  }

  _renderItem = (item) =>{
      return(

        <View style={{flex:1,marginTop:computeSize(10)}}>

          <WingBlank>
            <Item style={{borderRadius:computeSize(10)}}>
                <Flex>
                  <Flex.Item>
                    <Text style={{fontSize:computeSize()}}>{item.name}</Text>
                  </Flex.Item>
                  <Flex.Item>
                    <Flex  >
                      <Flex.Item></Flex.Item>
                      <Flex.Item >
                        <Text style={{fontSize:computeSize(25)}}>{item.description}</Text>
                        <WhiteSpace/>
                        <Text style={{fontSize:computeSize(25)}}>{item.address}</Text>
                      </Flex.Item>
                      <Flex.Item style={{flex:0.5}}>
                        {
                          _.includes(item.type,'caffe') ? (
                            cafeeIcon
                          ): restaurantIcon
                        }
                      </Flex.Item>
                    </Flex>
                  </Flex.Item>
                </Flex>
            </Item>
          </WingBlank>
        </View>
      )
  }

  _keyExtractor = (item, index) => index;



  render() {
    return (
      <View style={{flex:1}}>
        <SearchBar placeholder="Search" maxLength={8} />

        <FlatList
          data={this.props.businesses || []}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) => this._renderItem(item)}
         />

      </View>

    );
  }
}


const AllBusinessWithdata = compose(
  graphql(Businesses, {
      options: {
        fetchPolicy: 'cache-and-network'
      },
      props: (props) => {

        return {
          businesses:_.isEmpty(props.data) || _.isEmpty(props.data.listBusinesses) ? [] : props.data.listBusinesses.items
        }
        // ({
        //   businesses: props.data.listBusinesses ? props.data.listBusinesses.items : [],
        // })
      }
  }),
)(ListMap)


export default AllBusinessWithdata
