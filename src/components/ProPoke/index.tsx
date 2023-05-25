import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import Cards from './Cards';
import Table from './Table';
import { useState } from 'react';
import Background from './Background';


// FIXME need reanimated update, see https://github.com/software-mansion/react-native-reanimated/issues/3355
if (typeof window !== 'undefined') {
    interface Window { _frameTimestamp: number | null; }
    (window as unknown as Window)._frameTimestamp = null;
}


interface ProPokeProps {}

const ProPoke = ({}: ProPokeProps) => {
    const [cardsInHand, setCardsInHand] = useState<string[]>([]);
    const [cardsOnBoard, setCardsOnBoard] = useState<string[]>([]);

    return (
        <View style={styles.container}>
            <Background />
            <Table />
            <Cards />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
    },
});

export default ProPoke;