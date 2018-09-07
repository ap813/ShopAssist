import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet, AsyncStorage, Alert
} from 'react-native'

class PastTrip extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showAll: true,
            currentTrip: {},
            trips: []
        };

        this.switch = this.switch.bind(this);
    }

    componentWillMount() {
        this._retrieveTrips();
    }

    _retrieveTrips = async () => {
        try {
            const value = await AsyncStorage.getItem('@ShopAssist:trips');
            const trips = JSON.parse(value).trips;
            if (value !== null) {
                // There are trips
                this.setState({
                    trips
                })
            }
        } catch (error) {
            Alert.alert("Problem")
        }
    };

    switch() {
        this.setState((prevState) => ({
            showAll: !prevState.showAll
        }))
    }

    render() {
        console.log(this.state.trips);
        return (
            <View style={styles.container}>
                <View style={styles.headerBox}>
                    <Text style={styles.header}>Past Trips</Text>
                </View>

                <View style={styles.box}>

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
    box: {
        marginHorizontal: 10,
        marginVertical: 20,
        backgroundColor: '#E8F9F9'
    }
})

export default PastTrip;