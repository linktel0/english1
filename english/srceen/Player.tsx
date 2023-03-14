import { useState,useCallback, useEffect } from 'react';
import { Text, View,TextInput,TouchableOpacity ,ScrollView} from 'react-native';
import { useLesson  } from '../hooks/useLesson';
import tw from 'twrnc'
import { useDeviceContext } from 'twrnc';
import { Dimensions } from 'react-native';
import Lesson from '../hooks/types'
import {api} from "../services/api";
import type { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import YoutubePlayer from "react-native-youtube-iframe";
import { Paragraph, Dialog, Portal,Button,Avatar,ActivityIndicator, useTheme } from 'react-native-paper';

//import * as ScreenOrientation from 'expo-screen-orientation'

type RootStackParamList = {
    Home: undefined;
    Player: {id:number} ;
  };
  
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Player'>;
type ProfileScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Player'
  >;
  
type Props = {
    route: ProfileScreenRouteProp;
    navigation: ProfileScreenNavigationProp;
 };
  
export default function Player({ route, navigation }: Props) {
    useDeviceContext(tw);
    const { colors } = useTheme();
    const [id0,setId0] = useState(-1)
    const [id,setId] = useState(0)
    const [text,setText] = useState('')
    const [lesson,setLesson] = useState<Lesson|null>(null)
    const {getLesson,removeLesson, updateLessonWords } = useLesson();
    const [visible, setVisible] = useState(false);
    const [playing, setPlaying] = useState(false); 
    const [words,setWords] = useState<string[]>(()=>{
      let words:string[] = []
      for (let i=0;i<200;i++){
        words.push('');
      }
      return words
    })

    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;
    let high = 47*windowWidth/100 

    useEffect(()=>{
      const asyncGetlesson = async(LessonId)=>{
          setLesson(await getLesson(LessonId)); 
      }
      asyncGetlesson(route.params.id)
    },[])         
    
    console.log(lesson);
    if(lesson){
      let temp = [...lesson.words]
      let num=0
      temp.map((word,index0)=>{ 
        temp.map((item,index)=>{
          (item == word)?temp[index]='':0
        })
        word ? words[index0-num] = word : num+=1
      })
    }

    /*
    const [orientationIsLandscape,setOrientation]=useState(true)
    async function changeScreenOrientation(){

        if(orientationIsLandscape==true){
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
        }
        else if(orientationIsLandscape==false){
          ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
        }
      }
      const toggleOrientation=()=>{
        setOrientation(!orientationIsLandscape)
        changeScreenOrientation()
      }*/
     
    
    const onStateChange = useCallback((state:string) => {
      setPlaying(true)
      if (state === "ended") {
        setPlaying(false);
        alert("video has finished playing!");
      }
    }, []);

    const togglePlaying = useCallback(() => {
      setPlaying((prev) => !prev);
    }, []);
    
    const handleSave = () => {
      if(lesson){
        lesson.words = []
        words.map((word,index)=>{if(word.length>0) lesson.words.push(word)})
        updateLessonWords(lesson);
      }
    }

    const handleDownload = (vid) =>{
      console.log(vid)
    }

    const handleDelete = () =>{
      setVisible(false);
      removeLesson(route.params.id)
      navigation.navigate('Home');
    }

    const handleOnblur=async(index,lesson)=>{
      if (text) {
        setText('')
        words[index] = text
        lesson.words = []
        words.map((word,index)=>{if(word.length>0) lesson.words.push(word)})
        await updateLessonWords(lesson);
      }
    }
   
    return(
      <View style={{width:'100%', height:'100%', flexDirection: "row"}}>
        <Portal>
          <Dialog style={tw`p-6 w-60 h-40 items-center m-auto inset-0 absolute`}
            visible={visible} onDismiss={()=>setVisible(false)}>
              
            <Avatar.Icon  size={40} icon="alert"></Avatar.Icon>
            <Dialog.Content>   
              <Paragraph> Delete the lesson?</Paragraph>
            </Dialog.Content>

            <Dialog.Actions>
              <Button onPress={() => setVisible(false)}>Cancel</Button>
              <Button onPress={handleDelete}>Ok</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <View style={tw`w-5/6 left-0`}>
          {lesson?
            <YoutubePlayer
              height={high}
              play={playing}
              videoId={lesson.vid}
              onChangeState={onStateChange}
            /> 
            :
            <ActivityIndicator animating={true} color={colors.primary} 
              style={tw`m-auto inset-0 absolute `}
            />
          }
       </View>
       <View style={{height:'96%'}}>
        <View style={tw`m-2 justify-evenly items-center  flex-row`}>

          <TouchableOpacity style={tw`w-14 border-2 items-center rounded-md border-blue-500`}
            onPress={()=>setVisible(true)}
          >
            <Text>{'Delete'}</Text>
          </TouchableOpacity>
        </View>

       <ScrollView >
         <View style={tw`w-48 flex flex-1 flex-row flex-wrap justify-center `}>
           {words.map((word,index)=>{
            return (
              (index != id || (id==0 && id0-id>1) || id0<id || !words[index])?
                <TextInput key={index}
                  style={tw`w-24 border border-gray-400 self-start`}
                  placeholder={words[index]}
                  onChangeText={(value)=>setText(value)}
                  onFocus={()=>{setId0(id); setId(index)}}
                  onBlur={()=>handleOnblur(index,lesson)}
                />
                :
                <Text key={index}
                style={tw`w-24 border border-gray-400 self-start`}
              > {words[index]}</Text> 
            );
         } )}
          </View>
        </ScrollView>
        </View>
      </View>
    )
}