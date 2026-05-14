import { doc, getDoc, type DocumentData } from "firebase/firestore";
import { Route, Routes, useLocation } from 'react-router';
import './App.css';
import { useState, useEffect } from "react";
import { user, db} from "./services/authentication";
import { AnimatePresence } from "framer-motion";
import MainMenuPage from './pages/MainMenuPage';
import PersonalStudyPage from './pages/PersonalStudyPage';
import GroupCollaborationPage from './pages/groupCollaboration/GroupCollaborationPage';
import ActiveCollaborationsPage from './pages/groupCollaboration/ActiveCollaborationPage';
import SettingsPage from './pages/settings/SettingsPage';
// import AnalyticsPage from './pages/settings/AnalyticsPage';
import SignUpPage from './pages/auth/SignUpPage';


function App() {
    const [userInfo, setUserInfo] = useState<DocumentData|null>();
    const location = useLocation();
    const [ groupCollaborationPageTitle, setGroupCollaborationPageTitle ] = useState('')

    useEffect(() => {
        const fetchUser = async () => {
            if (user) {
                const userSnap = await getDoc(doc(db, 'users', user.uid));
                if (userSnap.exists()) {
                    setUserInfo(userSnap.data() as DocumentData);
                }
            }
        };
        fetchUser();
    }, [user]);


    const [ activeSessions ] = useState([
        {
            meetingName: "Networking group",
            meetingId: 802848203923, //USE FIRESTORE AUTOID AS DOC ID
            meetingCode: "23hjnj23ht",
            meetingCreator: "Carter",
            memberNo: 13,
            members: [
                { name: "Carter", id: 924839, joined: "12th May 2026" },
                { name: "Maya", id: 9034839, joined: "12th May 2026" },
                { name: "Ethan", id: 4829173, joined: "3rd June 2026" },
                { name: "Sophia", id: 1947265, joined: "21st June 2026" },
                { name: "Noah", id: 8372614, joined: "8th March 2026" },
                { name: "Olivia", id: 5619082, joined: "17th July 2026" },
                { name: "Liam", id: 2754810, joined: "29th May 2026" },
                { name: "Ava", id: 6483721, joined: "14th May 2026" },
                { name: "Daniel", id: 9182736, joined: "6th August 2026" },
                { name: "Chloe", id: 3548192, joined: "25th September 2026" },
                { name: "James", id: 7261548, joined: "11th October 2026" },
                { name: "Isabella", id: 4839201, joined: "2nd November 2026" },
                { name: "Kelvin", id: 6157483, joined: "19th December 2026" }
            ],
            createdAt: "12th May 2026"
        },
        {
            meetingName: "Final Year Project Group",
            meetingId: 82938992,
            meetingCode: "923nskjd",
            meetingCreator: "Maya",
            memberNo: 5,
            members: [
                { name: "Maya", id: 9034839, joined: "12th May 2026" },
                { name: "Ethan", id: 4829173, joined: "3rd May 2026" },
                { name: "Sophia", id: 1947265, joined: "21st June 2026" },
                { name: "Noah", id: 8372614, joined: "8th May 2026" },
                { name: "Kelvin", id: 6157483, joined: "4th April 2026" },
            ],
            createdAt: "4th April 2026"
        },
        {
            meetingName: "Hackathon Group",
            meetingId: 92838208998,
            meetingCode: "jksnd20398",
            meetingCreator: "James",
            memberNo: 3,
            members: [
                { name: "James", id: 7261548, joined: "11th October 2026" },
                { name: "Isabella", id: 4839201, joined: "2nd November 2026" },
                { name: "Kelvin", id: 6157483, joined: "19th December 2026" }
            ],
            createdAt: "19th June 2026"
        }
    ])
    // PLACE MEETING ID STATE HERE AND SET HERE TO TO SHARE TO WORKAREA COMPONET SO IT GENERATES THE MEETING SPEVIFIC CHAT MESSAGES

  return (
    <>
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path={userInfo?"/signup":"/"} element={<SignUpPage userInfo={userInfo} />} />
                <Route path={userInfo?"/":"/navigate"} element={<MainMenuPage userInfo={userInfo} />} />
                <Route path="/personalstudy" element={<PersonalStudyPage userInfo={userInfo} />} />
                <Route path="/groupcollaboration" element={<GroupCollaborationPage userInfo={userInfo} groupCollaborationPageTitle={groupCollaborationPageTitle} />} />
                <Route path="/activecollaborations" element={<ActiveCollaborationsPage userInfo={userInfo} setGroupCollaborationPageTitle={setGroupCollaborationPageTitle} activeSessions={activeSessions} />} />
                <Route path="/settings" element={<SettingsPage userInfo={userInfo} setUserInfo={setUserInfo} />} />
                {/* <Route path="/analytics" element={<AnalyticsPage userInfo={userInfo} />} /> */}
            </Routes>
        </AnimatePresence>
    </>
  )
}

export default App
