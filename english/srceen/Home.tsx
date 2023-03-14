import { useState } from 'react';
import { Text, View,Image ,TouchableOpacity ,ScrollView} from 'react-native';
import { useLesson  } from '../hooks/useLesson';
import tw from 'twrnc'
import { useDeviceContext } from 'twrnc';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Lesson from '../hooks/types'
import { TextInput,Button,useTheme } from 'react-native-paper';


type RootStackParamList = {
  Home: undefined;
  Player: {id:number};
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }:Props) => {
  useDeviceContext(tw);
  const { colors } = useTheme();
  const [vid,setVid] = useState('')
  const { lessons,addLesson } = useLesson();

  const onSubmit = () =>{
    addLesson(vid)  
  }

  return (
    
    <View style={tw`flex flex-1 items-center mt-10`}>
        <TextInput style={tw`h-10 w-50 m-2 text-sm`}
          mode="outlined"
          label="Input video id"
          onChangeText={setVid}
          value={vid}  
          right={<TextInput.Icon style={tw`mt-3`}
            name="plus-circle-outline" size={32} color={colors.primary} 
            onPress={onSubmit}
          />}
        />
      <ScrollView >
        <View style={tw`flex flex-row flex-wrap justify-center`}>
          {lessons.map((lesson)=>{
            const url = 'https://i1.ytimg.com/vi/' + lesson.vid +  '/hqdefault.jpg'
            return(
              <TouchableOpacity key={lesson.id}
                onPress={()=>{navigation.navigate('Player',{id:lesson.id})}}
              >
                <View  style={tw`flex flex-col m-2`}>
                  <Image source={{uri:url}} style={tw`h-50 w-90`} />
                  <Text style={tw`w-90 mt-2`}>{lesson.title} </Text>
                </View>
              </TouchableOpacity>
            )})}
        </View>
      </ScrollView>
    </View>
  );
}

export default HomeScreen;