import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Modal, ScrollView, FlatList, KeyboardAvoidingView } from 'react-native';
import db from '../Config'
import firebase from 'firebase'
import MyHeader from '../components/MyHeader'
import { ListItem, Icon } from 'react-native-elements'

export default class MyDonations extends React.Component {
    
    constructor(){
        super()
        this.state = {
            requestedBookList: [],
            userID: firebase.auth().currentUser.email,
            userName: "",
        }
        this.requestRef = null

    }

    getAllDonations = ()=>{
        this.requestRef = db.collection('all_donations')
        .onSnapshot((snapShot)=>{
            var allDonations = snapShot.docs.map(document => document.data())
            this.setState({
                requestedBookList: allDonations
            })
        })
    }

    getDonorDetails=()=>{
        db.collection("users").where("email_id", "==", this.state.userID).get()
        .then(SnapShot=>{
            SnapShot.forEach(doc=>{
                this.setState({
                    userName: doc.data().first_name + " " + doc.data().last_name
                })
            })
        })
    }

    sendBook = (bookDetails)=>{
        if (bookDetails.request_status === "Book sent"){
            var requestStatus = "Book has been sent"
            db.collection("all_donations").doc(bookDetails.doc_id).update({
                request_status: requestStatus
            })
            this.sendNotification(bookDetails, requestStatus)
        }

        else{
           var requestStatus = "Book sent."
           db.collection("all_donations").doc(bookDetails.doc_id).update({
            request_status: requestStatus
        })
        this.sendNotification(bookDetails, requestStatus) 
        }
    }

       sendNotification = (bookDetails, requestStatus)=>{
            var requestID = bookDetails.request_ID
            var donorID = bookDetails.donor_ID
            db.collection("all_notifications").where("request_ID", "==", requestID).where("donor_ID", "==", donorID).get()
                .then((SnapShot)=>{
                    SnapShot.forEach((doc)=>{
                        var message = ""
                        if(requestStatus==="Book sent."){
                            message = this.state.userName + "Sent you a book."
                        }
                        else{
                            message = this.state.userName + "Donor interested in donating a book.."
 
                        }
                        db.collection("all_notifications").doc(doc.id).update({
                            message: message,
                            notification_status: "unread",
                            date: firebase.firestore.FieldValue.serverTimestamp()
                        })
                    })
                })
            
       }

    componentDidMount(){
        this.getAllDonations()
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
           subtitle = {"requested by"+item.requested_by+"\nstatus"+item.request_status}
           titleStyle = {{color: "#00007C", fontWeight: "bold"}}
           rightElement = {
               <TouchableOpacity style = {[styles.button,{
                backgroundColor: item.request_status==="Book sent."?"green":"red"
            }]} onPress={()=>{
                this.sendBook(item)
            }}>
                   <Text>
                      {item.request_status==="Book sent."?"Book Sent.":"Send Book"}
                   </Text>
               </TouchableOpacity >
           }
           leftElement = {
              <Icon
              name = "book" type = "font-awesome" color = "blue"              />
           }
           bottomDivider
           />
       )
    }

    render(){
        return(
            
            <View>
              <MyHeader
              title = 'My Donations'
              navigation = {this.props.navigation}
              />
              {
                  this.state.requestedBookList.length === 0
                  ?(
                      <View>
                          <Text>
                              There are no requested books.
                          </Text>
                      </View>
                  )
                  :(
                      <FlatList
                      keyExtractor = {this.keyExtractor}
                      data = {this.state.requestedBookList}
                      renderItem = {this.renderItem}
                      />
                  )
              }
            </View>
        )
    }
}

const styles = StyleSheet.create({
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