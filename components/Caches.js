import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import * as constants from '../constants/constants';
import { db } from '../components/FireBaseManager';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { useIsFocused } from "@react-navigation/native";

export default function App({ navigation }) {
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
            )
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
                data: item
              })
            }}>
            <Item title={item.title} />
        </Pressable>
    );

    return (
        <FlatList
            style={styles.container}
            data={ cache }
            keyExtractor={item => item.key}
            renderItem={renderItem}
        />
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#003f5c',
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
  }
});
