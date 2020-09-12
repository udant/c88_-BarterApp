import React from 'react';
import {createAppContainer } from "react-navigation"; 
import HomeScreen from "../screens/ExchangeScreen";
import ExchangeScreen from "../screens/ExchangeScreen";
import {createBottomTabNavigator } from "react-navigation-tabs"; 
export default BottomTabNavigator=createBottomTabNavigator({
    Home:{screen:HomeScreen},
    Exchange:{screen:ExchangeScreen}
  })
  const AppContainer = createAppContainer(switchNavigator)
  //createBottomTabNavigator