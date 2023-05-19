import { Text, View, StyleSheet } from 'react-native';

interface LeaderboardProps {}

const Leaderboard = ({}: LeaderboardProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Leaderboard</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'green',
        fontSize: 30,
        textTransform: 'uppercase',
    }
});

export default Leaderboard;
