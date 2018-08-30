import React from 'react';
import { AsyncStorage } from 'react-native';
import Home from './components/Home'

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            splash: false,
            home: true,
            newTrip: false,
            pastTrip: false,
            profile: false
        }

        // Only used once
        this.unsetSplash = this.unsetSplash.bind(this);

        this.setHome = this.setHome.bind(this);
        this.setNewTrip = this.setNewTrip.bind(this);
        this.setPastTrip = this.setPastTrip.bind(this);
        this.setProfile = this.setProfile.bind(this);

    }

    componentWillMount() {
        // See if there is user data
        
    }

    unsetSplash() {

    }

    setHome() {

    }

    setNewTrip() {

    }

    setPastTrip() {

    }

    setProfile() {

    }

    // Initial Screen: User Inputs Name
    // Four main states: Home, New Trip, Past Trip, & Profile
      render() {
        return (
            <Home />
        );
      }
}
