import { Text, View, StyleSheet } from 'react-native';
import BoardCards from './BoardCards';
import { onMobile } from 'src/utils';
import React from 'react';
import Leaderboard from './Leaderboard';
import ActiveGames from './ActiveGames';


const TABLE_SIZE = 1400;
const BORDER_WIDTH = 50;
const PERSPECTIVE = 800;
const ROTATE_X = '40deg';


interface TableProps {}

const Table = ({}: TableProps) => {
  return (
    <View style={styles.container}>
        <View style={styles.tableTop}>
            <View style={styles.tableTopSide}>
                <Leaderboard />
            </View>

            <View style={styles.tableTopCenter}>
                <Text style={styles.title}>ProPoke</Text>
                <Text style={styles.subtext}>A game by Fandex</Text>
                <BoardCards cards={['red', 'orange', 'blue', 'purple', 'yellow']} />
            </View>

            <View style={styles.tableTopSide}>
                <ActiveGames />
            </View>
        </View>
    </View>
  );
};

export default Table;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: '#a51b1b',
    },
    tableTop: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        width: TABLE_SIZE * (onMobile() ? 1 : 1.3),
        height: TABLE_SIZE,

        borderRadius: TABLE_SIZE / 2,
        borderWidth: BORDER_WIDTH,
        borderColor: '#401515',

        // TODO: Does not work on mobile
        boxShadow: 'inset 0 0 25px black',
        backgroundColor: 'darkgreen',

        bottom: -TABLE_SIZE / 20,
        transform: [
            { perspective: PERSPECTIVE },
            { rotateX: ROTATE_X }
        ],
    },
    tableTopSide: {
        height: '30%',
        width: '20%',
        borderWidth: 5,
        borderColor: 'green',
        borderRadius: 50,
    },
    tableTopCenter: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 100,
    },
    title: {
        fontSize: 80,
        color: 'green',
        textTransform: 'uppercase',
        fontWeight: '700',
    },
    subtext: {
        fontSize: 40,
        color: 'green',
        textTransform: 'uppercase',
        fontWeight: '700',
    },
});
