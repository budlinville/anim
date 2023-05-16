import { useCallback } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedProps, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { ReText } from 'react-native-redash';


const { width, height } = Dimensions.get('window');

const BACKGROUND_COLOR = '#444B6F';
const BACKGROUND_STROKE_COLOR = '#303858';
const STROKE_COLOR = '#A6E1FA';
const CIRCLE_LENGTH = 1000;
const R = CIRCLE_LENGTH / (2 * Math.PI);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircularProgressProps {};

const CircularProgress = (props: CircularProgressProps) => {
    const progress = useSharedValue(0);

    // Need to use this hook when animating a prop to another component
    const animatedProps = useAnimatedProps(() => {
        return {
            strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
        }
    });

    const progressText = useDerivedValue(() => {
        return `${Math.floor(progress.value * 100)}`
    });

    const buttonText = useDerivedValue(() => {
        return progress.value > 0 ? 'Reset' : 'Run';
    });

    const onPress = useCallback(() => {
        progress.value = withTiming(progress.value > 0 ? 0 : 1, { duration: 2000 })
    }, []);

    return (
        <View style={ styles.container }>
            <ReText style={ styles.progressText } text={ progressText } />
            <Svg style={{ position: 'absolute' }}>
                <Circle
                    cx          ={ width/2 }
                    cy          ={ height/2 }
                    r           ={ R }
                    stroke      ={ BACKGROUND_STROKE_COLOR }
                    strokeWidth ={ 30 }
                />
                <AnimatedCircle
                    cx                  ={ width/2 }
                    cy                  ={ height/2 }
                    r                   ={ R }
                    stroke              ={ STROKE_COLOR }
                    strokeWidth         ={ 15 }
                    strokeDasharray     ={ CIRCLE_LENGTH }
                    animatedProps       ={ animatedProps }
                    strokeLinecap       ={ 'round' }
                />
            </Svg>
            <TouchableOpacity onPress={onPress} style={ styles.button }>
                <ReText style={ styles.buttonText } text={ buttonText } />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
        alignItems: 'center',
        justifyContent:'center',
    },
    progressText: {
        fontSize: 80,
        color: 'rgba(256,256,256,0.7)',
        width: 200,
        textAlign: 'center',
    },
    button: {
        position: 'absolute',
        bottom: 80,
        width: width * 0.7,
        height: 60,
        backgroundColor: BACKGROUND_STROKE_COLOR,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 25,
        color: 'white',
        letterSpacing: 2.0,
    },
});

export default CircularProgress;