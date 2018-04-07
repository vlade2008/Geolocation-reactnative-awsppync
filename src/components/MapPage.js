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
          longitudeDelta: 0.02145766949155359,
           latitude: 9.64197507929326,
           longitude: 123.8631708624005,
           latitudeDelta: 0.02030836771244537
        }}
      />
    );
  }
}

export default MapPage
