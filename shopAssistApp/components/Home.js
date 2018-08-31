import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerBox}>
                    <Text style={styles.header}>Shop Assist</Text>
                </View>

                <View style={styles.buttons}>
                    <TouchableOpacity onPress={this.props.setNewTrip}>
                        <Text style={styles.buttonText}>New Trip</Text>
                    </TouchableOpacity>
                    <View style={styles.line}></View>
                    <TouchableOpacity onPress={this.props.setPastTrip}>
                        <Text style={styles.buttonText}>Past Trips</Text>
                    </TouchableOpacity>
                    <View style={styles.line}></View>
                    <TouchableOpacity onPress={this.props.setProfile}>
                        <Text style={styles.buttonText}>Profile</Text>
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
    buttons: {
        marginVertical: 40,
        marginHorizontal: 20,
        backgroundColor: '#E8F9F9',
    },
    buttonText: {
        fontSize: 28,
        color: '#339C9C',
        textAlign: 'center',
        paddingVertical: 40
    },
    line: {
        backgroundColor: '#339C9C',
        marginHorizontal: 0,
        height: 4,
    }
})

export default Home;