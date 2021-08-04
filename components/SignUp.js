import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Alert } from 'react-native';
import * as constants from '../constants/constants';
import { db } from '../components/FireBaseManager';

export default function App({ navigation, route }) {
    const [email, setEmail] = useState('abc@def.com');
    const [pwd, setPwd] = useState('12345');
    const [cPwd, setCPwd] = useState('12345');
    const [msg, setMsg] = useState('');

    const fnSubmit = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(email) === false) {
            Alert.alert('Please enter valid Email!');
            return false;
        } else if (pwd === '') {
            Alert.alert('Please enter Password.');
            return false;
        } else if (pwd !== cPwd) {
            Alert.alert('Password does not match.');
            return false;
        } else {
            const user = {
                email: email,
                password: pwd
            };
            db.collection('Registeration').add(user).then((doc) => {
                Alert.alert('Registeration complete!');
                setMsg(doc.id);
            }).catch((err) => {
                Alert.alert('Error occured while registering user.');
                setMsg(err);
            });
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.inputView}
                placeholder="Enter Email"
                placeholderTextColor="#ababab"
                autoFocus={true}
                autoCompleteType='email'
                autoCorrect={false}
                autoCapitalize='none'
                color={constants.AppFontColor}
                value= { email }
                onChangeText={(e) => { setEmail(e) }}
            />
            <TextInput
                style={styles.inputView}
                placeholder="Enter Password"
                placeholderTextColor="#ababab"
                secureTextEntry={true}
                color={constants.AppFontColor}
                value= { pwd }
                onChangeText={(p) => { setPwd(p) }}
            />
            <TextInput
                style={styles.inputView}
                placeholder="Confirm Password"
                placeholderTextColor="#ababab"
                secureTextEntry={true}
                color={constants.AppFontColor}
                value= { cPwd }
                onChangeText={(c) => { setCPwd(c) }}
            />
            <TouchableOpacity style={styles.submitBtn} onPress={fnSubmit}>
                <Text style={styles.register}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.AppBGColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView:{
    width:"80%",
    borderStyle:'solid',
    borderWidth: 1,
    borderRadius:15,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:10,
    borderColor: constants.AppFontColor
  },
  submitBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  register:{
    color: constants.AppFontColor,
    fontSize: 18,
    fontWeight: 'bold'
  }
});
