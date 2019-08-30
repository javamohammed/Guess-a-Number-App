import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../instants/Colors'
import DefaultStyles from '../instants/default-styles'
const Header = (props) => {
    return (
        <View style={styles.header}>
            <Text style={{ ...styles.headerTitle, ...DefaultStyles.title }}>{props.title}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitle: {
        color: 'black',
    }
})
export default Header