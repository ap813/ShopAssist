import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native'

class AddItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            price: ''
        };

        // Construct object item
        this.makeItem = this.makeItem.bind(this);
    }


    makeItem() {
        let price = Number(this.state.price);

        if(price == NaN || this.state.price == '') {
            return;
        }

        const payload = {name: this.state.name, price: price};

        console.log(payload)
        this.props.add(payload);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={this.props.back}>
                        <Image style={styles.image} source={require('../assets/back.png')} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Add Item</Text>
                    <TouchableOpacity onPress={() => this.makeItem()}>
                        <Image style={styles.imageCheck} source={require('../assets/check.png')} />
                    </TouchableOpacity>
                </View>

                <View style={styles.box}>
                    <Text style={styles.questionText}>What's the name of the product?</Text>
                </View>

                <View style={styles.box}>
                    <TextInput style={styles.answerText}
                               placeholder={'Pizza, Flashlight, etc.'}
                               onChangeText={(name) => this.setState({name})}
                               value={this.state.name} />
                </View>

                <View style={styles.box}>
                    <Text style={styles.questionText}>What's the price of the item?</Text>
                </View>

                <View style={styles.box}>
                    <TextInput style={styles.answerText}
                               placeholder={'8.99'}
                               onChangeText={(price) => this.setState({price})}
                               value={this.state.price}
                    keyboardType={'numeric'}/>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B7EBEB'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 4,
        borderBottomColor: '#339C9C',
        backgroundColor: '#E8F9F9'
    },
    headerText: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        fontSize: 30,
        color: '#339C9C'
    },
    box: {
        marginHorizontal: 20,
        marginVertical: 10,
        backgroundColor: '#E8F9F9',
        borderBottomWidth: 4,
        borderBottomColor: '#339C9C'
    },
    questionText: {
        fontSize: 20,
        textAlign: 'center',
        padding: 14
    },
    answerText: {
        fontSize: 20,
        textAlign: 'left',
        padding: 20
    },
    image: {
        width: 30,
        height: 30,
        marginVertical: 25,
        marginHorizontal: 20
    },
    imageCheck: {
        width: 25,
        height: 25,
        marginVertical: 25,
        marginHorizontal: 20
    }
})

export default AddItem;