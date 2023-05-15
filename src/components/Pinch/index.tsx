import { StyleSheet, Image, Dimensions } from 'react-native';

import image from './assets/casino.jpg';
import { PinchGestureHandler, PinchGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';


const AnimatedImage = Animated.createAnimatedComponent(Image);

const { width, height } = Dimensions.get('window');


const Pinch = () => {
    const scale = useSharedValue(1);
    const focalX = useSharedValue(0);
    const focalY = useSharedValue(0);

    const onGestureHandler = useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
        onActive: (e) => {
            scale.value = e.scale;
            focalX.value = e.focalX;
            focalY.value = e.focalY;
        },
        onEnd: () => {
            scale.value = withTiming(1);
        },
    });

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [
                // Apply image translation to the focal point
                { translateX: focalX.value },
                { translateY: focalY.value },
                { translateX: -width / 2 },
                { translateY: -height / 2 },

                // Apply scale
                { scale: scale.value },

                // Reverse the translation
                { translateX: -focalX.value },
                { translateY: -focalY.value },
                { translateX: width / 2 },
                { translateY: height / 2 },
            ]
        };
    });

    const rFocalPointStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: focalX.value },
                { translateY: focalY.value },
            ]
        }
    });

    return (
        <PinchGestureHandler onGestureEvent={ onGestureHandler }>
            <Animated.View style={[{ flex: 1 }]}>
                <AnimatedImage style={[styles.image, rStyle]} source={image}/>
                <Animated.View style={[styles.focalPoint, rFocalPointStyle]}/>
            </Animated.View>
        </PinchGestureHandler>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent:'center',
    },
    focalPoint: {
        // position: 'absolute',
        ...StyleSheet.absoluteFillObject,
        width: 20,
        height: 20,
        backgroundColor: 'blue',
        borderRadius: 10,
    },
    image: {
        flex: 1,
        width: Dimensions.get('window').width,
        // height: 'auto',
        resizeMode:'contain',
    }
});

export default Pinch;
