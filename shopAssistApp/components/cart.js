import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import Item from './item'
import AddItem from './addItem'

class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cart: false,
            budgetColor: '#E8F9F9',
            total: 0,
            items: []
        };

        // Function that change Render
        this.switchCart = this.switchCart.bind(this);

        // Render Functions
        this.renderCart = this.renderCart.bind(this);
        this.renderItem = this.renderItem.bind(this);
    }

    // Switch between Cart Screen and Item Input Screen
    switchCart() {
        this.setState((prevState) => ({
            cart: !prevState.cart
        }))
    }

    componentWillMount() {
        this.checkBudget()
    }

    // Determines the color of the header
    // based on total cost and budget
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

    // The Cart Screen
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

                <ScrollView style={styles.cart}>
                    <Item name={"Sandwich"} price={4}/>
                    <Item name={"Sandwich"} price={4}/>
                    <Item name={"Sandwich"} price={4}/>
                </ScrollView>

                <View>
                    <Text style={{fontSize: 24}}>Cancel</Text>
                </View>
            </View>
        )
    }

    // The Add Item Screen
    renderItem() {
        return (
            <AddItem />
        );
    }

    // Decides what to render
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
    },
    cart: {
        marginHorizontal: 10,
        backgroundColor: '#E8F9F9',
        marginVertical: 10
    }
});

export default Cart;