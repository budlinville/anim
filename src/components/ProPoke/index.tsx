import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';

import image from './assets/casino-felt.jpg';
import Cards from '../Cards';


// FIXME need reanimated update, see https://github.com/software-mansion/react-native-reanimated/issues/3355
if (typeof window !== 'undefined') {
    interface Window { _frameTimestamp: number | null; }
    (window as unknown as Window)._frameTimestamp = null;
}


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