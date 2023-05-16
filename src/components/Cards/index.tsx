import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

interface CardsProps {}


const CARDS = ['red', 'green', 'blue', 'yellow', 'orange'];


const Cards = (props: CardsProps) => {
    const translateX = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler((event) => {
        translateX.value = event.contentOffset.x;
    });
    
    return (
        <Animated.ScrollView horizontal
            scrollEventThrottle ={ 16 /* 60 FPS (1/60 ~= 16 ms)*/ }
            style               ={ styles.container }
            onScroll            ={ scrollHandler }
        >
            { WORDS.map((word, index) => (
                <Page key={index.toString()}
                    title       ={ word }
                    index       ={ index }
                    translateX  ={ translateX }
                />
            ))}
        </Animated.ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});

export default Cards;
