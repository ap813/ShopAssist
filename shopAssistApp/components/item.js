import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native';

class Item extends Component {
    render() {
        return (
            <View style={styles.item}>
                <Text style={{fontSize: 20, marginVertical: 20, color: '#339C9C'}}>{this.props.name}</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 20, marginHorizontal: 10, marginVertical:20, color: '#339C9C'}}>${parseFloat(Math.round(this.props.price * 100) / 100).toFixed(2)}</Text>
                    <TouchableOpacity style={{marginVertical:17}} onPress={this.props.takeOut}>
                        <Image style={styles.image} source={require('../assets/cancel.png')}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10
    },
    image: {
        height: 30,
        width: 30
    }
})

export default Item;