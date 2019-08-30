import React from 'react'
import { StyleSheet, TextInput } from 'react-native';

const Input = (props) => {
    return (
        <TextInput style={{ ...styles.input, ...props.style}} {...props}  />
    )
}


const styles = StyleSheet.create({
   input :{
        height:30,
        borderBottomColor:'gray',
        borderBottomWidth:1,
        marginVertical:10

   }
})
export default Input