import React, {useState, useEffect} from "react";
import { ImageBackground, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import ChatMessage from "../components/ChatMessage";
import BG from "../assets/images/bg.png";
import InputBox from "../components/InputBox";
import { db } from "../firebase";


const chatRoomScreen = () => {

    const route = useRoute();

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        db.collection('chatMessages/' + route.params.chatID + '/messages').orderBy('timestamp', 'desc').limit(50).onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => {
                const a = doc.data();
                return (!a.timestamp) ? {
                    id: doc.id,
                    data: { ...a, timestamp: { seconds: Math.floor(Date.now() / 1000) } }
                } : {
                    id: doc.id,
                    data: a
                }
            }))
        })
    }, [route.params.chatID]);

    return (
        <ImageBackground source = {BG} style={{height:'100%', width: '100%'}}>
            <FlatList
                data={messages}
                renderItem = {({ item }) => (<ChatMessage {...item.data}/>)}
                keyExtractor = {(item) => item.id}
                inverted
            />
            <InputBox />
        </ImageBackground>
    )
};

export default chatRoomScreen;