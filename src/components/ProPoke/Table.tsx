import { Text, View, StyleSheet } from 'react-native';


const TABLE_SIZE = 1400;
const BORDER_WIDTH = 50;
const PERSPECTIVE = 800;
const ROTATE_X = '40deg';


interface TableProps {}

const Table = (props: TableProps) => {
  return (
    <View style={styles.container}>
        <View style={styles.tableTop}>
            <Text>Table</Text>
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
        justifyContent: 'center',
        alignItems: 'center',

        width: TABLE_SIZE,
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
});
