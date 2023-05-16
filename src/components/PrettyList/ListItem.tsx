import * as React from 'react';
import { Text, View, StyleSheet, ViewToken } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface ListItemProps {
    viewableItems: Animated.SharedValue<ViewToken[]>,
    item: { id: number },
}

const ListItem = React.memo(({
    item,
    viewableItems
}: ListItemProps) => {
    const rStyle = useAnimatedStyle(() => {
        const isVisible = Boolean( viewableItems.value
            .filter( _item => _item.isViewable )
            .find( viewableItem => viewableItem.item.id === item.id ));
        return {
            opacity: withTiming(isVisible ? 1 : 0),
            transform: [{ scale: withTiming(isVisible ? 1 : 0.6) }],
        }
    }, []);

    return (
        <Animated.View style={[{
            height: 80,
            width: '90%',
            backgroundColor: '#78CAD2',
            marginTop: 20,
            borderRadius: 15,
            alignSelf: 'center',
        }, rStyle ]}/>
    )
});

const styles = StyleSheet.create({
    container: {}
});

export default ListItem;