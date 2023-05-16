import { Text, View, StyleSheet, Dimensions } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';


const HEIGHT = 210;
const WIDTH = 150;
const CARD_MARGIN = 10;
export const CARD_CONTAINER_PADDING = 20;


interface CardProps {
    color: string | number,
    index: number,
    translateX: Animated.SharedValue<number>,
}

const { width: screenWidth } = Dimensions.get('window');

const Card = ({ index, translateX, color }: CardProps) => {
    const offset = 2 * index * CARD_MARGIN + CARD_MARGIN + CARD_CONTAINER_PADDING;

    const inputRange = [
        (index - 1) * WIDTH + 20 + offset - screenWidth / 3,
        index       * WIDTH + 20 + offset - screenWidth / 3,
        (index + 1) * WIDTH + 20 + offset - screenWidth / 3,
    ];

    const rStyle = useAnimatedStyle(() => {
        const scale = interpolate(
            translateX.value,
            inputRange,
            [1, 1.2, 1],
            Extrapolate.CLAMP,
        );

        return {
            transform: [{ scale }],
        }
    });


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
        height: HEIGHT,
        width: WIDTH,
        marginHorizontal: CARD_MARGIN,
        borderRadius: 15,
    }
});

export default Card;