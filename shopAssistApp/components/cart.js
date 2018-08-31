import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cart: true,
            budgetColor: '#E8F9F9',
            total: 0
        };

        // Function that change Render
        this.switchCart = this.switchCart.bind(this);

        // Render Functions
        this.renderCart = this.renderCart.bind(this);
        this.renderItem = this.renderItem.bind(this);
    }

    switchCart() {
        this.setState((prevState) => ({
            cart: !prevState.cart
        }))
    }

    componentWillMount() {
        this.checkBudget()
    }

    checkBudget() {

        if(this.state.total/this.props.budget > 1) {
            this.setState({
                budgetColor: '#F1948A'
            })
        } else if(this.state.total/this.props.budget > 0.8) {
            this.setState({
                budgetColor: '#FCF3CF'
            })
        } else {
            this.setState({
                budgetColor: '#E8F9F9'
            })
        }
    }

    renderCart() {
        return (
            <View style={styles.container}>
                <View style={[styles.header, {
                    backgroundColor: this.state.budgetColor,}]}>
                    <TouchableOpacity style={{width: 50, height: 50}} onPress={this.props.back}>
                        <Text style={styles.headerText}>{'<'}</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Current Trip</Text>
                    <TouchableOpacity style={{width: 50, height: 50}}>
                        <Text style={styles.headerText}>+</Text>
                    </TouchableOpacity>
                </View>


            </View>
        )
    }

    renderItem() {
        return (
            <View>

            </View>
        );
    }

    render() {
        return (
           this.state.cart ? this.renderCart() : this.renderItem()
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#B7EBEB',
        flex: 1
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 4,
        borderBottomColor: '#339C9C'
    },
    headerText: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        fontSize: 30,
        color: '#339C9C'
    }
});

export default Cart;