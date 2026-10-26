import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './src/screens/Home';
import Detalhes from './src/screens/Detalhes';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTintColor: '#a74420',
            headerTitleStyle: { fontWeight: 'bold' },
            contentStyle: { backgroundColor: '#faf7f2' },
          }}
        >
          <Stack.Screen name="Home" component={Home} options={{ title: 'Receitas' }} />
          <Stack.Screen name="Detalhes" component={Detalhes} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
