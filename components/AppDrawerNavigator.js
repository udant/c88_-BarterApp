import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import BottomTabNavigator from './BottomTabNavigator'
import CustomSideBarMenu  from './CustomSideBarMenu';
import SettingScreen from '../screens/SettingScreen';
import MyBarters from '../screens/MyBarters';


export const AppDrawerNavigator = createDrawerNavigator({
  Home : {
    screen : BottomTabNavigator
    },
  Setting : {
    screen : SettingScreen
  },
  MyBarters : {
    screen : MyBarters
  },
},
  {
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName : 'Home'
  })