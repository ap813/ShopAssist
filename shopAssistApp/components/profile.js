import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet, TouchableOpacity
} from 'react-native'

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerBox}>
                    <Text style={styles.header}>Profile</Text>
                </View>

                <View style={styles.box}>
                    <View>

                    </View>
                </View>

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
        marginHorizontal: 10,
        marginVertical: 20,
        backgroundColor: '#E8F9F9',
        flex: 1
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