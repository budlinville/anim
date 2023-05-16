import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import Card from './Card';

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
            { CARDS.map((color, index) => (
                <Card key={index.toString()}
                    color       ={ color }
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
