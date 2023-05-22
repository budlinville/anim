import { View, StyleSheet, ViewStyle } from 'react-native';


interface TableTopProps {
    style: ViewStyle ,
    children: React.ReactNode,
}


const TableTop = ({style, children}: TableTopProps) => {
    return (
        <View style={[styles.container, style]}>
            { children }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        borderWidth: 50,
        borderColor: '#401515',

        // TODO: Does not work on mobile
        boxShadow: 'inset 0 0 25px black',
        backgroundColor: 'darkgreen',
    }
});


export default TableTop;
