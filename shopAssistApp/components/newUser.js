import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    AsyncStorage,
    TouchableOpacity,
    Alert
} from 'react-native'

class NewUser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: ''
        }

        this.saveName = this.saveName.bind(this);
    }

    // Save User's name to AsyncStorage
    saveName() {

        // Save the Name
        this._storeName();
    }

    _storeName = async () => {
        try {
            await AsyncStorage.setItem('@ShopAssist:name', this.state.name);
            // Pass It Back to With Props
            this.props.passBack(this.state.name);
        } catch (error) {
            // Error saving data
            Alert.alert("Error Saving Name");
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.welcomeBox}>
                    <Text style={styles.welcomeMessage}>Welcome to Shop Assist</Text>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={styles.question}>What's your name?</Text>
                        <TextInput
                            style={styles.answer}
                            onChangeText={(name) => this.setState({name})}
                            value={this.state.name}
                            placeholder={'Bob'}
                            placeholderTextColor={'#82DCDC'} />
                    </View>

                    <TouchableOpacity onPress={() => this.saveName()} style={styles.button}>
                        <Text style={styles.buttonText}>Ready to Go</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B7EBEB',
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcomeBox: {
        backgroundColor: '#E8F9F9'
    },
    welcomeMessage: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        fontSize: 30,
        textAlign: 'center',
        textDecorationLine: 'underline',
        color: '#339C9C'
    },
    question: {
        fontSize: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
        color: '#339C9C'
    },
    answer: {
        width: 100,
        color: '#339C9C',
        paddingHorizontal: 20,
        paddingVertical: 20,
        fontSize: 20
    },
    button: {
        marginVertical: 20,
    },
    buttonText: {
        fontSize: 20,
        color: '#339C9C',
        textAlign: 'center'
    }
})

export default NewUser;