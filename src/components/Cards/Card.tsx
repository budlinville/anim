import { StyleSheet, Dimensions } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

import { onMobile } from 'src/utils';


const CARD_HEIGHT           = 210;
export const CARD_WIDTH     = 150;
export const CARD_MARGIN    = 10;


interface CardProps {
    color: string | number,
    index: number,
    translateX: Animated.SharedValue<number>,
}

const { width: screenWidth } = Dimensions.get('window');

const Card = ({ index, translateX, color }: CardProps) => {
    const marginOffset = 2 * index * CARD_MARGIN + CARD_MARGIN;

    // Dividing screenWidth by 3 makes more logical sense to me,
    // but trial and error proved 2.8 to yield better results
    const inputRange = [
        (index - 1) * CARD_WIDTH + 20 + marginOffset - screenWidth / 2.8,
        index       * CARD_WIDTH + 20 + marginOffset - screenWidth / 2.8,
        (index + 1) * CARD_WIDTH + 20 + marginOffset - screenWidth / 2.8,
    ];

    const rStyle = onMobile()
        ? useAnimatedStyle(() => {
            const scale = interpolate(
                translateX.value,
                inputRange,
                [1, 1.2, 1],
                Extrapolate.CLAMP,
            );

            return {
                transform: [{ scale }],
            }
        })
        : {};


    return (
        <Animated.View key={index}
            style={[
                styles.card,
                rStyle,
                { backgroundColor: color}
            ]}
        />
    );
};

const styles = StyleSheet.create({
    card: {
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        marginHorizontal: CARD_MARGIN,
        borderRadius: 15,
    }
});

export default Card;