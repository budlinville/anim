import { StyleSheet } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import Page from './Page';


const WORDS = ['What\'s', 'up', 'mobile', 'devs?'];


const Scroller = () => {
    const translateX = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler((event) => {
        translateX.value = event.contentOffset.x;
    });

    return (
        <Animated.ScrollView horizontal
            pagingEnabled
            scrollEventThrottle ={ 16 /* 60 FPS (1/60 ~= 16 ms)*/ }
            style               ={ styles.container }
            onScroll            ={ scrollHandler }
        >
            { WORDS.map((word, index) => (
                <Page key={index.toString()}
                    title       ={ word }
                    index       ={ index }
                    translateX  ={ translateX }
                />
            ))}
        </Animated.ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});


export default Scroller;