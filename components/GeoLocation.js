import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Dimensions, Alert } from 'react-native';
import * as constants from '../constants/constants';
import MapView, {Marker} from 'react-native-maps';
import { db } from '../components/FireBaseManager';
import { useIsFocused } from "@react-navigation/native";

export default function App({ navigation, route }) {
    const { data } = route.params;
    const isFocused = useIsFocused();
    let isFav = false;

    useEffect(() => {
        db.collection('Favorites').get().then((querySnapshot => {
            const arr = [];
            querySnapshot.forEach(documentSnapshot => {
                arr.push(documentSnapshot.data());
            });
            //for (let i = 0; i < arr.length; i++) {
                //console.log(arr[i].title.toString().toLowerCase() + ' <-> ' + data.title.toString().toLowerCase());
                /* if (arr[i].title.toString().toLowerCase() === data.title.toString().toLowerCase()) {
                    isFav = true;
                    break;
                } else {
                    isFav = false;
                    break;
                } */

                // console.log(arr);
                if (arr.some(fav => fav.title.toString().toLowerCase() === data.title.toString().toLowerCase())) {
                    isFav = true;
                } else {
                    isFav = false;
                }
                console.log(isFav);
            //}
        }));
    }, [isFocused]);

    const setFavorite = () => {        
        db.collection('Favorites').add(data).then((doc) => {
            Alert.alert('Geo loaction set as Favorite!');
        }).catch((err) => {
            Alert.alert('Error occured while creating new cache.');
        })
    }

    const removeFavorite = () => {        
       /*  db.collection('Favorites').add(data).then((doc) => {
            Alert.alert('Geo loaction set as Favorite!');
        }).catch((err) => {
            Alert.alert('Error occured while creating new cache.');
        }) */
    }

    const fnAddRemFavorite = () => {
        console.log('isFav -> ' + isFav);
        if (isFav) {
            console.log('REMOVE');
            return <TouchableOpacity style={styles.fav} onPress={removeFavorite}>
                <Text style={styles.favText}>Remove From Favorites</Text>
            </TouchableOpacity>
        } else {
            console.log('ADD');
            return <TouchableOpacity style={styles.fav} onPress={setFavorite}>
                <Text style={styles.favText}>Add To Favorites</Text>
            </TouchableOpacity>
        }
    }

    return (
        <View style={styles.container}>
            <MapView
                style={ styles.map }
                initialRegion={{
                    latitude: data.latitude,
                    longitude: data.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
            >
                <Marker
                    coordinate={{latitude: data.latitude, longitude: data.longitude}}
                    title= {data.title}
                    description= {data.description}
                />
            </MapView>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.desc}>{data.description}</Text>
            {fnAddRemFavorite()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: constants.AppBGColor,
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    map: {
      width: Dimensions.get('window').width,
      height: 400,
    },
    title: {
        color: constants.AppFontColor,
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: 20,
        paddingBottom: 5
    },
    desc: {
        color: constants.AppFontColor,
        fontSize: 14,
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10
    },
    fav: {
        width:"60%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
    },
    favText:{
      color: constants.AppFontColor,
      fontSize: 18,
      fontWeight: 'bold'
    }
  });
