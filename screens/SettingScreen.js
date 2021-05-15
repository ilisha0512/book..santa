import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Modal, ScrollView, KeyboardAvoidingView } from 'react-native';
import db from '../Config'
import firebase from 'firebase'
import MyHeader from '../components/MyHeader'

export default class SettingScreen extends React.Component{
    constructor(){
        super()
        this.state={
            firstname: '',
            lastname: '',
            address: '',
            contact: '',
            emailID: '',
            docID: '',
        }
    }
    getUserDetails = ()=>{
        var email = firebase.auth().currentUser.email
        db.collection('users').where("email_id", "==", email).get()
        .then(snapShot=>{
            snapShot.forEach(doc=>{
                var data = doc.data()
                this.setState({
                    emailID: data.email_id,
                    firstname: data.first_name,
                    lastname: data.last_name,
                    address: data.address,
                    contact: data.contact,
                    docID: doc.id
                })
            })
        })
    }

    updateUserDetails = ()=>{
        db.collection("users").doc(this.state.docID).update({
            first_name: this.state.firstname,
            last_name: this.state.lastname,
            contact: this.state.contact,
            address: this.state.address,
        })
        Alert.alert("Profile details updated successfully.")
    }
    componentDidMount(){
        this.getUserDetails()
    }

    render(){
        return(
            <View style = {{flex: 1}}>
              <MyHeader
                title = 'Update Profile Settings'
                navigation = {this.props.navigation}/>
                 <TextInput
          style={styles.formTextInput}
          placeholder ={"First Name"}
          maxLength ={8}
          onChangeText={(text)=>{
            this.setState({
              firstname: text
            })
          }}
          value = {this.state.firstname}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Last Name"}
          maxLength ={8}
          onChangeText={(text)=>{
            this.setState({
              lastname: text
            })
          }}
          value = {this.state.lastname}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Contact"}
          maxLength ={10}
          keyboardType={'numeric'}
          onChangeText={(text)=>{
            this.setState({
              contact: text
            })
          }}
          value = {this.state.contact}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Address"}
          multiline = {true}
          onChangeText={(text)=>{
            this.setState({
              address: text
            })
          }}
          value = {this.state.address}
        />
        <TouchableOpacity onPress = {()=>{
            this.updateUserDetails()
        }}>
            <Text>
                Save
            </Text>
        </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
})