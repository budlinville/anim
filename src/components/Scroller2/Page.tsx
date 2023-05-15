import { Text, View, StyleSheet, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';


const { width: PAGE_WIDTH } = Dimensions.get('window');
export { PAGE_WIDTH };


interface PageProps {
    index: number,
    title: string,
    translateX: Animated.SharedValue<number>,
}

const Page: React.FC<PageProps> = ({
    index,
    title,
    translateX
}: PageProps) => {
    const pageOffset = PAGE_WIDTH * index;

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value + pageOffset }]
        }
    });

    return (
        <Animated.View style={[
            {
                ...StyleSheet.absoluteFillObject,
                backgroundColor: `rgba(0,0,256,0.${index+2})`,
                alignItems: 'center',
                justifyContent: 'center',
            },
            rStyle,
        ]}>
            <Text style={{
                fontSize: 70,
                fontWeight: '700',
                letterSpacing: 1.5,
                textTransform: 'uppercase'
            }}>
                { title }
            </Text>
        </Animated.View>
    );
};

export default Page;

const styles = StyleSheet.create({});
