import { useContext, createContext } from "react";

export const StudyModeContext = createContext<{
    personalStudyMode: boolean, setPersonalStudyMode: React.Dispatch<React.SetStateAction<boolean>>
}>({personalStudyMode: false, setPersonalStudyMode: ()=>{}});
export const useStudyMode = () => useContext(StudyModeContext);
