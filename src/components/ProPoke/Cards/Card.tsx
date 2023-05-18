import { StyleSheet, Dimensions, Pressable, Text } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

import { onMobile } from 'src/utils';


const CARD_HEIGHT           = 140;
export const CARD_WIDTH     = 100;
export const CARD_MARGIN    = 15;
const WEB_SCALE             = 1.3;
const MOBILE_SCALE          = 1.4;


interface CardProps {
    color: string | number,
    index: number,
    translateX: Animated.SharedValue<number>,
}

const { width: screenWidth } = Dimensions.get('window');

const Card = ({ index, translateX, color }: CardProps) => {
    // Placeholder Card for padding and so first and last cards be focused on mobile scrolling
    if (color === 'transparent')
        return <Animated.View style={styles.cardPlaceholder} />;

    const webScale = useSharedValue<number>(1);
    const spin = useSharedValue<number>(0);

    const marginOffset = 2 * index * CARD_MARGIN + CARD_MARGIN;

    // Dividing screenWidth by 3 makes more logical sense to me,
    // but trial and error proved 2.8 to yield better results
    const inputRange = [
        (index - 1) * CARD_WIDTH + 20 + marginOffset - screenWidth / 2.8,
        index       * CARD_WIDTH + 20 + marginOffset - screenWidth / 2.8,
        (index + 1) * CARD_WIDTH + 20 + marginOffset - screenWidth / 2.8,
    ];

    const rMobileStyle = !onMobile()
        ? {}
        : useAnimatedStyle(() => {
            const mobileScale = interpolate(
                translateX.value,
                inputRange,
                [1, MOBILE_SCALE, 1],
                Extrapolate.CLAMP,
            );

            return {
                transform: [
                    { scale: mobileScale }
                ],
            }
        });

    const rWebStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: webScale.value }]
        }
    });

    const rFrontAnimatedStyle = useAnimatedStyle(() => {
        const spinVal = interpolate(spin.value, [0, 1], [0, 180]);
        return {
            transform: [{
                rotateY: withSpring(`${spinVal}deg`)
            }]
        };
    }, []);

    const rBackAnimatedStyle = useAnimatedStyle(() => {
        const spinVal = interpolate(spin.value, [0, 1], [180, 360]);
        return {
            transform: [{
                rotateY: withSpring(`${spinVal}deg`)
            }]
        };
    }, []);

    return (
        <Pressable key={index}
            onHoverIn   ={ () => webScale.value = withSpring(WEB_SCALE) }
            onHoverOut  ={ () => webScale.value = withSpring(1) }
            onPress     ={ () => { spin.value = spin.value ? 0 : 1 } }
        >
            <Animated.View style={[
                styles.cardContainer,
                rMobileStyle,
                rWebStyle,
            ]}>
                <Animated.View style={[
                    styles.card,
                    styles.cardFront,
                    rFrontAnimatedStyle,
                    { backgroundColor: color },
                ]}/>
                <Animated.View style={[
                    styles.card,
                    styles.cardBack,
                    rBackAnimatedStyle,
                ]}>
                    <Text style={styles.cardBacktext}>Fandex</Text>
                </Animated.View>
            </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    cardPlaceholder: {
        marginHorizontal: CARD_MARGIN,
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
    },
    cardContainer: {
        marginHorizontal: CARD_MARGIN,
    },
    card: {
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        borderWidth: 2,
        borderRadius: 15,

        // Shadow on Android
        elevation: 5,

        // Shadow on IOS
        shadowColor: 'black',
        shadowOpacity: 2,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
    },
    cardFront: {
        position: 'absolute',
        borderColor: 'transparent',
        backfaceVisibility: 'hidden',
    },
    cardBack: {
        backgroundColor: '#181818',
        borderColor: '#f1f1f1',
        backfaceVisibility: 'hidden',

        alignItems: 'center',
        justifyContent: 'center',
    },
    cardBacktext: {
        fontSize: 20,
        color: '#f1f1f1',
        textTransform: 'uppercase',
        fontWeight: '700',
    },
});

export default Card;