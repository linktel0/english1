import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useLesson  } from '../hooks/useLesson';


export default function App() {
  const { lessons,addLesson, removeLesson} = useLesson();

  return (
    
    <View style={styles.container}>
      
      {lessons.map((lesson)=>(
        <Text key={lesson.id}>{lesson.words} </Text>
      ))}
      
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
