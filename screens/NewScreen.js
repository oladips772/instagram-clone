import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import AddNewPost from '../components/newpost/AddNewPost';

const NewScreen = ({navigation}) => {
    return (
        <SafeAreaView style={{backgroundColor: 'black', flex:1,}}>
            <AddNewPost navigation={navigation}/>
        </SafeAreaView>
    )
}

export default NewScreen;

const styles = StyleSheet.create({})
