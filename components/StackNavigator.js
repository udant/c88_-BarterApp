/*navigationOptions: {
    headerShown:false
}*/
import {createStackNavigator} from 'react-navigation-stack';
import BottomTabNavigator from './BottomTabNavigator';
import ReceiverDetailsScreen from '../screens/ReceiverDetailsScreen ';
export const AppStackNavigator = createStackNavigator({
    Home : {
      screen : BottomTabNavigator,
        navigationOptions: {
            headerShown:false
        }
      },
    Setting : {
      screen : SettingScreen,
        navigationOptions: {
            headerShown:false
        }
    }
  },
    {
      contentComponent:CustomSideBarMenu
    },
    {
      initialRouteName : 'Home'
    })