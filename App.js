/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ActivityIndicator, Image, Button, Linking } from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});


export default class App extends Component {

    constructor(props){
        super(props);
        this.state ={ 
            isLoading: true
        };
    }

    render() {
        if(this.state.isLoading){
            return(
                <View style= { styles.container }>
                    <ActivityIndicator/>
                </View>
            )
        }

        return (
            <View style= { styles.container }>

                <View style={styles.navBar}>
                    <Text style={styles.navBarButton}></Text>
                    <Text style={styles.navBarHeader}> Papy quotes</Text>
                    <Text style={styles.navBarButton} onPress={() => Linking.openURL('https://github.com/elzinko/papyquotes-mobile')}>?</Text>
                </View>
                <View style={styles.contentImage}>
                    <Image style={styles.image} source={require('./img/papy.png')}/>
                </View>
                <View style={styles.contentQuote}>
                    <Text style={styles.quote}>"{this.state.quote.quote}" </Text>
                </View>
                <View style={styles.tabBar}>
                    <Button
                        onPress={() => {this.getQuoteFromApi()}}
                        title="Quote me again"
                        color='white'
                        fontWeight='bold'
                        style={styles.tabBarButton}
                        accessibilityLabel="Quote me again"
                    />
                </View>
                {/* <Text style = { styles.instructions } > { instructions } </Text> */}
            </View>
        )
    }
    componentWillMount() {
        this.getQuoteFromApi()
    }

    getQuoteFromApi = async () => {
        try {
            let response = await fetch('http://papyquotes-api.herokuapp.com/quote', );
            let responseJson = await response.json()
            console.log(responseJson)
            this.setState({
                    isLoading: false,
                    quote: responseJson,
                }, function(){}
            )
        } catch (error) {
            console.error(error)
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    navBar: {
        flexDirection: 'row',
        paddingTop: 50,
        height: 84,
        backgroundColor: '#1EAAF1'
    },
    navBarButton: {
        color: '#FFFFFF',
        textAlign:'center',
        width: 84
    },
    navBarHeader: {
        flex: 1,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20
    },
    contentImage: {
        flex: 2,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#F5FCFF'
    },
    contentQuote: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#F5FCFF'
    },
    image: {
        // textAlign: 'center'
    },
    quote: {
        fontSize: 20,
        fontStyle: 'italic', 
        textAlign: 'center',
        margin: 20,
        color: '#1EAAF1'
    },
    tabBar: {
        height: 80,
        width: '100%',
        backgroundColor: '#1EAAF1'
    },
    tabBarButton: {
        flex: 1,
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 20
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    }
});