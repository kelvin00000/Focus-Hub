import { BotIcon, SendIcon, Paperclip, X, FileText } from "lucide-react";
import { FcGoogle } from "react-icons/fc"
import { useState, useEffect, useRef } from "react"
import { useStudyMode } from "../hooks/useStudyMode";
import Modal from "./Modal";
import { sendGoogleSearchQuery } from "../services/googleSearchBackend";
// import { sendAIDocQuery, sendAISearchQuery } from "../services/geminiSearch";


// type props = {
//     searchMethod: string
//     setSearchMethod: (React.Dispatch<React.SetStateAction<string>>)
//     setInputText: React.Dispatch<React.SetStateAction<string>>
//     handleInputActions: ()=>void
// }


export default function InputBar(){
    const { personalStudyMode } = useStudyMode();
    const [ inputText, setInputText ] = useState("");
    const [ searchMethod, setSearchMethod ] = useState("");
    const [ showNoSearchMethodWarning, setShowNoSearchMethodWarning ] = useState(false);
    const textInputRef = useRef<HTMLInputElement>(null)
    const docUploadInputRef = useRef<HTMLInputElement>(null)
    const [ placeholderText, setPlaceholderText ] = useState('Type a message here');

    useEffect(() => {
        const sampleTexts = ['Upload a document', 'Search for anything', 'Type a message here'];
        let index = 0;
        const interval = setInterval(() => {
            index = (index + 1) % sampleTexts.length;
            setPlaceholderText(sampleTexts[index]);
        }, 15000);
        return () => {
            clearInterval(interval)
        };
    }, []);
    //SEARCH METHOD CLEAR
    function clearSearchMethod(e: React.MouseEvent<HTMLButtonElement>){
        e.stopPropagation();
        setSearchMethod("")
    }


    const handleInputActions = ()=>{
        if(inputText===undefined||inputText==="") return;
        if(personalStudyMode && (searchMethod==="")) {
            setShowNoSearchMethodWarning(true);
            return;
        }
        if(searchMethod==='google') sendGoogleSearchQuery(inputText, personalStudyMode)
            // else if(searchMethod==='ai') sendAISearchQuery(inputText, personalStudyMode);
    }
    const handleDocUpload = ()=>{
        // const file = docUploadInputRef.current?.files?.[0];
        // sendAIDocQuery(file, personalStudyMode)
    }

    return(
        <>
            <div className="fixed bottom-[2%] flex flex-col items-center justify-center p-3.5 w-[97%] h-[110px] bg-bgforeground rounded-[30px] text-[#F5F5F5] lg:h-[100px] lg:w-[40%]">
                <div className="flex items-center justify-between mb-[1%] w-full h-[70%]">
                    <input
                        className="ml-[15px] w-full border-none outline-none" id="input-text" type="text" placeholder={placeholderText}
                        ref={textInputRef}
                        onInput={()=>{
                            setInputText(textInputRef.current?.value||"")
                        }}
                    />
                    {!personalStudyMode?
                        <>
                            <input className="hidden" type="file" id="share-document" />
                            <label className="flex items-center justify-center mr-[2%] p-1.5 rounded-full border border-[#0A1A2F]" htmlFor="share-document">
                                <Paperclip size={20} className="cursor-pointer" />
                            </label>
                        </>
                    :''
                    }
                    <button
                        className="p-2.5 rounded-full border border-gray-800 bg-[#0A1A2F] cursor-pointer"
                        onClick={()=>{ handleInputActions() }}
                    >
                        <SendIcon size={18} color="#F5F5F5" />
                    </button>
                </div>

                <div className="flex items-center gap-[2%] w-full">
                    <div
                    className={searchMethod==='ai'?'hidden': "relative flex items-center justify-center gap-2 p-1.5 h-[32px] w-[90px] border border-[#0A1A2F] rounded-[20px] cursor-pointer"}
                    onClick={() => setSearchMethod('google')}
                    >
                        <FcGoogle className="w-[18px] h-[18px] fill-[#F5F5F5]" />
                        <span className="text-[13px]">Search</span>
                        <button
                            className={searchMethod==='google'?"absolute top-[-25%] right-[-18%] flex items-center justify-center p-1 rounded-full border border-[#0A1A2F] cursor-pointer": 'hidden'}
                            onClick={clearSearchMethod}
                            >
                                <X size={15} color="#F5F5F5" />
                            </button>
                    </div>
                    <div
                    className={searchMethod==='google'?'hidden': "relative flex items-center justify-center gap-2 p-1.5 h-[32px] w-[70px] border border-[#0A1A2F] rounded-[20px] cursor-pointer"}
                    onClick={() => setSearchMethod('ai')}
                    >
                        <BotIcon size={18} color="#F5F5F5" />
                        <span className="text-[13px]">AI</span>
                        <button
                            className={searchMethod==='ai'?"absolute top-[-25%] right-[-18%] flex items-center justify-center p-1 rounded-full border border-[#0A1A2F] cursor-pointer": 'hidden'}
                            onClick={clearSearchMethod}
                            >
                                <X size={15} color="#F5F5F5" />
                        </button>
                    </div>
                    <input
                        className="hidden"
                        type="file"
                        id="upload-document"
                        ref={docUploadInputRef}
                        onInput={()=>{ handleDocUpload() }}
                    />
                        <label className={searchMethod==='google'|| searchMethod==='ai'?'hidden': "flex items-center justify-center gap-2 p-1.5 h-[32px] w-[70px] border border-[#0A1A2F] rounded-[20px] cursor-pointer"}
                            htmlFor="upload-document">
                            <FileText size={17} className="cursor-pointer" />
                            <span className="text-[13px]">doc</span>
                        </label>
                </div>
            </div>


            {showNoSearchMethodWarning && (
                <Modal
                    message="Please set a search method first."
                    isMessageModal={true}
                    setShowModal={setShowNoSearchMethodWarning}
                />
            )}
        </>
    )
}
