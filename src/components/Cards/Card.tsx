import { Text, View, StyleSheet } from 'react-native';


const HEIGHT = 70;
const WIDTH = 50;


interface CardProps {
    color: string | number,
    index: number,
    translateX: Animated.SharedValue<number>,
}

const Card = (props: CardProps) => {
    return (
        <View style={styles.container}>
            <Text>Card</Text>
        </View>
  );
};

const styles = StyleSheet.create({
    container: {}
});

export default Card;