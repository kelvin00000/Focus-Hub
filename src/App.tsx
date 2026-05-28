import { Route, Routes, useLocation } from 'react-router';
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import MainMenuPage from './pages/MainMenuPage';
import PersonalStudyPage from './pages/PersonalStudyPage';
import GroupCollaborationPage from './pages/groupCollaboration/GroupCollaborationPage';
import ActiveCollaborationsPage from './pages/groupCollaboration/ActiveCollaborationsPage';
import SettingsPage from './pages/settings/SettingsPage';
import AnalyticsPage from './pages/settings/AnalyticsPage';
import SignUpPage from './pages/auth/SignUpPage';
import './App.css';
import { useUserContext } from './hooks/useUserContext';


function App() {
    const location = useLocation();
    const { userInfo } = useUserContext();
    const [ groupCollaborationPageTitle, setGroupCollaborationPageTitle ] = useState('')
    const [ groupIdValue, setGroupIdValue ] = useState("");


  return (
    <>
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path={userInfo?"/signup":"/"} element={<SignUpPage />} />
                <Route path={userInfo?"/":"/navigate"} element={<MainMenuPage />} />
                <Route path="/personalstudy" element={<PersonalStudyPage />} />
                <Route path="/activecollaborations" element={<ActiveCollaborationsPage setGroupCollaborationPageTitle={setGroupCollaborationPageTitle} setGroupIdValue={setGroupIdValue} />} />
                <Route path="/groupcollaboration" element={<GroupCollaborationPage groupCollaborationPageTitle={groupCollaborationPageTitle} groupIdValue={groupIdValue} />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
            </Routes>
        </AnimatePresence>
    </>
  )
}

export default App
