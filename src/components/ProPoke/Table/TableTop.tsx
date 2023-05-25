import { View, StyleSheet, ViewStyle } from 'react-native';

import { RadialGradient } from 'react-native-gradients';


interface TableTopProps {
    innerStyle: ViewStyle,
    outerStyle: ViewStyle,
    children: React.ReactNode,
    borderColor: string,
}


const TableTop = ({ innerStyle, outerStyle, children, borderColor }: TableTopProps) => {

    const colorList = [
        { offset:   '0%',   color: '#007c00',   opacity: '1' },
        { offset:   '70%',  color: '#015A01',   opacity: '1' },
        { offset:   '99%',  color: '#014F01',   opacity: '1' },
        { offset:   '100%', color: '#003E00',   opacity: '1' }
    ];

    return (
        <View style={[ styles.root, outerStyle, { borderColor } ]}>
            <View style={styles.gradient}>
                <RadialGradient colorList={ colorList }
                    // Gross typing but package's prop types are incorrect
                    x           ={ '50%' as unknown as number }
                    y           ={ '60%' as unknown as number }
                    rx          ={ '50%' as unknown as number }
                    ry          ={ '50%' as unknown as number }
                />
            </View>
            <View style={[styles.childrenContainer, innerStyle]}>
                { children }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        borderWidth: 20,
        overflow: 'hidden',
        boxShadow: '0 0 8px 8px #040101',

    },
    gradient: {
        height: '100%',
        width: '100%',
    },
    childrenContainer: {
        zIndex: 10,
        position: 'absolute',
        width: '100%',
        height: '100%',
        boxShadow: 'inset 0 0 50px black',
    }
});


export default TableTop;
