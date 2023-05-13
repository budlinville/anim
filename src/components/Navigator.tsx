import { Platform } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Basics from './Basics';
import PanGesture from './PanGesture';


const Drawer = createDrawerNavigator();


const Navigator = () => {
		const onMobile = Platform.OS !== 'web';

		return (
				<NavigationContainer>
						<Drawer.Navigator>
								<Drawer.Screen name={'Basics'} component={Basics} />
								<Drawer.Screen name={'Pan Gesture'} component={PanGesture} />
						</Drawer.Navigator>

				</NavigationContainer>
		);
}


export default Navigator;