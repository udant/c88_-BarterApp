import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import db from '../screens/config';
import {  } from '';

export default class ReceiverDetailsScreen extends React.Component {
  constructor(){
    super()
    this.state = {
      userId:firebase.auth().currentUser.email,
      recieverId:this.props.navigation.getParam('details')['userId'],
      requestId:this.props.navigation.getParam('details')['requestId'],
      itemName:this.props.navigation.getParam('details')['itemame'],
      reasonToRequest:this.props.navigation.getParam('details')['resonToRequest'],
      recieverName:'',
      recieverContact:'',
      recieverAddress:'',
      recieverRequestDocId:''
    }
  }
getRecieverDetails(){
  db.collection('users').where('email','==',this.state.recieverId).get()
  .then(snapshot=>{
    snapshot.forEach(doc=>{
      this.setState({
        recieverName:doc.data.firstname,
        recieverContact:doc.data.contact,
        recieverAddress:doc.data.address
      })
    })
  })
  db.collection('requested_items').where('requestId','==',this.state.requestId).get()
  .then(snapshot=>{
    snapshot.forEach(doc=>{
      this.setState({recieverRequestDocId:doc.id})
    })
  })
}

updateItemStatus=()=>{ 
  db.collection('all_donations').add({ 
    item_Name : this.state.itemName, 
    requestId : this.state.requestId,
     requested_by : this.state.recieverName,
      donor_id : this.state.userId,
       request_status : "Donor Interested" }) }

addNotification=()=>{ 
  var message = this.state.userName + " has shown interest in donating the item" 
  db.collection("all_notifications").add({ 
    "targeted_user_id" : this.state.recieverId,
     "donor_id" : this.state.userId, 
     "request_id" : this.state.requestId,
      "item_Name" : this.state.itemName, 
      "date" : firebase.firestore.FieldValue.serverTimestamp(),
       "notification_status" : "unread", 
       "message" : message 
      }) }


componentDidMount(){
  this.getRecieverDetails()
}

render(){
  return(
    <View style={styles.container}>
      <View style={{flex:0.1}}>
        <Header
          leftComponent ={<Icon name='arrow-left' type='feather' color='#696969'  onPress={() => this.props.navigation.goBack()}/>}
          centerComponent={{ text:"Donate items", style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
          backgroundColor = "#eaf8fe"
        />
      </View>
      <View style={{flex:0.3}}>
        <Card
            title={"item Information"}
            titleStyle= {{fontSize : 20}}
          >
          <Card >
            <Text style={{fontWeight:'bold'}}>Name : {this.state.itemName}</Text>
          </Card>
          <Card>
            <Text style={{fontWeight:'bold'}}>Reason : {this.state.reason_for_requesting}</Text>
          </Card>
        </Card>
      </View>
      <View style={{flex:0.3}}>
        <Card
          title={"Reciever Information"}
          titleStyle= {{fontSize : 20}}
          >
          <Card>
            <Text style={{fontWeight:'bold'}}>Name: {this.state.recieverName}</Text>
          </Card>
          <Card>
            <Text style={{fontWeight:'bold'}}>Contact: {this.state.recieverContact}</Text>
          </Card>
          <Card>
            <Text style={{fontWeight:'bold'}}>Address: {this.state.recieverAddress}</Text>
          </Card>
        </Card>
      </View>
      <View style={styles.buttonContainer}>
        {
          this.state.recieverId !== this.state.userId
          ?(
            <TouchableOpacity
                style={styles.button}
                onPress={()=>{
                  this.updateItemStatus()
                  this.addNotification()
                  this.props.navigation.navigate('MyDonations')
                }}>
              <Text>I want to Donate</Text>
            </TouchableOpacity>
          )
          : null
        }
      </View>
    </View>
  )
}

}


  const styles = StyleSheet.create({ 
    container: { flex:1, }, 
    buttonContainer : { flex:0.3, justifyContent:'center', alignItems:'center' }, 
    button:{ width:200, height:50, justifyContent:'center', alignItems : 'center', 
      borderRadius: 10, backgroundColor: 'orange', shadowColor: "#000", 
      shadowOffset: { width: 0, height: 8 }, elevation : 16 } 
    })