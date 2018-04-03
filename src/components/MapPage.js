import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation'
import { Button } from 'antd-mobile'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {computeSize} from '../utils/DeviceRatio'
import { MapView } from 'expo';


class MapPage extends Component {
  static navigationOptions = {
    title: 'Map',
    tabBarLabel: 'Map',
    tabBarIcon:(icn)=>{
      return(
        <MaterialCommunityIcons name="map" size={computeSize(60)}  color={icn.tintColor} />
      )
    }
  }
  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    );
  }
}

export default MapPage
