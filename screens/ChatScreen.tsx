import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

import ChatListItem from '../components/ChatListItem';
import { db } from '../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

export default function ChatScreen() {
  
  const [chats, setChats] = useState([]);

  const user = useSelector(selectUser);

  useEffect(() => {
    db.collection('users').doc(user.uid).onSnapshot(snapshot => {
      let x = snapshot.data();
      if (x) {
        setChats(x.chats.map(doc => {
          console.log(doc);
          return {
            ...doc
          };
        }))
      }
    })
  }, []);
  
  return (
    <View style={styles.container}>
       <FlatList
          data={chats.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds)}
          renderItem = {({item}) => <ChatListItem {...item} />}
          keyExtractor = {(item) => item.chatID}
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
