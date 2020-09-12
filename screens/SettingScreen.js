import * as React from 'react';
import { Text, View, StyleSheet, Alert ,TouchableOpacity} from 'react-native';
import db from './config';
import firebase from "firebase";

export default class SettingScreen extends React.Component {
constructor(){
 super();    
  this.state={
    email:'',
    docId:'',
    firstname:'',
    lastname:'',
    contact:'',
    address:'',
  }
} 

getUserDetail(){
    var user = firebase.auth().currentUser;
    var email= user.email
    db.collection('users').where('email','==',email).get()
    .then(snapshot =>{
        snapshot.forEach(doc=>{
            var data= doc.data
            this.setState({
                email:data.email,
                firstname:data.firstname,
                lastname:data.lastname,
                address:data.address,
                contact:data.contact,
                docId:doc.Id
            })
        })
    })
    
} 
updateUserDetails=()=>{
    db.collection('users').doc(this.state.docId)
    .update({
        "firstname":this.state.firstname,
        "lastname":this.state.lastname,
        "address":this.state.address,
        "contact":this.state.contact
    })
    Alert.alert("Profile Updated Successfully")
} 
componentDidMount(){
    this.getUserDetail()
}
 return(){   
  return(
    <View style={container}>
       <TextInput
                style={styles.formTextInput}
                placeholder ={"First Name"}
                maxLength ={8}
                onChangeText={(text)=>{
                  this.setState({
                    firstName: text
                  })
                }}
                value={this.state.firstname}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Last Name"}
                maxLength ={8}
                onChangeText={(text)=>{
                  this.setState({
                    lastName: text
                  })
                }}
                value={this.state.lastname}
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
                value={this.state.lastname}
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
                value={this.state.lastname}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Email"}
                keyboardType ={'email-address'}
                onChangeText={(text)=>{
                  this.setState({
                    email: text
                  })
                }}
                value={this.state.email}
              />
              <TouchableOpacity style={styles.button}
                onPress={()=>{
                    this.updateUserDetails()
                }}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
    </View>
  )
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});