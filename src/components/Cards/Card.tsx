import { Text, View, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';


const HEIGHT = 210;
const WIDTH = 150;


interface CardProps {
    color: string | number,
    index: number,
    translateX: Animated.SharedValue<number>,
}

const Card = ({ index }: CardProps) => {
    return (
        <Animated.View key={index}
            style       ={ styles.card }
        >
            <Text>{ index }</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    card: {
        height: HEIGHT,
        width: WIDTH,
        backgroundColor: 'red',
        marginHorizontal: 10,
    }
});

export default Card;