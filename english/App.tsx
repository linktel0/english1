import { StatusBar } from 'expo-status-bar';
import Navigation from './component/Navigation';
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <Navigation/> 
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
