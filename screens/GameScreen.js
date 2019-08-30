import React,{useState, useRef, useEffect} from 'react'
import { StyleSheet, View, Alert,ScrollView } from 'react-native';
import NumberContainer from '../components/NumberContainer'
import BodyText from '../components/BodyText'
import MainButton from '../components/MainButton'
import {Ionicons} from '@expo/vector-icons';
import Card from '../components/Card';
const generatedRandomBetween = (min, max, exclude, test) => {
    console.log('exclude => ', exclude, ' Test => ', test)
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        //return generateRandomBetween.bind(this,min, max, exclude);
        return rndNum + 1
    } else {
        return rndNum;
    }
}
const GameScreen = (props) => {
    let firstGuess = generatedRandomBetween(1, 100, props.userChoice, 'First')
    const [currentGuess, setCurrentGuess] = useState(firstGuess)
    const [rounds, setRounds] = useState(0)
    const [pastGuess, setPastGuess] = useState([firstGuess])
    const currentLow = useRef(1)
    const currentHigh = useRef(100)

    const {userChoice, onGameOver } = props
    useEffect( () => {
        if (currentGuess === userChoice) {
            onGameOver(rounds)
        }
    }, [userChoice, currentGuess, onGameOver])

    const nextGuessHandler = direction => {
        console.log(direction)
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t lie!','You know that this is wrong...',[{text:'Sorry!', style:'cancel'}])
            return
        }
        console.log('currentGuess=> ', currentGuess)
        if (direction === 'lower') {
            currentHigh.current = currentGuess
        }else{
            currentLow.current = currentGuess + 1
        }
        const nextNumber = generatedRandomBetween(currentLow.current, currentHigh.current, currentGuess,'Current')
        setCurrentGuess(nextNumber)
        setRounds(rounds => rounds + 1)
        setPastGuess(curPastGuess => [nextNumber, ...curPastGuess])
        console.log(pastGuess)
    }
    const renderListItems = (value, index) =>{
           return( <View key={index} style={styles.listItems}>
                <BodyText>#{index}</BodyText>
                <BodyText>{value}</BodyText>
            </View>)
    }
    return (
        <View style={styles.screen}>
            <BodyText>Opponent's Guess</BodyText>
            <NumberContainer> {currentGuess} </NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton  onPress={nextGuessHandler.bind(this,'lower') }><Ionicons name="md-remove" size={25} color='white'/></MainButton>
                <MainButton  onPress={ nextGuessHandler.bind(this,'greater') }><Ionicons name="md-add" size={25} color='white'/></MainButton>
            </Card>
            <View style={styles.list}>
                <ScrollView>
                {pastGuess.map( (guess, index) => {
                    return renderListItems(guess, pastGuess.length - index)
                })}
            </ScrollView>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:10,
        alignItems:'center'
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:20,
        width:400,
        maxWidth:'90%'
    },
    list:{
        flex:1,
        width: '80%'
    },
    listItems: {
        flexDirection:'row',
        justifyContent:'space-between',
        borderColor:'black',
        borderWidth:1,
        padding: 15,
        marginVertical:10,
        backgroundColor:'white'

    }
})
export default GameScreen