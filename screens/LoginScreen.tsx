import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from '../features/userSlice.js';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

function Login() {

  const user = useSelector(selectUser);
  
  if(user){
    useNavigation().navigate("Root");
  }

  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const dispatch = useDispatch();

  const logintoapp = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, pass)
      .then(userAuth => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            photoUrl: userAuth.user.photoURL
          })
        );
      }).catch(err => alert(err.message));
  }

  const register = (e) => {
    e.preventDefault();
    if (!name) {
      return alert('Name can not be empty');
    }
    auth.createUserWithEmailAndPassword(email, pass)
      .then(userAuth => {

        userAuth.user.updateProfile({
          displayName: name,
          photoURL: url
        })
          .then(() => {
            db.collection('users').doc(userAuth.user.uid).set({
              displayName: userAuth.user.displayName,
              photoUrl: userAuth.user.photoURL,
              chats: []
            });
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: userAuth.user.displayName,
                photoUrl: userAuth.user.photoURL
              })
            );
          });

      })
      .catch(err => alert(err.message));
  }

  return (
    <View style={classes.login}>
      <TextInput style={classes.login_input} textContentType="name" placeholder="Full name(Required if registering)" onChangeText={setName} />
      <TextInput style={classes.login_input} textContentType="URL" placeholder="Profile Picture URL(Optional)" onChangeText={setUrl} />
      <TextInput style={classes.login_input} textContentType="emailAddress" placeholder="Email" onChangeText={setEmail} />
      <TextInput style={classes.login_input} textContentType="password" placeholder="Password" onChangeText={setPass} passwordRules secureTextEntry/>
      <TouchableOpacity onPress={logintoapp} style = {classes.login_button}>
        <Text style={classes.login_button_text}>Login</Text>
      </TouchableOpacity>
      <Text style={classes.login_p}>Not a member? <Text style={classes.login_register} onPress={register}>Register Now</Text></Text>
    </View>
  );
}

const classes = StyleSheet.create({
  login:{
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center'
    },

  login_input: {
    width: 350,
    height: 50,
    fontSize: 16,
    paddingLeft: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderBottomColor: "gray",
    borderBottomWidth: 1
  },

  login_button: {
    alignItems: "center",
    justifyContent: "center",
    width: 365,
    height: 50,
    fontSize: 20,
    color: 'white',
    backgroundColor: '#008B8B',
    borderRadius: 5,
  },

  login_button_text:{
    color: 'white',
    fontSize: 24
  },

  login_register: {
    color: '#008B8B',
  },

  login_p: {
    marginTop: '10%',
  },

});


export default Login;
