import * as React from 'react';
import { useCallback, useRef, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Animated, { FadeIn, FadeOut, Layout, ZoomOut } from 'react-native-reanimated';


const LIST_ITEM_COLOR = '#1798DE';

interface Item {
    id: number,
}

interface ListProps {}

const ListAnimations = (props: ListProps) => {
    const initialMode = useRef<boolean>(true);

    React.useEffect(() => {
        initialMode.current = false;
    });

    const [items, setItems] = useState<Item[]>(
        new Array(5).fill(0).map((_, i) => ({ id: i }))
    );

    const onAdd = React.useCallback(() => {
        setItems((currentItems) => {
            const nextItemId = currentItems.length;
            return [ ...currentItems, { id: nextItemId } ]
        });
    }, []);

    const onDelete = useCallback((itemId: number) => {
        setItems( currentItems => currentItems.filter(
            (item) => item.id !== itemId
        ));
    }, [])

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.floatingButton} onPress={onAdd}>
                <Text style={{ color: 'white', fontSize: 40 }}> + </Text>
            </TouchableOpacity>

            <ScrollView style={{ flex: 1 }}
                contentContainerStyle   ={{ paddingVertical: 50 }}
                scrollIndicatorInsets   ={{ right: 1 }}
            >
                { items.map((item, index) => (
                    <Animated.View key={item.id}
                        entering    ={ initialMode.current ? FadeIn.delay(100 * index) : FadeIn }
                        exiting     ={ FadeOut }
                        layout      ={ Layout.delay(50) }
                        onTouchEnd  ={ () => onDelete(item.id) }
                        style       ={ styles.listItem }
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    listItem: {
        height: 100,
        backgroundColor: LIST_ITEM_COLOR,
        width: '90%',
        marginVertical: 10,
        borderRadius: 15,
        alignSelf: 'center',

        // Shadow on Android
        elevation: 5,

        // Shadow on IOS
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
    },
    floatingButton: {
        width: 80,
        aspectRatio: 1,
        backgroundColor: 'black',
        borderRadius: 40,
        position: 'absolute',
        bottom: 50,
        right: '5%',
        zIndex: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default ListAnimations;
