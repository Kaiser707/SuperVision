import * as React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import Cam from './components/Cam'
import Output from './components/Output'
import Landing from './components/Landing'

const stackNav = createStackNavigator()

const AppNavigator = () => {
    return(
        <stackNav.Navigator>

            <stackNav.Screen name = 'Landing' component = {Landing} options = {{headerShown: false}} />
            <stackNav.Screen name = 'Camera' component = {Cam} options = {{headerShown: false}} />
            
            <stackNav.Screen name = 'Output' component = {Output} options = {{headerShown: false}} />
        </stackNav.Navigator>
    )
}

export default AppNavigator