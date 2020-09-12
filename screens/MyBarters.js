import * as React from 'react';
import { Text, View, StyleSheet,Button ,Alert} from 'react-native';
import SettingScreen from './SettingScreen';
import ReceiverDetailsScreen from './RecieverDetailsScreen';
var ExchangerName = SettingScreen/constructor/firstname;
var ExchangerContact = SettingScreen/constructor/contact;
var ExchangerAddress = SettingScreen/constructor/address;
Alert.alert(ExchangerName,ExchangerContact,ExchangerAddress)

export default class MyBarters extends React.Component {

 constructor(){
    super();    
        this.state={                             
        email:'',            
        ExchangerName:'',    
        ItemName:'',         
        ExchangerContact:'', 
        ExchangerAddress:'', 
        requestBarterList:[],
        }
        this.requestRef = null
   
        this.setState({ExchangerName:ExchangerName,ExchangerContact:ExchangerContact,ExchangerAddress:ExchangerAddress})
    }    
    getAllBarters =()=>{
        this.requestRef = db.collection("requested_items") .onSnapshot((snapshot)=>{ 
          var requestedBarterList = snapshot.docs.map(document => document.data()); 
          this.setState({ requestedBarterList : requestedBarterList }); }) } 

          componentDidMount(){ 
            this.getAllBarters() 
          } 
          componentWillUnmount(){ 
            this.requestRef(); 
          }
  addBarters=()=>{
    db.collection('MyBarters').doc(this.state.docId)
    .update({
        "ExchangerName":this.state.ExchangerName,
        "itemName":this.state.ItemName,
        "ExchangerAddress":this.state.ExchangerAddress,
        "ExchangerContact":this.state.ExchangerContact
    })
  }
  renderItem = ( {item, i} ) =>{ 
    return ( 
     <ListItem key={i} title={item.book_name} 
       subtitle={item.reason_to_request} 
       titleStyle={{ color: 'black', fontWeight: 'bold' }} 
       rightElement={ 
        <Button color={'#ff9055'} title="Exchange" onPress={this.addBarters,ReceiverDetailsScreen/addNotification()}/>
    } 
       bottomDivider />
     ) 
   }
    render(){ 
      return (
         <View style={styles.container}>
             <MyHeader navigation={this.props.navigation} title="My Donations"/>
             <FlatList keyExtractor={this.keyExtractor}
                      data={this.state.requestedBooksList} 
                      renderItem={this.renderItem} />
         </View>
    );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 0,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});

