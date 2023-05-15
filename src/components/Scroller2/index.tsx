import { StyleSheet, View, Text } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { cancelAnimation, useAnimatedGestureHandler, useDerivedValue, useSharedValue, withDecay } from 'react-native-reanimated';

import Page, { PAGE_WIDTH } from './Page';

type ContextType = {
    x: number;
}

const titles = ['What\'s', 'up', 'mobile', 'devs?'];

const MIN_TRANSLATE_X = 0;
const MAX_TRANSLATE_X = -PAGE_WIDTH * (titles.length - 1);

const Scroller = () => {
    const translateX = useSharedValue(0);

    const clampedTranslateX = useDerivedValue(() => {
        return Math.max(Math.min(translateX.value, MIN_TRANSLATE_X), MAX_TRANSLATE_X);
    });

    const panGestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
        onStart: (_, ctx) => {
            ctx.x = clampedTranslateX.value;
            cancelAnimation(translateX);  // Stop deceleration animation from useDecay()
        },
        onActive: (e, ctx) => {
            translateX.value = e.translationX + ctx.x;
        },
        onEnd: (e) => {
            translateX.value = withDecay({ velocity: e.velocityX }); // Smooth stops
        },
    });

    return (
        <View style={styles.container}>
            <PanGestureHandler onGestureEvent={panGestureHandler}>
                <Animated.View style={{ flex: 1, flexDirection: 'row' }}>
                    {titles.map((title, index) => (
                        <Page key={index.toString()}
                            index={index}
                            title={title}
                            translateX={clampedTranslateX}
                        />
                    ))}
                </Animated.View>
            </PanGestureHandler>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});

export default Scroller;