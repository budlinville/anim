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
import ColorPicker from './ColorPicker';
import CircularProgress from './CircularProgress';
import List from './List';
import PrettyList from './PrettyList';


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
				<Drawer.Screen name='Color Picker'			component={ ColorPicker } />
				<Drawer.Screen name='Circular Progress'		component={ CircularProgress } options={{ headerShown: false }} />
				<Drawer.Screen name='List'					component={ List } />
				<Drawer.Screen name='Pretty List'			component={ PrettyList } />
			</Drawer.Navigator>
		</NavigationContainer>
	);
}


export default Navigator;