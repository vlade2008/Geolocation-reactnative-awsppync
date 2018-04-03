import React from 'react';
import {  Text, View, Button, Platform } from 'react-native';
import { graphql, compose } from 'react-apollo';
import { StackNavigator,TabNavigator,TabBarBottom } from 'react-navigation';


//compose
import AllEventWithData from './compose/AllEventWithData'
import AddEventData from './compose/AddEventData'

//Component
import About from './components/About'
import MapPage from './components/MapPage'
import ListMap from './components/ListMap'




// _button = function(navigation){
//   if(Platform.OS === 'ios'){
//     return <Button title='Create' color='#ffffff' onPress={()=> navigation.navigate('AddEvent')} />
//   }else {
//     return <Button title='Create' onPress={()=> navigation.navigate('AddEvent')} />
//   }
// }

// const Route = StackNavigator({
//   AllEvents : {
//     screen : (props) => <AllEventWithData {...props}/>,
//     navigationOptions: ({navigation}) => ({
//       title: 'Upcoming Events',
//       headerRight: this._button(navigation),
//       headerStyle:{
//         backgroundColor:'#42a1f4',
//       },
//       headerTitleStyle:{
//         color: '#ffffff'
//       },
//       headerTintColor:'#ffffff'
//     })
//   },
//   AddEvent: {
//     screen: (props) => <AddEventData {...props} />,
//      navigationOptions: ({navigation, screenProps}) => {
//       return {
//         title: 'Create Event',
//         headerStyle:{
//           backgroundColor:'#42a1f4'
//         },
//         headerTitleStyle:{
//           color: '#ffffff'
//         },
//         headerTintColor:'#ffffff'
//       };
//     }
//   }
// });

const AppTabNavigator = TabNavigator(
  {
    About:{screen:About},
    MapPage:{screen:MapPage},
    ListMap:{screen:ListMap}

  },
  {
    initialRouteName:'About',
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    lazyLoad: true,
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? '#2196F3' : '#fff',
    },
  }
)

const Route = StackNavigator({
  Home:{
    screen:AppTabNavigator
    }
  },
  {
    initialRouteName:'Home',
    headerMode: 'float'
  })

export default Route;
