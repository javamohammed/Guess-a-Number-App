import React, { useState} from 'react'
import { StyleSheet, Text, View, Button, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import Card from '../components/Card'
import Input from '../components/Input'
import Colors from '../instants/Colors'
import NumberContainer from '../components/NumberContainer'
import DefaultStyles from '../instants/default-styles'
import MainButton from '../components/MainButton'
const StartGameScreen = (props) => {
    const [EnteredValue, setEnteredValue] = useState('')
    const [confirmed, SetConfirmed] = useState(false)
    const [SelectedNumber, setSelectedNumber] = useState()
    const restInputHandler = () => {
        setEnteredValue('')
        SetConfirmed(false)
    }
    const numberInputHandler = (inputValue) => {
        setEnteredValue(inputValue.replace(/[^0-9]/g, ''))
    }
    const confirmInputHandler = () => {
        const chooseNumber = parseInt(EnteredValue)
        if (isNaN(chooseNumber)|| chooseNumber <= 0 || chooseNumber > 99){
            Alert.alert('Invalid Number', 'Number has to be a number between 1 and 99', [{text:'Okay', style:'destructive', onPress: restInputHandler}])
            return
        }
        SetConfirmed(true)
        setSelectedNumber(chooseNumber)
        setEnteredValue('')
        Keyboard.dismiss()
    }
    let confirmOutput;
    if (confirmed) {
        confirmOutput = <Card style={styles.summaryContainer}>
            <Text>You selected:</Text>
            <NumberContainer>{SelectedNumber}</NumberContainer>
            <MainButton onPress={()=> { props.onChoiceNumber(SelectedNumber)}} >Start Game</MainButton>
        </Card>
    }
    return (
        <TouchableWithoutFeedback onPress={()=>{
            Keyboard.dismiss()
        }}>
            <View style={styles.screen}>
                <Text style={styles.title} >{props.title}</Text>
                <Card style={styles.inputContainer}>
                    <Text style={{ ...DefaultStyles.text }}>Select a number:</Text>
                    <Input style={styles.input}
                        blurOnSubmit
                        autoCorrect={false}
                        autoCapitalize='none'
                        keyboardType='number-pad'
                        maxLength={2}
                        onChangeText={numberInputHandler}
                        value={EnteredValue}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}><Button title="Reset" onPress={restInputHandler} color={Colors.accent} /></View>
                        <View style={styles.button}><Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary} /></View>
                    </View>
                </Card>
                {confirmOutput}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex:1,
        padding:10,
        alignItems: 'center'
    },
    inputContainer:{
        width: 300,
        maxWidth: '80%',
        alignItems: 'center'
    },
    buttonContainer:{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    title:{
        fontSize:20,
        marginVertical: 10

    },
    button: {
        width: 90

    },
    input:{
        width: 50,
        borderBottomWidth:1,
        borderBottomColor:'black',
        marginBottom:10,
        textAlign:'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
})
export default StartGameScreen