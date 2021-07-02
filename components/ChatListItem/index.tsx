import React from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import moment from 'moment';

import classes from './style';

const chatListItem = (props: any) => {

    const onClick = () => {
        navigation.navigate('ChatRoom',{
                                            chatID: props.chatID, 
                                            photoUrl: props.photoUrl, 
                                            displayName: props.displayName, 
                                            reciever: props.reciever
                                        });
    }

    const time = new Date(props.timestamp.seconds);
    
    const navigation = useNavigation();
    
    return (
        <TouchableWithoutFeedback onPress = {onClick}>
            <View style={classes.chat_list_item}>
                <Image source={{ uri: props.photoUrl || "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"}} style = {classes.avatar} />
                <View style={classes.chat_right}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{props.displayName}</Text>
                    <Text style={{ color: '#555', marginTop: 5 }}>{(props.last.length > 25 && props.last.indexOf("\n") == -1) ? props.last.substring(0, 25) + '...' : (props.last.length > 25 || props.last.indexOf("\n")>=0) ? props.last.substring(0, Math.min(25, props.last.indexOf("\n")))+'...' : props.last}</Text>
                </View>
                <View style = {{alignItems: 'flex-end', flex:1}}>
                    <Text style={classes.timestamp}>
                        {(time.getDate() == new Date().getDate()) ? moment(time).format("h:mm A") : moment(time).format("DD/MM/YY h:mm A")}
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default chatListItem;