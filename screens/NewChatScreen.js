import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

import NewChatListItem from '../components/NewChatListItem';
import { db } from '../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

export default function NewChatScreen() {
    
    const [users, setUsers] = useState([]);

    const [userChats, setUserChat] = useState([]);

    const user = useSelector(selectUser);

    useEffect(() => {
        db.collection('users').orderBy('displayName').onSnapshot(snapshot => {
            setUsers(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    data: doc.data()
                }                     
            }))
        })
        db.doc("users/"+user.uid).onSnapshot(doc => {
            setUserChat(doc.data().chats.map(o => o.chatID))
        })
    }, [])

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                renderItem={({ item }) => (item.id==user.uid)?null:<NewChatListItem {...item.data} id={item.id} user= {user} userChats={userChats} />}
                keyExtractor={( item ) => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'scroll'
    },

});
