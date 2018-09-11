import React from 'react';
import { AsyncStorage, Alert } from 'react-native';
import Home from './components/Home'
import NewUser from './components/newUser'
import NewTrip from './components/newTrip'
import PastTrip from './components/pastTrip'
import Profile from './components/profile'

Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP);

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            splash: false,
            home: true,
            newTrip: false,
            pastTrip: false,
            profile: false,
            tos: false
        };

        // Only Called Once
        this.passBack = this.passBack.bind(this);

        // Navigation Functions
        this.setHome = this.setHome.bind(this);
        this.setNewTrip = this.setNewTrip.bind(this);
        this.setPastTrip = this.setPastTrip.bind(this);
        this.setProfile = this.setProfile.bind(this);

    }

    componentWillMount() {
        // See if there is user data
        this._retrieveName();
    }

    _retrieveName = async () => {
        try {
            const value = await AsyncStorage.getItem('@ShopAssist:tos');

            console.log(value);

            if (value === null) {
                this.setState({
                    splash: true
                });
            }
        } catch (error) {
            // Error retrieving data
            Alert.alert("Error Retrieving Name")
        }
    };

    passBack() {
        this.setState({
            splash: false,
            home: true,
            newTrip: false,
            pastTrip: false,
            profile: false
        });
    }

    setHome() {
        this.setState({
            splash: false,
            home: true,
            newTrip: false,
            pastTrip: false,
            profile: false
        })
    }

    setNewTrip() {
        this.setState({
            splash: false,
            home: false,
            newTrip: true,
            pastTrip: false,
            profile: false
        })
    }

    setPastTrip() {
        this.setState({
            splash: false,
            home: false,
            newTrip: false,
            pastTrip: true,
            profile: false
        })
    }

    setProfile() {
        this.setState({
            splash: false,
            home: false,
            newTrip: false,
            pastTrip: false,
            profile: true
        })
    }

    // Initial Screen: User Inputs Name
    // Four main states: Home, New Trip, Past Trip, & Profile
      render() {
          // return (
          //     <Profile setHome={this.setHome} />
          // );
        if(this.state.splash) {
            return (
                <NewUser passBack={this.passBack} />
            )
        } else if(this.state.newTrip) {
            return (
                <NewTrip setHome={this.setHome} />
            )
        } else if(this.state.pastTrip) {
            return (
                <PastTrip setHome={this.setHome} />
            )
        } else if(this.state.profile) {
            return (
                <Profile setHome={this.setHome}/>
            )
        } else {
            return (
                <Home setNewTrip={this.setNewTrip}
                      setPastTrip={this.setPastTrip}
                      setProfile={this.setProfile} />
            )
        }
      }
}
