import React from "react"
import { createStackNavigator } from 'react-navigation-stack'
import BookDonate from '../screens/BookDonate'
import ReceiverDetails from '../screens/ReceiverDetailsScreen'

export const AppStackNavigator = createStackNavigator({
    BookDonateList: {screen: BookDonate,
    navigationOptions: {headerShown: false}
    },

    ReceiverDetails: {screen: ReceiverDetails,
    navigationOptions: {headerShown: false}
    }
},
{initialRouteName: "BookDonateList"}
)