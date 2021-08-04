import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import * as constants from '../constants/constants';
import { db } from '../components/FireBaseManager';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { useIsFocused } from "@react-navigation/native";

export default function App({ navigation, route }) {
    const isFocused = useIsFocused();
    const [cache, setCache] = useState([]);

    const fnAddCache = () => {
        navigation.navigate('Create Cache');
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={ fnAddCache }>
                    <Text style={styles.addBtn}>+</Text>
                </TouchableOpacity>
            ),
            headerLeft: () => null
        })
    }, [navigation]);

    useEffect(() => {
        db.collection('Caches').get().then((querySnapshot => {
            const arr = [];
            querySnapshot.forEach(documentSnapshot => {
                arr.push({ ...documentSnapshot.data(), key: documentSnapshot.id });
            });
            setCache(arr);
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
        <View style={styles.container}>
            <FlatList
                style={styles.flatList}
                data={ cache }
                keyExtractor={item => item.key}
                renderItem={renderItem}
            />
            <TouchableOpacity style={styles.btnFav} onPress={() => { navigation.navigate('Favorites')}}>
                <Text style={styles.favs}>Favorites</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
      height: '100%',
    backgroundColor: '#003f5c'
  },
  flatList: {
    backgroundColor: '#003f5c',
    height: '86%',
    flexGrow: 0
  },
  addBtn: {
      color: constants.AppFontColor,
      fontSize: 25,
      paddingRight: 10
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
  },
  btnFav: {
    width:"40%",
    borderStyle: 'solid',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 20,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:30,
    marginLeft: 122
  },
  favs: {
    color: constants.AppFontColor,
    fontSize: 18,
    fontWeight: 'bold'
  }
});
