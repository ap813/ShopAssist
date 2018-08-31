import React, {Component} from 'react';
import {
    Text,
    TextInput,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

class NewTrip extends Component {
    constructor(props) {
        super(props);

        this.state = {
            place: '',
            budget: ''
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.boxContainer}>
                    <View style={styles.box}>
                        <Text style={styles.questionText}>What's your budget?</Text>
                    </View>
                    <View style={styles.box}>
                        <TextInput  style={styles.answerText}
                                    placeholder={'50.00'}
                                    onChangeText={(budget) => this.setState({budget})}
                                    value={this.state.budget}
                                    keyboardType={'numeric'}/>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.questionText}>Where are you going?</Text>
                    </View>
                    <View style={styles.box}>
                        <TextInput  style={styles.answerText}
                                    placeholder={'Grocery Store, Supermarket, etc.'}
                                    onChangeText={(place) => this.setState({place})}
                                    value={this.state.place}/>
                    </View>
                    <TouchableOpacity style={styles.buttonBox}>
                        <Text style={styles.buttonText}>Go!</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.props.setHome} style={styles.wrongButtonBox}>
                        <Text style={styles.wrongButtonText}>Back to Home</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#B7EBEB',
        flex: 1
    },
    boxContainer: {
      marginTop: 10
    },
    box: {
        marginHorizontal: 20,
        marginVertical: 15,
        backgroundColor: '#E8F9F9',
        borderBottomWidth: 4,
        borderBottomColor: '#339C9C'
    },
    questionText: {
        fontSize: 24,
        color: '#339C9C',
        textAlign: 'center',
        paddingVertical: 20
    },
    answerText: {
        fontSize: 20,
        color: '#339C9C',
        paddingVertical: 22,
        paddingHorizontal: 20
    },
    buttonBox: {
        marginHorizontal: 20,
        marginVertical: 15,
        backgroundColor: '#E8F9F9',
        borderWidth: 4,
        borderColor: '#339C9C'
    },
    buttonText: {
        fontSize: 24,
        color: '#339C9C',
        textAlign: 'center',
        paddingVertical: 20
    },
    wrongButtonBox: {
        marginHorizontal: 20,
        marginVertical: 15,
        backgroundColor: '#339C9C',
        borderWidth: 4,
        borderColor: '#E8F9F9'
    },
    wrongButtonText: {
        fontSize: 24,
        color: '#E8F9F9',
        textAlign: 'center',
        paddingVertical: 20
    }
})

export default NewTrip;