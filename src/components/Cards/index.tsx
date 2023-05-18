import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

import Card, { CARD_MARGIN, CARD_WIDTH } from './Card';
import { useEffect, useRef } from 'react';

const { width: screenWidth } = Dimensions.get('window');

// Short list (odd)
const CARDS = ['red', 'green', 'blue', 'purple', 'orange'];
// Long list (even)
// const CARDS = ['gold', 'hotpink', 'grey', 'black','red', 'green', 'blue', 'yellow', 'orange', 'purple', 'pink', 'brown'];


const Cards = () => {
    const cards = ['transparent', ...CARDS, 'transparent'];

    const scrollViewRef = useRef<Animated.ScrollView>(null);

    const translateX = useSharedValue(0);

    useEffect(() => {
        const startPos = (cards.length * (CARD_WIDTH + 2 * CARD_MARGIN)) / 2 - screenWidth / 2;
        // Need this to run after Scrollview's layout animation
        // onLayout prop doesn't work since this is using a ref
        setTimeout(() => {
            scrollViewRef?.current?.scrollTo({
                x: startPos,
                animated: true,
            });
        }, 0);
    }, [scrollViewRef])

    const scrollHandler = useAnimatedScrollHandler((event) => {
        translateX.value = event.contentOffset.x;
    });
    
    return (
        <View style={styles.container}>
            <Animated.ScrollView ref={scrollViewRef}
                horizontal
                scrollEventThrottle ={ 16 /* 60 FPS (1/60 ~= 16 ms)*/ }
                onScroll            ={ scrollHandler }
                contentContainerStyle={{
                    flexGrow        : 1,
                    alignItems      : 'center',
                    justifyContent  : 'center',
                }}
                showsHorizontalScrollIndicator={ false }
            >
                { cards.map(( color, index ) => (
                    <Card key={index.toString() /* TODO: Better index */}
                        color       ={ color }
                        index       ={ index }
                        translateX  ={ translateX }
                    />
                ))}
            </Animated.ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        height: 300,
        width: '100%',
    },
});

export default Cards;
