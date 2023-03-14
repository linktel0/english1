import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
  } from "react";
  import {api,youtube} from "../services/api";
  import Lesson from "./types";

interface ProviderProps {
    children: ReactNode;
}
  
interface LessonContextData {
    lessons: Lesson[];
    addLesson: (url: string) => Promise<void>;
    getLesson: (LessonId: number) => Promise<Lesson|null>;
    removeLesson: (LessonId: number) => void;
    updateLessonWords: ( lesson: Lesson) => void;
}

const LessonContext = createContext<LessonContextData>({} as LessonContextData);

export function LessonProvider({ children }: ProviderProps): JSX.Element {
    const [update,setUpdate] = useState(0);
    const [lessons, setLessons] = useState<Lesson[]>([])
    const [lesson, setLesson] = useState(null)


    useEffect(()=>{
        const getAllEnglishLessons = async()=>{
            const response = await api.get<Lesson[]>('/lessons');
            if (response.data) setLessons(response.data);
        }

        getAllEnglishLessons();
    },[update])

  
    const getLesson = async (LessonId:number):Promise<Lesson|null> => {
      let retn:Lesson|null = null
      await api.get<Lesson>('/lessons/'+ LessonId)
        .then(response => {retn = response.data})
      return retn
    };

    const addLesson = async (vid:string) => {
        try {
            const url = 'https://noembed.com/embed?url=https://www.youtube.com/watch?v=' + vid;
            let response = await youtube.get(url);
            if (response.data.title){
                const lesson = {'vid':vid,'title':response.data.title,'words':[]}
                response = await api.post('/lessons',lesson);
                setUpdate(update+1);
            }
        }
        catch(error){
            alert(error);
        }
    };

    const removeLesson = async(LessonId: number) => {
      try {
        const response = await api.delete('/lessons/'+LessonId);
        setUpdate(update+1);
      }
      catch (error){
        alert(error);
      }
    };
    
    const updateLessonWords = async (lesson: Lesson) => {
      try {
        const response = await api.put('/lessons/'+lesson.id,lesson);
      }
      catch (error){
        alert(error);
      }
    };

    return (
      <LessonContext.Provider
        value={{ lessons, getLesson ,addLesson, removeLesson, updateLessonWords }}
      >
        {children}
      </LessonContext.Provider>
      );
    }

export function useLesson(): LessonContextData {
    const context = useContext(LessonContext);
    return context;
}