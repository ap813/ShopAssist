import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    AsyncStorage,
    Alert
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
            preTax: 0,
            items: []
        };

        // Function that change Render
        this.switchCart = this.switchCart.bind(this);

        // Add item
        this.addItem = this.addItem.bind(this);

        // Remove Item
        this.takeOut = this.takeOut.bind(this);

        // Save the Current Trip
        this.saveTrip = this.saveTrip.bind(this);

        // Render Functions
        this.renderCart = this.renderCart.bind(this);
        this.renderItem = this.renderItem.bind(this);
    }

    componentWillMount() {
        this.checkBudget(this.state.total)
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

        const total = (this.state.preTax + item.price) * 1.07;
        const preTax = this.state.preTax + item.price;

        this.setState({
            items: newItems,
            total: total,
            preTax: preTax,
            cart: true
        });

        this.checkBudget(total);
    }

    // Removes item from items
    takeOut(index, price) {

        const newItems = [...this.state.items];
        newItems.splice(index, 1);

        const total = (this.state.preTax-price) * 1.07;
        const preTax = this.state.preTax - price;

        this.setState({
            items: newItems,
            total,
            preTax
        });

        this.checkBudget(total);
    }

    // Save the Trip
    saveTrip() {
        const trip = JSON.stringify({total: this.state.total, items: this.state.items});

        this._storeTrip(trip);


    }

    _storeTrip = async (trip) => {
        try {
            await AsyncStorage.getItem('@ShopAssist:trips')
                .then((trips) => {
                    if(trips !== null) {
                        trips = [];
                    }
                    trips.unshift(trip);
                    AsyncStorage.setItem('@ShopAssist:trips', trips);
                });
        } catch (error) {
            // Error saving data
            Alert.alert("Error Saving Trip");
        }
    };

    // Determines the color of the header
    // based on total cost and budget
    checkBudget(total) {

        if(total/this.props.budget > 1) {
            this.setState({
                budgetColor: '#F1948A'
            })
        } else if(total/this.props.budget > 0.8) {
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
                                return (
                                    <Item key={i} name={item.name} price={item.price} takeOut={() => this.takeOut(i, item.price)}/>
                                )
                        })
                    }
                </ScrollView>

                <View  style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10}}>
                    <Text style={{fontSize: 24}}>Total: {parseFloat(Math.round(this.state.total * 100) / 100).toFixed(2)}</Text>
                    <Text style={{fontSize: 24}}>Before Tax: {parseFloat(Math.round(this.state.preTax * 100) / 100).toFixed(2)}</Text>
                </View>

                <TouchableOpacity onPress={() => this.saveTrip()} style={styles.box}>
                    <Text style={styles.questionText}>Finished</Text>
                </TouchableOpacity>
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
    },
    box: {
        marginHorizontal: 10,
        marginVertical: 10,
        backgroundColor: '#E8F9F9',
        borderWidth: 4,
        borderColor: '#339C9C'
    },
    questionText: {
        fontSize: 20,
        textAlign: 'center',
        padding: 14
    },
});

export default Cart;