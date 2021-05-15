import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Modal, ScrollView, KeyboardAvoidingView } from 'react-native';
import db from '../Config'
import firebase from 'firebase'
import MyHeader from '../components/MyHeader'

export default class RequestBook extends React.Component {
    constructor(){
        super()
        this.state = {
            userID: firebase.auth().currentUser.email,
            bookName: "",
            reasonToRequest: "",
        }
    }

    createUniqueID(){
       return Math.random().toString(36).substring(7)
    }

    addRequest = (bookName, reasonToRequest)=>{
       var userID = this.state.userID
       var randomRequestID = this.createUniqueID()
       db.collection('requested_books').add({
           user_ID: userID,
           book_name: bookName,
           reason_to_request: reasonToRequest,
           request_ID: randomRequestID
       })
       this.setState({
          bookName: '',
          reasonToRequest: '',
       })
       return Alert.alert("Your request has been added.")
    }
    render(){
        return(
            <View style = {{flex: 1}}>
                <MyHeader
                title = 'Request Book'
                navigation = {this.props.navigation}/>
                <KeyboardAvoidingView style = {styles.KeyboardAvoidingView}>
                <TextInput
          style={styles.formTextInput}
          placeholder ={"Enter Book Name"}
          onChangeText={(text)=>{
            this.setState({
              bookName: text
            })
          }}
          value = {this.state.bookName}
        />
         <TextInput
          style={styles.formTextInput}
          placeholder ={"Why do you need this book?"}
          onChangeText={(text)=>{
            this.setState({
              reasonToRequest: text
            })
          }}
          value = {this.state.reasonToRequest}
        />

        <TouchableOpacity style = {styles.button} onPress = {()=>{
            this.addRequest(this.state.bookName, this.state.reasonToRequest)
        }}>
             <Text>
                 Request
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