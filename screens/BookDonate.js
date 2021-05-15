import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Modal, ScrollView, FlatList, KeyboardAvoidingView } from 'react-native';
import db from '../Config'
import firebase from 'firebase'
import MyHeader from '../components/MyHeader'
import { ListItem } from 'react-native-elements'

export default class BookDonate extends React.Component {
    constructor(){
        super()
        this.state = {
            requestedBookList: [],
        }
        this.requestRef = null

    }

    getRequestedBookList = ()=>{
        this.requestRef = db.collection('requested_books')
        .onSnapshot((snapShot)=>{
            var requestedBookList = snapShot.docs.map(document => document.data())
            this.setState({
                requestedBookList: requestedBookList
            })
        })
    }

    componentDidMount(){
        this.getRequestedBookList()
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
           subtitle = {item.reason_to_request}
           titleStyle = {{color: "#00007C", fontWeight: "bold"}}
           rightElement = {
               <TouchableOpacity onPress = {
                   ()=>{
                       this.props.navigation.navigate("ReceiverDetails", {"details": item})
                   }
               }>
                   <Text style = {{color: 'purple'}}>
                       View
                   </Text>
               </TouchableOpacity>
           }
           bottomDivider
           />
       )
    }

    render(){
        return(
            
            <View>
              <MyHeader
              title = 'Donate Books'
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