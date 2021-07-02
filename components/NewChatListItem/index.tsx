import React from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";

import classes from './style';
import firebase from "firebase";
import { db } from "../../firebase";

const chatListItem = (props: any) => {

    const onClick = (reciever, sender) => {
    
        const id = (reciever > sender) ? (sender + '___' + reciever) : (reciever + '___' + sender);

        if(props.userChats.indexOf(id)==-1){
            db.collection('users').doc(sender).update({
                chats: firebase.firestore.FieldValue.arrayUnion({ chatID: id, displayName: props.displayName, reciever: reciever, photoUrl: props.photoUrl, timestamp: { seconds: Date.now() }, last: "" })
            });
            db.collection('users').doc(reciever).update({
                chats: firebase.firestore.FieldValue.arrayUnion({ chatID: id, displayName: props.user.displayName, reciever: sender, photoUrl: props.user.photoUrl, timestamp: { seconds: Date.now() }, last: "" })
            });
        }
        
        navigation.navigate('ChatRoom',{
                                            chatID: id, 
                                            photoUrl: props.photoUrl, 
                                            displayName: props.displayName, 
                                            reciever: reciever
                                        });
    }
    
    const navigation = useNavigation();
    
    return (
        <TouchableWithoutFeedback onPress = {() => onClick(props.id, props.user.uid)}>
            <View style={classes.chat_list_item}>
                <Image source={{ uri: props.photoUrl || "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"}} style = {classes.avatar} />
                <View style={classes.chat_right}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{props.displayName}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default chatListItem;