
import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View, Button, Image, StyleSheet, Alert, TouchableOpacity, PermissionsAndroid } from 'react-native';

import { SafeAreaView } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import {Container, Header, Body, Title, Thumbnail} from 'native-base'

/*
For each of the posts, a flat list will be used. Flat lists
render items lazily. I.E. When they are about to appear and
when they have passed. This saves memory and processing time
over ScrollView
*/


const SpacebookPostData = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Fourth Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Fifth Item',
    },
  ];

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  
  const SpacebookPosts = () => {
    const renderItem = ({ item }) => (
      <Item title={item.title} />
    );
  
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={SpacebookPostData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {

    },
    item: {
      backgroundColor: '#fff',
      borderBottomColor: "black",
      height: 150,
      borderBottomWidth: 1,
      flexDirection:"column",
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });
  
  export default SpacebookPosts;
















