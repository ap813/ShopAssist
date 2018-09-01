import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView, Image
} from 'react-native'
import Item from './item'
import AddItem from './addItem'

class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cart: true,
            budgetColor: '#E8F9F9',
            total: 0,
            items: []
        };

        // Function that change Render
        this.switchCart = this.switchCart.bind(this);

        // Add item
        this.addItem = this.addItem.bind(this);

        // Render Functions
        this.renderCart = this.renderCart.bind(this);
        this.renderItem = this.renderItem.bind(this);
    }

    componentWillMount() {
        this.checkBudget()
    }

    // Switch between Cart Screen and Item Input Screen
    switchCart() {
        this.setState((prevState) => ({
            cart: !prevState.cart
        }))
    }

    // Add Item to the state
    addItem(item) {

        const newItems = [...this.state.items];
        newItems.unshift(item);

        const total = this.state.total + item.price;

        this.setState({
            items: newItems,
            total: total,
            cart: true
        })
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
        console.log(this.state.total)
        return (
            <View style={styles.container}>
                <View style={[styles.header, {
                    backgroundColor: this.state.budgetColor,}]}>
                    <TouchableOpacity onPress={this.props.back}>
                        <Image style={styles.image} source={require('../assets/back.png')} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Current Trip</Text>
                    <TouchableOpacity onPress={() => this.switchCart()}>
                        <Image style={styles.imageAdd} source={require('../assets/add.png')} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.cart}>
                    {
                        this.state.items.map((item, i) => {
                                console.log(item)
                                return (
                                    <Item key={i} name={item.name} price={item.price} />
                                )
                        })
                    }
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
            <AddItem back={this.switchCart} add={this.addItem} />
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
    },
    image: {
        width: 30,
        height: 30,
        marginVertical: 25,
        marginHorizontal: 20
    },
    imageAdd: {
        width: 25,
        height: 25,
        marginVertical: 25,
        marginHorizontal: 20
    }
});

export default Cart;