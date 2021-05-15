import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Modal, ScrollView, KeyboardAvoidingView } from 'react-native';
import db from '../Config'
import firebase from 'firebase'
import { Header, Icon, Badge } from 'react-native-elements'

export default class MyHeader extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            value: "",
            userID: firebase.auth().currentUser.email
        }
       }
       getNumberOfNotifications(){
           db.collection("all_notifications").where("notification_status", "==", "unread").where("targeted_user_id", "==", this.state.userID)
           .onSnapShot((SnapShot)=>{
              var unreadNotifications = SnapShot.docs.map((doc)=>{
                 doc.data()
              })
              this.setState({
                  value: unreadNotifications.length
              })
           })
        }
        componentDidMount(){
            this.getNumberOfNotifications()
        }

        bellIconWithBadge = ()=>{
            return(
               <View>
                   <Icon
                   name = "bell"
                   type = "font-awesome"
                   color = "red"
                   size = {25}
                   />
                   <Badge
                   value = {this.state.value}
                   containerStyle = {{position: "absolute", top: -4, right: -4}}

                   />
               </View>
            )
        }
        render(){
    return(
       <Header
       leftComponent = {<Icon name = 'bars' type = 'font-awesome' color = 'blue' onPress = {()=>{
           props.navigation.toggleDrawer()
       }}/>}
       centerComponent = {{text: props.title, style: {color: 'green', fontSize: 20, fontWeight: 'bold'}}}
       rightComoponent = {<this.bellIconWithBadge {
           ...this.props
       }/>}
       backgroundColor = 'purple'
       />
    )
}}