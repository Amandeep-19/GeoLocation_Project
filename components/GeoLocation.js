import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Dimensions } from 'react-native';
import * as constants from '../constants/constants';
import MapView, {Marker} from 'react-native-maps';

export default function App({ navigation, route }) {
    const { data } = route.params;

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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: constants.AppBGColor,
      alignItems: 'center'
    },
    map: {
      width: Dimensions.get('window').width,
      height: 300,
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
        paddingBottom: 5
    }
  });
