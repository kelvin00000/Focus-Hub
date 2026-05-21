import { useState, type ReactNode } from "react";
import { StudyModeContext } from "../hooks/useStudyMode";


export function StudyModeProvider({ children }: { children: ReactNode }) {
    const [ personalStudyMode, setPersonalStudyMode ] = useState(false);
    return <StudyModeContext.Provider value={{ personalStudyMode, setPersonalStudyMode }}>{children}</StudyModeContext.Provider>;
}
