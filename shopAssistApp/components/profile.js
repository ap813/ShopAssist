import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Alert,
    TextInput,
    AsyncStorage
} from 'react-native'

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            taxRate: ''
        };

        this.saveTax = this.saveTax.bind(this);
    }

    saveTax() {
        const tax = Number(this.state.taxRate);

        if(tax == NaN || tax == '') {
            return;
        }

        if(tax > 20) {
            Alert.alert("Tax too high");
            return;
        }

        if(tax < 0) {
            Alert.alert("Tax to low");
        }

        this._storeTax();
    }

    _storeTax = async () => {
        try {
            const tax = Number(this.state.taxRate);
            const value = JSON.stringify({tax: tax});
            await AsyncStorage.setItem('@ShopAssist:tax', value);

            this.props.setHome();
        } catch (error) {
            // Error saving data
            Alert.alert("Error Saving Tax");
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerBox}>
                    <Text style={styles.header}>Profile</Text>
                </View>

                <View style={styles.box}>
                    <Text style={styles.questionText}>Tax Rate (%)</Text>
                </View>

                <View style={styles.box}>
                    <TextInput style={styles.answerText}
                               placeholder={'6.5'}
                               onChangeText={(taxRate) => this.setState({taxRate})}
                               value={this.state.taxRate}
                               keyboardType={'numeric'}/>
                </View>

                <TouchableOpacity style={styles.backButtonBox} onPress={() => this.saveTax()}>
                    <Text style={styles.backButtonText}>Submit</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.backButtonBox} onPress={this.props.setHome}>
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#B7EBEB',
        flex: 1
    },
    header: {
        fontSize: 36,
        textAlign: 'center',
        color: '#339C9C',
        paddingHorizontal: 5,
        paddingVertical: 10
    },
    headerBox: {
        marginTop: 60,
        marginBottom: 20,
        marginHorizontal: 20,
        backgroundColor: '#E8F9F9',
        borderBottomWidth: 4,
        borderBottomColor: '#339C9C'
    },
    box: {
        marginHorizontal: 20,
        marginVertical: 10,
        backgroundColor: '#E8F9F9',
        borderBottomWidth: 4,
        borderBottomColor: '#339C9C'
    },
    questionText: {
        fontSize: 20,
        textAlign: 'center',
        padding: 14
    },
    answerText: {
        fontSize: 20,
        textAlign: 'left',
        padding: 20
    },
    backButtonBox: {
        marginHorizontal: 20,
        marginVertical: 15,
        backgroundColor: '#339C9C',
        borderWidth: 4,
        borderColor: '#E8F9F9'
    },
    backButtonText: {
        fontSize: 24,
        color: '#E8F9F9',
        textAlign: 'center',
        paddingVertical: 20
    },
});

export default Profile;