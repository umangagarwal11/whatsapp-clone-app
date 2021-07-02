import React from "react";
import { View, Text } from "react-native";

import classes from './styles';
import { useSelector } from 'react-redux';
import { selectUser } from "../../features/userSlice";
import moment from "moment";

const chatMessage = (props) => {

    const user = useSelector(selectUser);

    const time = new Date(props.timestamp.seconds * 1000);

    return (props.sentBy === user.uid) ? (
        <View style={{ width: '100%' }}>
            <View style={classes.message_sent}>
                <Text>{props.message}</Text>
                <Text style={classes.message_sent_span}>{(time.getDate() == new Date().getDate()) ? moment(time).format("h:mm A"):moment(time).format("DD/MM/YY h:mm A")}</Text>
            </View>
        </View>
    ) : (
        <View style={{ width: '100%' }}>
            <View style={classes.message_recieved}>
                <Text>{props.message}</Text>
                    <Text style={classes.message_recieved_span}>{(time.getDate() == new Date().getDate()) ? moment(time).format("h:mm A") : moment(time).format("DD/MM/YY h:mm A")}</Text>
            </View>
        </View>
    )
};

export default chatMessage;