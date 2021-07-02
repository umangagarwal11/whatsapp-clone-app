import React,{useState} from "react";
import { View, TextInput } from "react-native";
import { useRoute } from "@react-navigation/native"
import classes from './styles';
import { Ionicons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { db } from "../../firebase";
import firebase from "firebase";
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';

const inputBox = () => {

    const route = useRoute();

    const user = useSelector(selectUser);

    const [message, setMessage] = useState('');

    const onClick =() =>{
        const chat = route.params.chatID;
        const chatName = {...route.params};
        if(message.length==0)
            return;

        db.collection('chatMessages/' + chat + '/messages').add({
            sentBy: user.uid,
            message: message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        db.collection('users').doc(user.uid).get().then(doc => {
            var a = doc.data();
            a.chats.every(o => {
                if (o.chatID === chat) {
                    o.timestamp = { seconds: Date.now() };
                    o.last = message;
                    db.doc('users/' + user.uid).update({
                        chats: a.chats
                    })
                    return false;
                }
                return true;
            })
        })
        db.collection('users').doc(chatName.reciever).get().then(doc => {
            var a = doc.data();
            a.chats.every(o => {
                if (o.chatID === chat) {
                    o.timestamp = { seconds: Date.now() };
                    o.last = message;
                    db.doc('users/' + chatName.reciever).update({
                        chats: a.chats
                    })
                    return false;
                }
                return true;
            })
        })
        setMessage('');        
    };

    return (
        <View style={classes.container} >
            <View style={classes.main}>
                <TextInput 
                    style={classes.input} 
                    placeholder="Type a message..." 
                    placeholderTextColor="#555" 
                    multiline
                    value = {message}
                    onChangeText = {setMessage}
                    />
            </View>
            <TouchableWithoutFeedback onPress={onClick}>
                <View style={classes.send}>
                    <Ionicons name="arrow-redo" size={25} color="white"/>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

export default inputBox;