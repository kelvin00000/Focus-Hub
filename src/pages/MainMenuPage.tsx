import InputBar from "../components/InputBar";
import Navbar from "../components/Navbar";


export default function MainMenuPage(){
    return(
        <>
            <title>Menu</title>

            <Navbar title={"Navigate"} showMenuButton={true} />

            <section className="flex items-center justify-center w-full h-screen bg-bgdark">
                <InputBar showShareFileButtton={true} />
            </section>
        </>
    )
}
