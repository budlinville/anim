import { Platform } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Basics from './Basics';
import PanGesture from './PanGesture';
import Scroller from './Scroller';
import Themes from './Themes';


const Drawer = createDrawerNavigator();


const Navigator = () => {
	return (
		<NavigationContainer>
			<Drawer.Navigator>
				<Drawer.Screen name='Basics'				component={ Basics } />
				<Drawer.Screen name='Pan Gesture'			component={ PanGesture } />
				<Drawer.Screen name='Scroller'				component={ Scroller } />
				<Drawer.Screen name='Themes'	component={ Themes } />
			</Drawer.Navigator>
		</NavigationContainer>
	);
}


export default Navigator;