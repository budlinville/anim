import { Text, View, StyleSheet } from 'react-native';
import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';
import { PanGestureHandler, PanGestureHandlerGestureEvent, TapGestureHandler, TapGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { interpolateColor, useAnimatedGestureHandler, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useCallback } from 'react';

interface PickerProps extends LinearGradientProps {
    maxWidth: number;
    onColorChange?: (color: string | number) => void;
}

const clamp = (max: number, min: number, val: number) => {
    'worklet'
    return Math.min(Math.max(val, min), max);
}

const Picker = ({
    colors,
    start,
    end,
    style,
    maxWidth,
    onColorChange,
}: PickerProps) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1);

    const adjustedTranslateX = useDerivedValue(() => {
        return clamp(maxWidth - CIRCLE_PICKER_SIZE, 0, translateX.value);
    });

    const onEnd = useCallback(() => {
        'worklet';
        translateY.value = withSpring(0);
        scale.value = withSpring(1);
    }, []);

    const panGestureEvent = useAnimatedGestureHandler<
        PanGestureHandlerGestureEvent,
        { x: number }
    >({
        onStart: (_, ctx) => {
            ctx.x = adjustedTranslateX.value;
            // No longer needed because of the tap gesture
            // translateY.value = withSpring(-CIRCLE_PICKER_SIZE);
            // scale.value = withSpring(1.2);
        },
        onActive: (e, ctx) => {
            translateX.value = e.translationX + ctx.x;
        },
        onEnd
    });

    const tapGesureEvent = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
        onStart: (e) => {
            translateX.value = withTiming(e.absoluteX - CIRCLE_PICKER_SIZE);
            translateY.value = withSpring(-CIRCLE_PICKER_SIZE);
            scale.value = withSpring(1.2);
        },
        onEnd
    });

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: adjustedTranslateX.value },
                { scale: scale.value },
                { translateY: translateY.value },
            ]
        }
    });

    const rInternalPickerStyle = useAnimatedStyle(() => {
        const inputRange = colors.map((_, i) => (i / colors.length) * maxWidth);
        
        const backgroundColor = interpolateColor(
            translateX.value,
            inputRange,
            colors
        );

        onColorChange?.(backgroundColor);

        return { backgroundColor }
    });


    return (
        <TapGestureHandler onGestureEvent={tapGesureEvent}>
            <Animated.View>
                <PanGestureHandler onGestureEvent={panGestureEvent}>
                    <Animated.View style={{ justifyContent: 'center' }}>
                        <LinearGradient
                            start       ={ start }
                            end         ={ end }
                            colors      ={ colors }
                            style       ={ style }
                        />
                        <Animated.View style={[ styles.picker, rStyle ]}>
                            <Animated.View style={[ styles.internalPicker, rInternalPickerStyle ]}/>
                        </Animated.View>
                    </Animated.View>
                </PanGestureHandler>
            </Animated.View>
        </TapGestureHandler>
    );
};

const CIRCLE_PICKER_SIZE = 45;
const INTERNAL_PICKER_SIZE = CIRCLE_PICKER_SIZE / 2;

const styles = StyleSheet.create({
    picker: {
        position: 'absolute',
        backgroundColor: 'white',
        width: CIRCLE_PICKER_SIZE,
        height: CIRCLE_PICKER_SIZE,
        borderRadius: CIRCLE_PICKER_SIZE / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    internalPicker: {
        width: INTERNAL_PICKER_SIZE,
        height: INTERNAL_PICKER_SIZE,
        borderRadius: INTERNAL_PICKER_SIZE / 2,
        borderWidth: 1.0,
        borderColor: 'rgba(0, 0, 0, 0.2)',
    },
});

export default Picker;
