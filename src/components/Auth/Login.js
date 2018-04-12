import React, { Component } from 'react';
import { View,StyleSheet } from 'react-native';
import { NavigationActions,StackNavigator } from 'react-navigation'
import { MaterialIcons ,SimpleLineIcons} from '@expo/vector-icons';
import {computeSize} from '../../utils/DeviceRatio'
import { Toast ,WingBlank,InputItem,Text,Button,WhiteSpace,ActivityIndicator} from 'antd-mobile';
import { graphql, compose } from 'react-apollo'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Auth } from 'aws-amplify';
import _ from 'lodash'


//redux
import * as authActions from '../../actions/authActions';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

class Login extends Component {

  constructor(props){
    super(props)

    this.state={
      username:'user',
      password:'password'
    }


  }

  static navigationOptions = {
    title: 'Login',
    tabBarLabel: 'Login',
    tabBarIcon:(icn)=>{
      return(
        <SimpleLineIcons name="login" size={computeSize(60)} color={icn.tintColor}    />
      )
    }
  }


  onHandleChange = (name) =>{
    return (value)=>{
      this.setState({
        [name]:value
      })
    }

  }


  onSubmit = () =>{
    let {username,password} = this.state;

    if (!_.isEmpty(username) && !_.isEmpty(password)) {
      this.onLoading()
      this.onSignIn()
    }else {
      Toast.fail('Please input all form!', 1);
    }



  }



  onSignIn = () =>{
    Auth.signIn(this.state.username, this.state.password)
      .then(user =>{
         this.onLoading()
         this.onHomeNavigation(user)

      })
      .catch(err => {
        this.onLoading()
        console.log(err,'error Login')
        Toast.success(err.message, 1);
      });
  }

  onLoading = () =>{
    this.setState({
      loading:false
    })
  }

  onHomeNavigation = (data) =>{

    const newAction = NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({routeName: 'Home'})
        ]
    });



    let payload = {
      name:data.username,
      userId:data.pool.clientId
    }

    this.props.authActions.loginSuccess(payload)
    this.props.navigation.dispatch(newAction)

  }



  render() {
    return (
         <View style={styles.container}>
           {
             this.state.loading ? (
               <ActivityIndicator
                    toast
                    text="Loading..."
                  />
             ): null
           }
           <KeyboardAwareScrollView>
             <WingBlank>

               <View
      							style={{
      								backgroundColor: 'white',
      								opacity: 0.5,
      								borderRadius: 10,
                      marginBottom:computeSize(200),
                      marginTop:computeSize(250),
                      justifyContent:'center',
                      alignItems:'center'
      							}}
      						>
                    <Text style={{fontSize:computeSize(50)}}>Geolocation by Christian</Text>

              </View>


              <WingBlank>
  								<Text style={{ fontSize: 20, fontWeight: 'bold' }}>Username</Text>
  							</WingBlank>
  							<InputItem
  								autoCorrect={false}
  								autoCapitalize={'none'}
  								returnKeyType={'next'}
  								placeholder={'Enter username'}
                  value={this.state.username}
                  onChange={this.onHandleChange('username')}
  							/>

                <WhiteSpace/>

                <WingBlank>
    								<Text style={{ fontSize: 20, fontWeight: 'bold' }}>Password</Text>
    							</WingBlank>
    							<InputItem
                    type={"password"}
    								autoCorrect={false}
    								autoCapitalize={'none'}
    								returnKeyType={'next'}
    								placeholder={'Enter Password'}
                    value={this.state.password}
                    onChange={this.onHandleChange('password')}
    							/>



                    <Button type="primary" inline size="large" onClick={this.onSubmit}>Sign In</Button>



             </WingBlank>


           </KeyboardAwareScrollView>
         </View>


    );
  }
}


function mapStateToProps(state) {
    return {
      auth:state.auth
    }
}

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authActions, dispatch)
    }
}




export default connect(mapStateToProps,mapDispatchToProps)(Login);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
