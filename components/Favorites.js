import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import * as constants from '../constants/constants';
import { db } from '../components/FireBaseManager';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { useIsFocused } from "@react-navigation/native";

export default function App({ navigation, route }) {
    const isFocused = useIsFocused();
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        db.collection('Favorites').get().then((querySnapshot => {
            const arr = [];
            querySnapshot.forEach(documentSnapshot => {
                arr.push({ ...documentSnapshot.data(), key: documentSnapshot.id });
            });
            setFavorites(arr);
        }));
    }, [isFocused]);

    const Item = ({ title }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
    
    const renderItem = ({ item }) => (
        <Pressable onPress= { () => {
            navigation.navigate('GeoLocation', {
                data: item,
                routeName: route.name
              })
            }}>
            <Item title={item.title} />
        </Pressable>
    );

    return (
        <FlatList
            style={styles.container}
            data={ favorites }
            keyExtractor={item => item.key}
            renderItem={renderItem}
        />
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#003f5c'
  },
  item: {
      color: constants.AppFontColor,
      marginVertical: 4,
      marginHorizontal: 16,
      backgroundColor: "#fb5b5a",
      height: 50,
      paddingLeft: 10,
      justifyContent: "center"
  },
  title: {
      color: constants.AppFontColor,
      fontSize: 18,
      fontWeight: 'bold'
  }
});
