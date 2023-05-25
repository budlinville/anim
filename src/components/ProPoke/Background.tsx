import { View, StyleSheet } from 'react-native';


const Background = () => {
    return (
        <View style={styles.container} />
    );
};

export default Background;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: '#b33d3d',
    }
});
