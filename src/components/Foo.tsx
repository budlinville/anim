import { StyleSheet, View, Text } from 'react-native';

const Foo = () => {
    return (
        <View style={styles.container}>
            <Text>Foo</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent:'center',
    }
});

export default Foo;