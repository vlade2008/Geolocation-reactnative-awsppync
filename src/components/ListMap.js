import React, { Component } from 'react';
import { Text, View,ScrollView,FlatList } from 'react-native';
import { NavigationActions } from 'react-navigation'
import { List,WingBlank,WhiteSpace,SearchBar,Flex,Modal,Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Ionicons ,MaterialIcons,MaterialCommunityIcons} from '@expo/vector-icons';
import {computeSize} from '../utils/DeviceRatio'
import _ from 'lodash'
import { graphql, compose } from 'react-apollo';
import Businesses from '../queries/Businesses'
import { MapView } from 'expo';


const Item = List.Item;
const Brief = Item.Brief;


const restaurantIcon = <MaterialIcons name={"restaurant"} size={computeSize(60)}  color={'red'} />
const cafeeIcon = <MaterialCommunityIcons name={"coffee"} size={computeSize(60)}  color={'gold'}/>

import cafeImg from '../../assets/cafe-icon.png'
import restaurantImg from '../../assets/restaurant-icon.png'


class ListMap extends Component {

  constructor(props){
    super(props)

    this.state = {
      value:''
    }
  }

  static navigationOptions = {
    title: 'List',
    tabBarLabel: 'List',
    tabBarIcon:(icn)=>{
      return(
        <Ionicons name="md-list" size={computeSize(60)}  color={icn.tintColor} />
      )
    }
  }

  componentDidMount(){
    this.setState({
      data:this.props.businesses
    })
  }

  onSelectBussiness = (item) =>{
    return ()=>{
      // console.log(item,'mao ni iyang ge selected na item');
      this.setState({
        selectedModal:true,
        dataSelected:item
      })
    }
  }

  _renderItem = (item) =>{
      return(

        <View style={{flex:1,marginTop:computeSize(10)}}>

          <WingBlank>
            <Item style={{borderRadius:computeSize(10)}} onClick={this.onSelectBussiness(item)}>
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

  onInputSearch = (value) =>{
    this.setState({
      value:value
    })
  }

  onSubmit = () =>{
    const searchText  = this.state.value;

    if (_.isEmpty(searchText)) {
      this.onLoad(this.props.businesses)
     }else {
        const reg = new RegExp(searchText, 'gi');

        let data = this.props.businesses.map((record,i)=>{
          const match = record.name.match(reg);
          if (!match) {
            return null;
          }
          return {
            ...record
          }

        }).filter(record => !!record)


        this.onLoad(data)
     }
  }

  onLoad = (data) =>{
    this.setState({data:data})
  }

  onClose = () =>{
    this.setState({selectedModal:false})
  }

  render() {

    return (
      <View style={{flex:1}}>
        <SearchBar
            value={this.state.value}
           onChange={this.onInputSearch}
           onSubmit={this.onSubmit}
           placeholder="Search" maxLength={8} cancelText="Cancel" />

        <FlatList
          data={this.state.data || []}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) => this._renderItem(item)}
         />


         {

           this.state.selectedModal ? (
             <Modal
               visible={this.state.selectedModal}
                transparent
                maskClosable={false}
                onClose={this.onClose}

               >

                 <View>
                   <Text style={{textAlign:'right',fontSize:computeSize(35),color:'gray'}}>{this.state.dataSelected.name}</Text>
                   <WhiteSpace/>
                   <Text style={{textAlign:'right',fontSize:computeSize(35),color:'gray'}}>{this.state.dataSelected.description}</Text>
                   <WhiteSpace/>
                   <Text style={{textAlign:'right',fontSize:computeSize(35),color:'gray'}}>{this.state.dataSelected.address}</Text>
                   <WhiteSpace/>

                   <MapView
                     style={{width:'100%',height:computeSize(500)}}
                      region={{
                        latitude:this.state.dataSelected.latitude,
                        longitude: this.state.dataSelected.longitude,
                        latitudeDelta: this.state.dataSelected.latitudeDelta,
                        longitudeDelta: this.state.dataSelected.longitudeDelta,
                      }}
                    >
                        <MapView.Marker
                          coordinate={{
                            latitude:this.state.dataSelected.latitude,
                            longitude:this.state.dataSelected.longitude
                          }}
                          title={this.state.dataSelected.name}
                          description={this.state.dataSelected.description}
                          image={
                            _.includes(this.state.dataSelected.type,'caffe') ? (
                              cafeImg
                            ): restaurantImg
                          }
                        />

                    </MapView>

                    <Button type="primary" onClick={this.onClose} style={{marginTop:computeSize(10)}}>Close</Button>

                 </View>

             </Modal>
           ): null

         }

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
        console.log(props,'unsa naa ane niya gd ngano ka?');
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
