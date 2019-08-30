import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Colors from '../instants/Colors'
const MainButton = (props) =>
   ( <TouchableOpacity activeOpacity={0.8} onPress={props.onPress}>
        <View  style={styles.button} >
            <Text style={styles.buttonText} >{props.children}</Text>
        </View>
    </TouchableOpacity>)

const styles = StyleSheet.create({
    button:{
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal:15,
        borderRadius: 25
    },
    buttonText: {
        color:'white',
        fontSize: 15,
        fontFamily: 'open-sans-bold'
  }
});

export default MainButton;
