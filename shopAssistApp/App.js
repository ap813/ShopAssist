import React from 'react';
import { AsyncStorage } from 'react-native';
import Home from './components/Home'
import NewUser from './components/newUser'
import NewTrip from './components/newTrip'
import PastTrip from './components/pastTrip'
import Profile from './components/profile'

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            splash: false,
            home: true,
            newTrip: false,
            pastTrip: false,
            profile: false,
            name: ''
        }

        // Only Called Once
        this.passBackName = this.passBackName.bind(this);

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
            const value = await AsyncStorage.getItem('@ShopAssist:name');
            if (value !== null) {
                // There is a Name
                console.log(value);
            }
        } catch (error) {
            // Error retrieving data
            console.log('no name');
            this.setState({
                splash: true
            });
        }
    }

    passBackName(name) {
        this.setState({
            splash: false,
            home: true,
            newTrip: false,
            pastTrip: false,
            profile: false,
            name
        })

        // Confirm Name is Received
        console.log(name);
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
          return (
              <NewTrip setHome={this.setHome} />
          )
        if(this.state.splash) {
            return (
                <NewUser passBack={this.passBackName} />
            );
        } else if(this.state.newTrip) {
            return (
                <NewTrip setHome={this.setHome} />
            )
        } else if(this.state.pastTrip) {
            return (
                <PastTrip />
            )
        } else if(this.state.profile) {
            return (
                <Profile />
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
