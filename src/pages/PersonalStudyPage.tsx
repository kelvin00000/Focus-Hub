import Navbar from "../components/Navbar";
import WorkArea from "../components/WorkArea";
import InputBar from "../components/InputBar";

export default function PersonalStudyPage(){
    return(
        <>
            <title>Personal Study</title>

            <Navbar title={"Personal"} showTitle={true} showProfileIcon={true} showMenuButton={true} />

            <section className="flex items-center justify-center w-full h-screen bg-bgdark overflow-hidden">
                <WorkArea />
                <InputBar showShareFileButtton={true} />
            </section>
        </>
    )
}
