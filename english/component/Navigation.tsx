import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { LessonProvider} from '../hooks/useLesson';
import HomeScreen from '../srceen/Home';
import Player from '../srceen/Player';
import Lesson from '../hooks/types'

//import {ApiContext, ApiProvider } from '../contexts/apiContext';
//import Signin from '../views/signin';
//import SignUp from '../views/signup';
//import SignOut from '../views/signout';
//import ConfirmSignUp from '../views/confirmSignUp';
//import ForgotPassword from '../views/forgotPassword';
//import ResetPassword from '../views/resetPassword';
//import Start from '../assets/start.jpg';
//import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  Home: undefined;
  Player: {id:Number} ;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  const linking = {
    prefixes: ['/'],
    config: {
      screens: {
        Home: '',
        Player: {
          path: 'player',
          parse: {
            id: Number,
          },
        },
      },
    },
  };
  return (
  <LessonProvider>
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Player" component={Player} />
      </Stack.Navigator>
    </NavigationContainer>
  </LessonProvider>
  );
}

/*
function CoinApp() {
  const {isLoading,setIsLoading,token,setToken,autoLogin,setAutoLogin,
        email,setEmail,username,setUsername} = useContext(ApiContext);

  React.useEffect(() => {
    setIsLoading(true);
  
    const bootstrap = async () => {
      try {
        const value = await AsyncStorage.getItem('UserInfo')
        if (value !== null) {
          const UserInfo = JSON.parse(value)
          setAutoLogin(UserInfo.autoLogin);
          if (UserInfo.autoLogin && UserInfo.token == UserInfo.token0) {
              setToken(UserInfo.token);
              setEmail(UserInfo.email);
              setUsername(UserInfo.username);
          } 
          setIsLoading(false);
          console.log(value);
        } else {
            const jsonValue = JSON.stringify({'autoLogin':false,'username':'linktel','email':'linktel@163.com','token0':'abscd','token':'abscd'})
            await AsyncStorage.setItem('UserInfo', jsonValue);
            setIsLoading(false);
        }
      } catch (error) {
        console.log('???????0',error);
        setIsLoading(false);
      }  
    }; 

    bootstrap();
    
  }, []);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#265C7E'}}>
         <ImageBackground source={Start} style={{height: '100%',width:'100%'}}/>
      </View>
    )
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} > 
      {token == '' ? 
        <>
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="ConfirmSignUp" component={ConfirmSignUp} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </>
      :
        <Stack.Screen name="SignOut" component={SignOut} />
    }
    </Stack.Navigator>
  );
}

function DrawerHomeCompany() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      drawerStyle={{
        backgroundColor: '#000133',
      }}
      screenOptions={{
        drawerType: 'front',
        drawerPosition: 'right',
        drawerStyle: {width: '100%', marginLeft: '15%'},
        drawerActiveBackgroundColor: '#fff',
        drawerLabelStyle: {
          color: '#265C7E',
          fontSize: 16,
          lineHeight: 22,
          marginLeft: 20,
        },
      }}>
      
      <Drawer.Screen
        options={{headerShown: false}}
        name="Sair"
        component={Login}
      /> 

    </Drawer.Navigator>
  ); 
}*/