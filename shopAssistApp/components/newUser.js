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

        this.saveTos = this.saveTos.bind(this);
    }

    // Save User's name to AsyncStorage
    saveTos() {

        // Save the Name
        this._storeName();
    }

    _storeName = async () => {
        try {

            const value = JSON.stringify({tos: true})

            await AsyncStorage.setItem('@ShopAssist:tos', value);

            const array = JSON.stringify({trips: []});

            await AsyncStorage.setItem('@ShopAssist:trips', array);

            const tax = 7;
            const taxRate = JSON.stringify({tax: tax});

            await AsyncStorage.setItem('@ShopAssist:tax', taxRate);
            // Pass It Back to With Props
            await this.props.passBack();
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

                    <View>
                        <Text style={styles.tos}>
                            Shop Assist is an app for helping users to find out
                            how much money they will spend whenever they go out.
                            The app does not user any personal data and no information
                            is sent out from the devices. Prices are not guarenteed to
                            be correct, the creator of this app is not responsible for
                            any incorrect prices. By clicking "I Agree" you agree that
                            the above information is correct.
                        </Text>
                    </View>

                    <TouchableOpacity onPress={() => this.saveTos()} style={styles.button}>
                        <Text style={styles.buttonText}>I Agree</Text>
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
    tos: {
        fontSize: 22,
        paddingHorizontal: 20,
        paddingVertical: 10,
        color: '#339C9C',
        textAlign: 'justify'
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