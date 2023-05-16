import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';

import image from './assets/casino-felt.jpg';
import Cards from '../Cards';

interface ProPokeProps {}

const ProPoke = (props: ProPokeProps) => {
    return (
        <View style={styles.container}>
            <ImageBackground source={image} style={styles.image}>
                <Cards />
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
    },
});

export default ProPoke;