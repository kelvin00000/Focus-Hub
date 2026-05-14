import Navbar from "../components/Navbar";
import WorkArea from "../components/WorkArea";
import InputBar from "../components/InputBar";
import { useAuth } from "../hooks/useAuth";
import type { DocumentData } from "firebase/firestore";

type props = {
    userInfo: DocumentData|null|undefined
}

export default function PersonalStudyPage({userInfo}: props){
    useAuth();
    return(
        <>
            <title>Personal Study</title>

            <Navbar userInfo={userInfo} title={"Personal"} showTitle={true} showProfileIcon={true} showMenuButton={true} />

            <section className="flex items-center justify-center w-full h-screen bg-bgdark overflow-hidden">
                <WorkArea />
                <InputBar showShareFileButtton={true} />
            </section>
        </>
    )
}
