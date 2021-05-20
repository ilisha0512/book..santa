import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Modal, ScrollView, KeyboardAvoidingView } from 'react-native';
import db from '../Config'
import firebase from 'firebase'

export default class RequestItem extends React.Component {
    constructor(){
        super()
        this.state = {
            userID: firebase.auth().currentUser.email,
            itemName: "",
            description: "",
        }
    }

    createUniqueID(){
       return Math.random().toString(36).substring(7)
    }

    addRequest = (itemName, description)=>{
       var userID = this.state.userID
       var randomRequestID = this.createUniqueID()
       db.collection('exchange_requests').add({
           user_ID: userID,
           item_name: itemName,
           description: description,
           request_ID: randomRequestID
       })
       this.setState({
          itemName: '',
          description: '',
       })
       return Alert.alert("Your request has been added.")
    }
    render(){
        return(
            <View style = {{flex: 1}}>
               
                <KeyboardAvoidingView style = {styles.KeyboardAvoidingView}>
                <TextInput
          style={styles.formTextInput}
          placeholder ={"Enter Item Name"}
          onChangeText={(text)=>{
            this.setState({
              itemName: text
            })
          }}
          value = {this.state.itemName}
        />
         <TextInput
          style={styles.formTextInput}
          placeholder ={"Describe the item."}
          multiline
          numberOfLines = {4}
          onChangeText={(text)=>{
            this.setState({
              description: text
            })
          }}
          value = {this.state.description}
        />

        <TouchableOpacity style = {styles.button} onPress = {()=>{
            this.addRequest(this.state.itemName, this.state.description)
        }}>
             <Text>
                Add Item
             </Text>
        </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
     flex:1,
     backgroundColor:'#F8BE85',
     alignItems: 'center',
     justifyContent: 'center'
   },
  
   KeyboardAvoidingView:{
     flex:1,
     justifyContent:'center',
     alignItems:'center'
   },
  
   formTextInput:{
     width:"75%",
     height:35,
     alignSelf:'center',
     borderColor:'#ffab91',
     borderRadius:10,
     borderWidth:1,
     marginTop:20,
     padding:10
   },
  
   button:{
     width:300,
     height:50,
     justifyContent:'center',
     alignItems:'center',
     borderRadius:25,
     backgroundColor:"#ff9800",
     shadowColor: "#000",
     shadowOffset: {
        width: 0,
        height: 8,
     },
     shadowOpacity: 0.30,
     shadowRadius: 10.32,
     elevation: 16,
     padding: 10
   },
  })