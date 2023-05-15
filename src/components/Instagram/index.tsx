import { useCallback, useRef } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, ImageBackground } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated';
import { TapGestureHandler } from 'react-native-gesture-handler';

import image from './assets/image.jpg';
import heart from './assets/heart.png';


const AnimatedImage = Animated.createAnimatedComponent(Image);

const Instagram = () => {
    const scale = useSharedValue(0);
    const opacity = useSharedValue(1);

    const doubleTapRef = useRef();

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: Math.max(scale.value, 0) }]
        }
    });

    const rTextStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        }
    });

    const onDoubleTap = useCallback(() => {
        scale.value = withSpring(1, undefined, (isFinished) => {
            if (isFinished) {
                scale.value = withDelay(500, withSpring(0));
            }
        });
    }, []);

    const onSingleTap = useCallback(() => {
        opacity.value = withTiming(0, undefined, (isFinished) => {
            if (isFinished) {
                opacity.value = withDelay(500, withSpring(1));
            }
        });
    }, []);

    return (
        <View style={styles.container}>
            <TapGestureHandler
                waitFor={doubleTapRef}
                onActivated={onSingleTap}
            >
                <TapGestureHandler ref={doubleTapRef}
                    maxDelayMs={250}
                    numberOfTaps={2}
                    onActivated={onDoubleTap}
                >
                    <Animated.View>
                        <ImageBackground source={image} style={styles.image}>
                            <AnimatedImage source={heart}
                                style={[
                                    styles.image,
                                    {
                                        shadowOffset: { width: 0, height: 20 },
                                        shadowOpacity: 0.3,
                                        shadowRadius: 35,
                                    },
                                    rStyle
                                ]}
                                resizeMode='center'
                            />
                        </ImageBackground>
                        <Animated.Text style={[styles.turtles, rTextStyle]}>🐢🐢🐢🐢🐢</Animated.Text>
                    </Animated.View>
                </TapGestureHandler>
            </TapGestureHandler>
        </View>
    );
};

const { width: SIZE } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent:'center',
    },
    image: {
        width: SIZE,
        height: SIZE,
    },
    turtles: {
        fontSize: 40,
        textAlign: 'center',
        marginTop: 30,
    }
});

export default Instagram;