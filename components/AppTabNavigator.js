import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import BookDonate from "../screens/BookDonate"
import RequestBook from "../screens/RequestBook"
import { AppStackNavigator } from './AppStackNavigator'

export const AppTabNavigator = createBottomTabNavigator({
    BookDonate: {
        screen: AppStackNavigator,
        navigationOptions: {
            tabBarIcon: <Image
            style = {{width: 20, height: 20}}
            source = {require("../assets/book.png")}/>,
            tabBarLabel: "BookDonate"
        }
    },
    RequestBook: {
        screen: RequestBook,
        navigationOptions: {
            tabBarIcon: <Image
            style = {{width: 20, height: 20}}
            source = {require("../assets/writingbook.png")}/>,
            tabBarLabel: "RequestBook"
        }
    }
})