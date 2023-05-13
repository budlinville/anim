import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring, withRepeat, useAnimatedGestureHandler } from 'react-native-reanimated';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';

const SIZE = 100;
const CIRCLE_RADIUS = SIZE * 2;


type ContextInterface = {
    translateX: number;
    translateY: number;
}


const PanGesture = () => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const onGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextInterface>({
        onStart: (e, ctx) => {
            ctx.translateX = translateX.value;
            ctx.translateY = translateY.value;
        },
        onActive: (e, ctx) => {
            translateX.value = e.translationX + ctx.translateX;
            translateY.value = e.translationY + ctx.translateY;
        },
        onEnd: () => {
            const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);

            if (distance < CIRCLE_RADIUS + SIZE / 2) {
                translateX.value = withSpring(0);
                translateY.value = withSpring(0);
            }
        },
    });

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value},
                { translateY: translateY.value},
            ]
        }
    })


    return (
        <View style={styles.container}>
            <View style={styles.circle}>
                <PanGestureHandler onGestureEvent={onGesture}>
                    <Animated.View style={[styles.square, rStyle]}/>
                </PanGestureHandler>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    square: {
        height: SIZE,
        width: SIZE,
        backgroundColor: 'rgba(0,0,256,0.5)',
        borderRadius: 20,
    },
    circle: {
        height: CIRCLE_RADIUS * 2,
        width: CIRCLE_RADIUS * 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: CIRCLE_RADIUS,
        borderWidth: 5,
        borderColor: 'rgba(0,0,256,0.5)',
    }
});


export default PanGesture;