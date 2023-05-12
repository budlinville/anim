import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring, withRepeat } from 'react-native-reanimated';

const handleRotation = (progress: Animated.SharedValue<number>) => {
    'worklet'  // Worklets are javscript functions that can be read from UI thread
    return `${ progress.value * 2 * Math.PI }rad`;
}

const Basics = () => {
    const progress = useSharedValue(1);
    const scale = useSharedValue(3);

    const reanimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: progress.value,
            borderRadius: progress.value * 100 / 2,
            transform: [
                { scale: scale.value },
                // { rotate: `${ progress.value * 2 * Math.PI }rad`},
                { rotate: handleRotation(progress) },
            ]
        }
    }, []);

    useEffect(() => {
        // could also use something like withTiming(0.5, { duration: 5000 })
        progress.value = withRepeat(withSpring(0.5), -1, true);
        scale.value = withRepeat(
            withSpring(1),  // animation with end value set to 1
            -1,              // number of times to repeat (-1 = infinity)
            true            // reverse=true
        );
    }, [])

    return (
        <View style={styles.container}>
            <Animated.View style={[
                { height: 100, width: 100, backgroundColor: 'blue' },
                reanimatedStyle
            ]}/>
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
});


export default Basics