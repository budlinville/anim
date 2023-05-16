import * as React from 'react';
import { Text, View, StyleSheet, FlatList, ViewToken } from 'react-native';
import ListItem from './ListItem';
import { useSharedValue } from 'react-native-reanimated';


const data = new Array(50).fill(0).map((_, i) => ({ id: i }));

const PrettyList = () => {
    const viewableItems = useSharedValue<ViewToken[]>([]);

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                contentContainerStyle={{ paddingTop: 40 }}
                onViewableItemsChanged={ ({ viewableItems: vItems }) => {
                    viewableItems.value = vItems;
                }}
                scrollIndicatorInsets   ={{ right: 1 }}
                renderItem={ ({ item }) => <ListItem item={item} viewableItems={viewableItems} /> }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});

export default PrettyList;