import React from 'react';
import {  Platform ,TouchableOpacity,Text} from 'react-native';
import { graphql, compose } from 'react-apollo';
import { StackNavigator,TabNavigator,TabBarBottom ,NavigationActions,DrawerNavigator} from 'react-navigation';
import {computeSize} from './utils/DeviceRatio'
import { Auth } from 'aws-amplify';
///ui components
import { Modal} from 'antd-mobile';
import { Ionicons,MaterialCommunityIcons} from '@expo/vector-icons';
const alert = Modal.alert;

//compose
import AllEventWithData from './compose/AllEventWithData'
import AddEventData from './compose/AddEventData'

//Component
import About from './components/About'
import MapPage from './components/MapPage'
import ListMap from './components/ListMap'

//Login Component
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'

//chat components
import ChatPage from './components/ChatPage'

import Test from './components/Test'




 _logout =  function(navigation){
  return(<TouchableOpacity onPress={this._confirm(navigation)}><Ionicons name="ios-log-out" size={computeSize(60)} style={{marginRight:computeSize(20)}}/></TouchableOpacity>)
}

_openDrawer = function(navigation){
  return(<TouchableOpacity onPress={()=>{navigation.navigate('DrawerToggle')}} ><Ionicons name="ios-menu" size={computeSize(60)} style={{marginLeft:computeSize(20)}}/></TouchableOpacity>)
}

_confirm = function(navigation){
  return ()=>{
    alert('Logout', 'Are you sure???', [
      { text: 'Cancel', onPress: () => console.log('cancel'), style: 'default' },
      { text: 'OK', onPress: () =>{this._signout(navigation)} },
    ]);
  }

}

_signout = function(navigation){
  Auth.signOut()
    .then(data =>{
       console.log(data,'sucess signout')
       console.log(navigation,'unsa navigation niya ane gd');

       const newAction = NavigationActions.reset({
           index: 0,
           actions: [
               NavigationActions.navigate({routeName: 'Auth'})
           ]
       });

       navigation.dispatch(newAction)

    })
    .catch(err => console.log(err,'error signout'));
}

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

const AuthNavigator = TabNavigator(
  {
    Login:{screen:Login},
    Signup:{screen:Signup}
  },

  {
    initialRouteName:'Login',
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

const HomeDrawerNavigator = DrawerNavigator({
    Main:{
      screen:AppTabNavigator,
      navigationOptions:({navigation})=>({
        drawerLabel: 'Home'
      })
    },
    Chats:{
      screen:ChatPage,
      navigationOptions:({navigation})=>({
        drawerLabel: 'Chat'
      })
    }
  },{
    initialRouteName:'Chats',
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
  }

)

const Route = StackNavigator({
  Home:{
      screen:HomeDrawerNavigator,
      navigationOptions: ({navigation}) => ({
            headerRight: this._logout(navigation),
            headerLeft: this._openDrawer(navigation)
          })
    },
  Auth:{
      screen:AuthNavigator
    },
  },
  {
    initialRouteName:'Auth',
    headerMode: 'float'
  })



export default Route;
