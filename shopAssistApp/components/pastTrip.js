import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    AsyncStorage,
    Alert,
    ScrollView,
    TouchableOpacity
} from 'react-native'

class PastTrip extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showAll: true,
            currentTrip: {},
            trips: []
        };

        // Switch between Screens
        this.setSingle = this.setSingle.bind(this);
        this.setAll = this.setAll.bind(this);

        // Renders
        this.renderSingleTrip = this.renderSingleTrip.bind(this);
        this.renderAllTrips = this.renderAllTrips.bind(this);
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

    // Changes what is rendered
    setSingle(trip) {
        this.setState({
            showAll: false,
            currentTrip: trip
        })
    }

    setAll() {
        this.setState({
            showAll: true
        })
    }

    renderSingleTrip() {
        const trip = this.state.currentTrip;

        return(
          <View style={styles.container}>
              <View style={styles.headerBox}>
                  <Text style={styles.header}>{trip.place}</Text>
              </View>

              <View style={styles.box}>
                  <ScrollView>
                      <Text style={{fontSize:22, textAlign: 'center', textDecorationLine: 'underline', paddingTop: 10}}>Items</Text>

                      {
                          trip.items.map((item, index) => {
                              console.log(item);
                              return(
                                  <View key={index} style={styles.item}>
                                    <Text style={{fontSize: 18}}>{item.name}</Text>
                                    <Text style={{fontSize: 18}}>${parseFloat(Math.round(item.price * 100) / 100).toFixed(2)}</Text>
                                  </View>
                              )
                          })
                      }

                  </ScrollView>

                  <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5, marginVertical: 10}}>
                      <Text style={{fontSize: 22}}>Budget: {trip.budget}</Text>
                      <Text style={{fontSize: 22}}>Spent: ${parseFloat(Math.round(trip.total * 100) / 100).toFixed(2)}</Text>
                  </View>
              </View>

              <TouchableOpacity style={styles.backButtonBox} onPress={() => this.setAll()}>
                  <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
          </View>
        );
    }

    renderAllTrips() {
        const trips = this.state.trips;

        return (
            <View style={styles.container}>
                <View style={styles.headerBox}>
                    <Text style={styles.header}>Past Trips</Text>
                </View>

                <ScrollView style={styles.box}>
                    {
                        trips.map((trip,index) => {
                            const single = JSON.parse(trip);
                            console.log(single.total);
                            return(
                                <TouchableOpacity key={index} style={styles.trip} onPress={() => this.setSingle(single)}>
                                    <Text style={{fontSize: 24}}>{single.place}: </Text>
                                    <Text style={{fontSize: 24}}>${parseFloat(Math.round(single.total * 100) / 100).toFixed(2)}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>

                <TouchableOpacity style={styles.backButtonBox} onPress={this.props.setHome}>
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        return(
            this.state.showAll ? this.renderAllTrips() : this.renderSingleTrip()
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
    trip: {
        marginHorizontal: 10,
        marginVertical: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
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
    item: {
        paddingHorizontal: 5,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }

})

export default PastTrip;