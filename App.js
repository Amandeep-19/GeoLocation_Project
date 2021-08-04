import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as constants from './constants/constants';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Caches from './components/Caches';
import Create from './components/CreateCache';
import GeoLoc from './components/GeoLocation';
import Favorites from './components/Favorites';

const stack = createStackNavigator();

const opt = {
  headerStyle: {
    backgroundColor: constants.AppBGColor,
    shadowOpacity: 0
  },
  headerTitleStyle: {
    color: constants.AppFontColor
  },
  headerTintColor: constants.AppFontColor
};

export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen name = "Sign In"  component = { SignIn } options = { opt } />
        <stack.Screen name = "Register" component = { SignUp } options = { opt } />
        <stack.Screen name = "Caches"   component = { Caches } options = { opt } />
        <stack.Screen name = "Create Cache" component = { Create } options = { opt } />
        <stack.Screen name = "GeoLocation"  component = { GeoLoc } options = { opt } />
        <stack.Screen name = "Favorites"  component = { Favorites } options = { opt } />
      </stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
