import { Route, Routes } from 'react-router';
import './App.css';
import MainMenuPage from './pages/MainMenuPage';
import PersonalStudyPage from './pages/PersonalStudyPage';
import GroupCollaborationPage from './pages/GroupCollaborationPage';
import SettingsPage from './pages/settings/SettingsPage';
import AnalyticsPage from './pages/settings/AnalyticsPage';
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';

function App() {
  return (
    <>
        <Routes>
            <Route index element={<MainMenuPage />} />
            <Route path="personalstudy" element={<PersonalStudyPage />} />
            <Route path="groupcollaboration" element={<GroupCollaborationPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="sign-in" element={<SignInPage />} />
            <Route path="sign-up" element={<SignUpPage />} />
        </Routes>
    </>
  )
}

export default App
