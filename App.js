import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native'


import AppNavigator from './Navigator'

class App extends Component{
  render(){

    console.disableYellowBox = true
    return(

      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
        
       

    )
  }
}

export default App;
