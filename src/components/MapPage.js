import React, { Component } from 'react';
import { Text, View,StyleSheet,Image } from 'react-native';
import { NavigationActions } from 'react-navigation'
import { Button } from 'antd-mobile'
import { MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';
import {computeSize} from '../utils/DeviceRatio'
import { MapView } from 'expo';
import _ from 'lodash'
import ClusteredMapView from 'react-native-maps-super-cluster'


import { graphql, compose } from 'react-apollo';
import Businesses from '../queries/Businesses'

import cafeIcon from '../../assets/cafe-icon.png'
import restaurantIcon from '../../assets/restaurant-icon.png'


const INIT_REGION = {
  latitude:9.642762453201371,
  latitudeDelta:0.13769150323313362,
  longitude:123.86318806726696,
  longitudeDelta:0.08170718703945568
}


class MapPage extends Component {

  constructor(props){
    super(props)


    this.state = {
      test:{
        latitude: 9.64371619718159,
        longitude: 123.86028569515416,
      }
    }
  }

  static navigationOptions = {
    title: 'Map',
    tabBarLabel: 'Map',
    tabBarIcon:(icn)=>{
      return(
        <MaterialCommunityIcons name="map" size={computeSize(60)}  color={icn.tintColor} />
      )
    }
  }

  renderMarker = (item) =>{
    return (
      <MapView.Marker
        coordinate={item.location}
        title={item.name}
        description={item.description}
        key={item.id}
        image={
          _.includes(item.type,'caffe') ? (
            cafeIcon
          ): restaurantIcon
        }
      />
    )
  }

  renderCluster = (cluster, onPress) => {
    const pointCount = cluster.pointCount,
          coordinate = cluster.coordinate,
          clusterId = cluster.clusterId

    return (
      <MapView.Marker identifier={`cluster-${clusterId}`} coordinate={coordinate} onPress={onPress}>
        <View style={styles.clusterContainer}>
          <Text style={styles.clusterText}>
            {pointCount}
          </Text>
        </View>
      </MapView.Marker>
    )
  }



  // onRegionChange(region) {
  //   console.log(region,'region ni siya noh');
  // }

  render() {

    let dataList = []

      _.map(this.props.businesses,(item,i)=>{
        let payload = {
          address:item.address,
          description:item.description,
          id:item.id,
          location:{latitude:item.latitude,longitude:item.longitude},
          name:item.name,
          type:item.type
        }
        dataList.push(payload)
      })


    return (
      <View style={{flex:1,backgroundColor: '#F5FCFF'}}>
        <ClusteredMapView
          style={{flex: 1}}
          data={dataList}
          renderMarker={this.renderMarker}
          renderCluster={this.renderCluster}
          initialRegion={INIT_REGION}>

        </ClusteredMapView>

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
)(MapPage)


export default AllBusinessWithdata

const styles = StyleSheet.create({
  clusterText: {
    fontSize: 13,
    color: '#65bc46',
    fontWeight: '500',
    textAlign: 'center',
  },
  clusterContainer: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'center',
    borderColor: '#65bc46',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
})
