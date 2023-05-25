import { Text, View, StyleSheet } from 'react-native';
import BoardCards from './BoardCards';
import { onMobile } from 'src/utils';
import React from 'react';
import Leaderboard from './Leaderboard';
import ActiveGames from './ActiveGames';
import TableTop from './TableTop';


const TABLE_SIZE = 1750;
const PERSPECTIVE = 1500;
const ROTATE_X = '40deg';
const DESKTOP_WIDTH_RATIO = 1.05;


interface TableProps {}

const Table = ({}: TableProps) => {
    return (
        <View style={styles.container}>
            <TableTop borderColor='#321010'
                outerStyle={styles.tableTopOuter}
                innerStyle={styles.tableTopInner} 
            >
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
            </TableTop>
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
    },
    tableTopOuter: {
        width: TABLE_SIZE * (onMobile() ? 1 : DESKTOP_WIDTH_RATIO),
        height: TABLE_SIZE,
        borderRadius: TABLE_SIZE / 2,
        bottom: -TABLE_SIZE / 20,
        transform: [
            { perspective: PERSPECTIVE },
            { rotateX: ROTATE_X },
        ],
    },
    tableTopInner: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: TABLE_SIZE / 2,
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
