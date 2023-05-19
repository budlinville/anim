import { Dimensions, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';


const { width: screenWidth } = Dimensions.get('window');

const CONTAINER_WIDTH   = Math.min(screenWidth * 0.9, 500)
const CONTAINER_HEIGHT  = CONTAINER_WIDTH * 0.6;
const MARGIN_TOP        = 50;
const MARGIN_BOTTOM     = 175;


interface CardProps {
    color: string,
}

const Card = ({ color }: CardProps) => {
    return (
            <Animated.View
                style={[
                    styles.boardCard,
                    { backgroundColor: color },
                ]}
            />
    )
};


interface BoardCardsProps {
    cards: string[],
}

const BoardCards = ({ cards }: BoardCardsProps) => {
    return (
        <Animated.View style={ styles.container }>
            { cards.map( (color) => (
                <Card key={ color } color={ color } />
            )) }
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',

        width: CONTAINER_WIDTH,
        height: CONTAINER_HEIGHT,
        borderWidth: 5,
        borderColor: 'green',
        borderRadius: 50,

        marginTop: MARGIN_TOP,
        marginBottom: MARGIN_BOTTOM,
    },
    boardCard: {
        height: 90,
        width: 60,
        marginHorizontal: 5,
        borderRadius: 8,

        // Shadow on Android
        elevation: 5,

        // Shadow on IOS
        shadowColor: 'black',
        shadowOpacity: 0.75,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
    },
});

export default BoardCards;
