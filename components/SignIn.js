import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Alert } from 'react-native';
import * as constants from '../constants/constants';
import { db } from '../components/FireBaseManager';
import { useIsFocused } from "@react-navigation/native";

export default function App({ navigation }) {
    const isFocused = useIsFocused();
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [fbUsers, setUsers] = useState([]);
    const [isValidUser, setUserValidation] = useState(false);

    useEffect(() => {
        db.collection('Registeration').onSnapshot(querySnapshot => {
            const arr = [];
            querySnapshot.forEach(documentSnapshot => {
                arr.push({ ...documentSnapshot.data(), key: documentSnapshot.id
                });
            });
            setUsers(arr);
        });
        setEmail('abc@def.com');
        setPwd('12345');
    }, [isFocused]);

    const fnLogin = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(email) === false) {
            Alert.alert('Please enter valid Email!');
            return false;
        } else if (email === '' || pwd === '') {
            Alert.alert('Incorrect Email and Password combination.');
            return false;
        } else {
            const isValid = fbUsers.some(user => {
                return email === user.email && pwd === user.password;
            });
            setUserValidation(isValid);
            if (isValidUser){
                navigation.navigate('Caches');
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>GeoLOC</Text>
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
            <TouchableOpacity style={styles.loginBtn} onPress={fnLogin}>
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('Register')} }>
                <Text style={styles.loginText}>Sign Up</Text>
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
  logo:{
    fontWeight:'bold',
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
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
    borderColor: constants.AppFontColor,
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color: constants.AppFontColor,
    fontSize: 18,
    fontWeight: 'bold'
  }
});
