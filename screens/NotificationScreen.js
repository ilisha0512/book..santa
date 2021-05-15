import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Modal, ScrollView, FlatList, KeyboardAvoidingView } from 'react-native';
import db from '../Config'
import firebase from 'firebase'
import MyHeader from '../components/MyHeader'
import { ListItem } from 'react-native-elements'
import SwipableFlatList from '../components/SwipableFlatList.js'

export default class NotificationScreen extends React.Component {
    constructor(){
        super()
        this.state = {
            allNotifications: [],
            uderID: firebase.auth().currentUser.email
        }
        this.requestRef = null

    }

    getallNotifications = ()=>{
        this.requestRef = db.collection('all_notifications').where("notification_status","==", "unread").where("targeted_user_id", "==", this.state.userID)

        .onSnapshot((snapShot)=>{
            var allNotifications = []
           snapShot.docs.map((document) => {
               var notification = document.data()
            notification["doc_id"] = document.id
        allNotifications.push(notification)})
            this.setState({
                allNotifications: allNotifications
            })
        })
    }

    componentDidMount(){
        this.getallNotifications()
    }

    componentWillUnmount(){
         this.requestRef()
    }

    keyExtractor = (item, index)=>index.toString()

    renderItem = ({item, index})=>{
       return(
           <ListItem
           key = {index}
           title = {item.book_name}
           subtitle = {item.item.message}
           titleStyle = {{color: "#00007C", fontWeight: "bold"}}
           bottomDivider
           />
       )
    }

    render(){
        return(
            
            <View>
              <MyHeader
              title = 'Notifications'
              navigation = {this.props.navigation}
              />
              {
                  this.state.allNotifications.length === 0
                  ?(
                      <View>
                          <Text>
                              There are no notifications.
                          </Text>
                      </View>
                  )
                  :(
                      <SwipableFlatList
                      allNotifications = {this.state.allNotifications}
                      />
                  )
              }
            </View>
        )
    }
}