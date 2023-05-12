import { Platform } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Settings from './Settings';


const Drawer = createDrawerNavigator();


const Navigator = () => {
		const onMobile = Platform.OS !== 'web';

		return (
				<NavigationContainer>
						<Drawer.Navigator>
								<Drawer.Screen name={'Settings'} component={Settings} />
						</Drawer.Navigator>

				</NavigationContainer>
		);
}


export default Navigator;