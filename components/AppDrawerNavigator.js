import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { AppTabNavigator } from './AppTabNavigator'
import CustomSidebarMenu from './CustomSidebarMenu'
import SettingScreen from '../screens/SettingScreen'
import MyDonations from '../screens/MyDonations'
import NotificationScreen from '../screens/NotificationScreen.js'

export const AppDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: AppTabNavigator
    },
    SettingScreen: {
        screen: SettingScreen
    },
    MyDonations: {
        screen: MyDonations
    },
    NotificationScreen: {
        screen: NotificationScreen
    }
},
{
    contentComponent: 
        CustomSidebarMenu
    
},
{
    initialRouteName: "Home"
})