import React, {useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import * as constants from '../constants/constants';
import * as Location from 'expo-location';
import { db } from '../components/FireBaseManager';
import { useIsFocused } from "@react-navigation/native";

export default function App({ navigation }) {
    const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
    const [displayCurrentAddress, setDisplayCurrentAddress] = useState('Wait, we are fetching you location...');
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const isFocused = useIsFocused();

    useEffect(() => {
        CheckIfLocationEnabled();
    }, [isFocused]);

    const CheckIfLocationEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync();
        if (!enabled) {
            Alert.alert(
                'Location Service not enabled',
                'Please enable your location services to continue',
                [{ text: 'OK' }],
                { cancelable: false }
          );
        } else {
            setLocationServiceEnabled(enabled);
        }
    };

    const GetCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== 'granted') {
            Alert.alert(
                'Permission not granted',
                'Allow the app to use location service.',
                [{ text: 'OK' }],
                { cancelable: false }
              );
        }
        
        let { coords } = await Location.getCurrentPositionAsync();
        
        if (coords) {
            const { latitude, longitude } = coords;
            
            setLat(coords.latitude);
            setLng(coords.longitude);
            /* let response = await Location.reverseGeocodeAsync({ latitude, longitude });
          
            for (let item of response) {
                let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
                setDisplayCurrentAddress(address);
            } */
        }
    };

    const fnClose = () => {
        navigation.navigate('Caches');
    }

    const fnSaveCache = () => {
        const cache = {
            title: title,
            description: desc,
            latitude: parseFloat(lat),
            longitude: parseFloat(lng)
        };
        
        db.collection('Caches').add(cache).then((doc) => {
            Alert.alert('Cache creation complete!');
            navigation.navigate('Caches');
        }).catch((err) => {
            Alert.alert('Error occured while creating new cache.');
        })
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={ fnClose }>
                    <Text style={styles.close}>x</Text>
                </TouchableOpacity>
            )
        })
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Title</Text>
            <TextInput
                style= {styles.inputView}
                placeholder= "This is a title..."
                placeholderTextColor={ constants.AppPlaceholderColor }
                value= { title }
                autoFocus= {true}
                color= {constants.AppFontColor}
                autoFocus={true}
                autoCorrect={false}
                autoCapitalize='none'
                onChangeText={(t) => { setTitle(t) }}
            />
            <Text style= {styles.title2}>Description</Text>
            <TextInput
                style= {styles.inputView}
                placeholder= "This is a description..."
                placeholderTextColor= { constants.AppPlaceholderColor }
                value = { desc }
                color= {constants.AppFontColor}
                onChangeText={(d) => { setDesc(d) }}
            />
            <Text style={styles.title2}>Latitude</Text>
            <TextInput
                style={styles.inputView}
                placeholder="0.00"
                value = { lat.toString() }
                placeholderTextColor={ constants.AppPlaceholderColor }
                color={constants.AppFontColor}
                onChangeText={(lt) => { setLat(lt) }}
            />
            <Text style={styles.title2}>Longitude</Text>
            <TextInput
                style={styles.inputView}
                placeholder="0.00"
                value = { lng.toString() }
                placeholderTextColor={ constants.AppPlaceholderColor }
                color={constants.AppFontColor}
                onChangeText={(ln) => { setLng(ln) }}
            />
            <TouchableOpacity onPress={ GetCurrentLocation } style={styles.btnLocation}>
                <Text style={styles.txtLocation}>Use Current Location</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={ fnSaveCache } style={styles.btnSave}>
                <Text style={styles.txtLocation}>Save</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    padding: 20
  },
  close: {
      color: constants.AppFontColor,
      fontSize: 25,
      paddingRight: 10
  },
  inputView: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: constants.AppFontColor
  },
  title: {
      color: constants.AppFontColor,
      fontSize: 18,
      fontWeight: 'bold',
      paddingBottom: 20
  },
  title2: {
      color: constants.AppFontColor,
      fontSize: 18,
      fontWeight: 'bold',
      paddingTop: 20,
      paddingBottom: 20
  },
  btnLocation:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:5,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10,
    marginLeft: 35
  },
  btnSave:{
    width:"40%",
    backgroundColor:"#fb5b5a",
    borderRadius:5,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
    marginBottom:10,
    marginLeft: 105
  },
  txtLocation: {
    color: constants.AppFontColor,
    fontSize: 18,
    fontWeight: 'bold'
  }
});
