import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import HomePage from './Screen/homePage';
import { Splash } from './Screen';


const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer theme={DarkTheme} >
      <Stack.Navigator screenOptions={{ headerShown: false }}  >

        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="Splash" component={Splash} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes

const styles = StyleSheet.create({})