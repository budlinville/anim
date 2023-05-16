import { StyleSheet } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

import Card, { CARD_CONTAINER_PADDING } from './Card';


const CARDS = ['red', 'green', 'blue', 'yellow', 'orange', 'purple', 'pink', 'brown'];


const Cards = () => {
    const translateX = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler((event) => {
        translateX.value = event.contentOffset.x;
    });

    const cards = ['transparent', ...CARDS, 'transparent'];
    
    return (
        <Animated.ScrollView horizontal
            scrollEventThrottle ={ 16 /* 60 FPS (1/60 ~= 16 ms)*/ }
            style               ={ styles.container }
            onScroll            ={ scrollHandler }
            contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
        >
            { cards.map((color, index) => (
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
        position: 'absolute',
        bottom: '5%',
        height: 300,
        paddingHorizontal: CARD_CONTAINER_PADDING,
    }
});

export default Cards;
