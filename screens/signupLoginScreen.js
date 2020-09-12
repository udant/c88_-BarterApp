import React from 'react';
import {   View,
  Text,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView} from 'react-native';
import db from '../config' ;
import firebase from 'firebase'; 

export default class SignupLoginScreen extends React.Component {
    constructor(){
        super();
        this.state={
          emailId:'',
          password:'',
          firstName:'',
          lastName:'',
          address:'',
          contact:'',
          confirmPassword:'',
          isModalVisible:'false'
        }
    }
    userLogin = (emailId, password)=>{
      firebase.auth().signInWithEmailAndPassword(emailId, password)
      .then(()=>{
        this.props.navigation.navigate('DonateBooks')
      })
      .catch((error)=> {
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage)
      })
    }
  userSignUp = (emailId, password,confirmPassword) =>{
    if(password !== confirmPassword){
        return Alert.alert("password doesn't match\Check your password.")
    }else{
      firebase.auth().createUserWithEmailAndPassword(emailId, password)
      .then(()=>{
        db.collection('users').add({
          first_name:this.state.firstName,
          last_name:this.state.lastName,
          contact:this.state.contact,
          email_id:this.state.emailId,
          address:this.state.address,
          IsBookRequestActive : false
        })
        return  Alert.alert(
             'User Added Successfully',
             '',
             [
               {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
             ]
         );
      })
      .catch((error)=> {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage)
      });
    }
  }
    
  showModal = ()=>{
    return(
    <Modal
      animationType="fade"
      transparent={true}
      visible={this.state.isModalVisible}
      >
      <View style={styles.modalContainer}>
        <ScrollView style={{width:'100%'}}>
          <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
          <Text
            style={styles.modalTitle}
            >Registration</Text>
          <TextInput
            style={styles.formTextInput}
            placeholder ={"First Name"}
            maxLength ={8}
            onChangeText={(text)=>{
              this.setState({
                firstName: text
              })
            }}
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
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Email"}
            keyboardType ={'email-address'}
            onChangeText={(text)=>{
              this.setState({
                emailId: text
              })
            }}
          /><TextInput
            style={styles.formTextInput}
            placeholder ={"Password"}
            secureTextEntry = {true}
            onChangeText={(text)=>{
              this.setState({
                password: text
              })
            }}
          /><TextInput
            style={styles.formTextInput}
            placeholder ={"Confrim Password"}
            secureTextEntry = {true}
            onChangeText={(text)=>{
              this.setState({
                confirmPassword: text
              })
            }}
          />
          <View style={styles.modalBackButton}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={()=>
                this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
              }
            >
            <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalBackButton}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={()=>this.setState({"isModalVisible":false})}
            >
            <Text style={{color:'#ff5722'}}>Cancel</Text>
            </TouchableOpacity>
          </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </Modal>
  )
  }
  render(){   
  return (
    <View style={styles.container}>
       
        <TextInput 
                style={styles.loginBox}
                keyboardType={'email-address'}
                onChangeText={(text)=>{
                  this.setState({
                    email: text
                  })
                }}
              />
         <TextInput 
                style={styles.loginBox}
                secureTextEntry = {true}
                onChangeText={(text)=>{
                  this.setState({
                    password: text
                  })
                }}
              />  
               
              
        <View >  
          <TouchableOpacity
             style={[styles.button,{marginBottom:20, marginTop:90}]}
             onPress = {()=>{
               console.log(this.state.email, this.state.password)
               this.userLogin(this.state.email, this.state.password)
             }}
             >
             <Text style={styles.buttonText}>Login</Text>
           </TouchableOpacity>
  
           <TouchableOpacity
             style={styles.button}
             onPress={()=>{
              this.showModal();
              Alert.alert("I  m displayed");
              this.setState({ isModalVisible:true});
              }}
             >
             <Text style={styles.buttonText}>SignUp</Text>
           </TouchableOpacity>  
           </View> 
           
    </View>
  );
 }
}

const styles = StyleSheet.create({
  container:{ 
    flex:1,
    backgroundColor:'#fff' ,
    padding:8,
    paddingTop:10
  }, 
  profileContainer:{ 
    flex:1,
    justifyContent:'center',
    alignItems:'center',
   }, 
  loginBox:{ 
    marginTop:70,
    width: 300, 
    height: 40,
    alignSelf:'center',
    borderColor : '#ff8a65', 
    fontSize: 20,
    margin:10,
    paddingLeft:70 ,
  
    borderWidth:  3
  }, 
  button:{ 
    width:300, 
    marginLeft:50,
    height:40, 
    justifyContent:'center', 
    alignItems:'center', 
    alignSelf:'center',
    borderRadius:0, 
    backgroundColor:"#f8aa00", 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8, }, 
    shadowOpacity: 0.30, 
    shadowRadius: 10.32, 
    elevation: 16, 
  },
  buttonText:{ 
    color:'#ffff', 
    fontWeight:'200', 
    fontSize:20 
  },
  buttonContainer:{ 
    flex:1, 
    alignItems:'center' 
  }
});
