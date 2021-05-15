import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Modal, ScrollView, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase'
import { DrawerItems } from 'react-navigation-drawer';
import { Avatar } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'
import db from '../Config'

export default class CustomSidebarMenu extends React.Component{
    constructor(){
        super()
        this.state = {
            userID: firebase.auth().currentUser.email,
            image: "#",
            name: "",
            docID: "",
        }
    }

    selectPicture = async()=>{
        const {cancelled, uri} = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
        if (!cancelled){
            this.uploadImage(uri, this.state.userID)    
        }
    }

    uploadImage = async(uri, ImageName)=>{
        var response = await fetch(uri)
        var blob = await response.blob()
        var ref = firebase.storage().ref().child("user-profiles/" + ImageName)
        return ref.put(blob).then((response)=>{
            this.fetchImage(ImageName)
        })       
    }
 
    fetchImage = (ImageName)=>{
       var storageRef = firebase.storage().ref().child("user-profiles/" + ImageName)
       storageRef.getDownloadURL().then((url)=>{
           this.setState({
               image: url
           })
           .catch((error)=>{
               this.setState({image: "#"})
           })
       })
    }

    getUserProfile(){
        db.collection("users").where("email_id", "==", this.state.userID)
        .onSnapShot((SnapShot)=>{
            SnapShot.forEach((doc)=>{
                this.setState({
                    name: doc.data().first_name + "" + doc.data().last_name,
                    docID: doc.id,
                    image: doc.data().image
                })
            })
        })

        
    }

    render(){
      return(
          <View style = {{flex: 1}}>
            <View style = {{flex: 0.8}}>
               <DrawerItems
               {
                   ...this.props
               }
               />
               <View style = {{flex: 0.2, justifyContent: 'flex-end', paddingBotton: 30}}>
                   <TouchableOpacity onPress = {()=>{
                       this.props.navigation.navigate("WelcomeScreen")
                       firebase.auth().signOut()
                   }}>
                       <Text>
                           Logout
                       </Text>
                   </TouchableOpacity>
               </View>
            </View>
          </View>
      )
    }
}