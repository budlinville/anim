import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Basics from './Basics';
import PanGesture from './PanGesture';
import Scroller from './Scroller';
import Themes from './Themes';
import Foo from './Foo';
import Pinch from './Pinch';
import Instagram from './Instagram';
import Scroller2 from './Scroller2';


const Drawer = createDrawerNavigator();


const Navigator = () => {
	return (
		<NavigationContainer>
			<Drawer.Navigator>
				<Drawer.Screen name='Foo'					component={ Foo } />
				<Drawer.Screen name='Basics'				component={ Basics } />
				<Drawer.Screen name='Pan Gesture'			component={ PanGesture } />
				<Drawer.Screen name='Scroller'				component={ Scroller } />
				<Drawer.Screen name='Themes'				component={ Themes } />
				<Drawer.Screen name='Pinch'					component={ Pinch } options={{ headerShown: false }} />
				<Drawer.Screen name='Instagram'				component={ Instagram } options={{ headerShown: false }}/>
				<Drawer.Screen name='Scroller2'				component={ Scroller2 } />
			</Drawer.Navigator>
		</NavigationContainer>
	);
}


export default Navigator;