import { BotIcon, SendIcon, Paperclip, X, FileText } from "lucide-react";
import { FcGoogle } from "react-icons/fc"
import { useState, useEffect, useRef } from "react"
import { useStudyMode } from "../hooks/useStudyMode";
import Modal from "./Modal";
import { sendGoogleSearchQuery } from "../services/googleSearchBackend";
import type { chatMessagesType } from "../types/messageTypes";
import { fetchChatMessages, saveUserMessage } from "../services/firestore";
import LoadingToast from "./Toasttip";
import { sendAIDocQuery, sendAISearchQuery } from "../services/AISearch";
import { extractDocumentText } from "../utils/extractDocText";



type props = {
    scrollToBottom: ()=>void
    setChatMessages: React.Dispatch<React.SetStateAction<chatMessagesType>>
}

export default function InputBar({ setChatMessages, scrollToBottom }: props){
    const { personalStudyMode } = useStudyMode();
    const [ placeholderText, setPlaceholderText ] = useState('Type a message here');
    const [ inputText, setInputText ] = useState("");
    const [ inputAction, setInputAction ] = useState("");
    const [ showNoSearchMethodWarning, setShowNoSearchMethodWarning ] = useState(false);
    const [ showSendErrorModal, setShowSendErrorModal ] = useState(false);
    const [ showSearchLoadingToast, setShowSearchLoadingToast ] = useState(false);
    const [ showEmptyQueryModal, setShowEmptyQueryModal ] = useState(false);
    const [ showDocUploadResponseLoadingToast, setShowDocUploadResponseLoadingToast ] = useState(false);
    const textInputRef = useRef<HTMLInputElement>(null)
    const docUploadInputRef = useRef<HTMLInputElement>(null)

    const sampleTexts = ['Upload a document', 'Search for anything', 'Type a message here'];
    useEffect(() => {
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
    function clearInputAction(e: React.MouseEvent<HTMLButtonElement>){
        e.stopPropagation();
        setInputAction("")
    }


    const handleInputActions = async ()=>{
        if(inputText===undefined||inputText==="") return;
        if(personalStudyMode && (inputAction==="")) {
            setShowNoSearchMethodWarning(true);
            return;
        }
        textInputRef.current!.value = ""
        scrollToBottom();

        try{
            if(inputAction==='google'||inputAction==='ai'){
                setShowSearchLoadingToast(true);
                await saveUserMessage(inputText, personalStudyMode);
                const messages = await fetchChatMessages(personalStudyMode)
                if(!messages) return;
                setChatMessages(messages)
            }
            if(inputAction==='google') await sendGoogleSearchQuery(inputText, personalStudyMode);
            else if(inputAction==='ai') await sendAISearchQuery(inputText, personalStudyMode);
            scrollToBottom()
            if(inputAction==='doc upload') await handleDocUpload();

            const messages = await fetchChatMessages(personalStudyMode)
            if(!messages) return;
            setChatMessages(messages)
            setShowSearchLoadingToast(false);
            setShowDocUploadResponseLoadingToast(false);
            scrollToBottom();
        }
        catch(err){
            console.error(err);
            setShowSendErrorModal(true);
        }
    }
    const handleDocUpload = async () => {
        if(!inputText){
            setShowEmptyQueryModal(true);
            return;
        }
        const file = docUploadInputRef.current?.files?.[0];
        if (!file && !inputText) return;
        setShowDocUploadResponseLoadingToast(true);

        try {
            const convertedText = await extractDocumentText(file!)
            await sendAIDocQuery(convertedText, inputText, personalStudyMode)
        }
        catch (err) {
            console.error(err);
            setShowDocUploadResponseLoadingToast(true);
            setShowSendErrorModal(true)
        }
    };

    return(
        <>
            <div className="fixed bottom-[2%] flex flex-col items-center justify-center p-3.5 w-[97%] h-[110px] bg-bgforeground rounded-[30px] text-[#F5F5F5] lg:h-[100px] lg:w-[40%]">
                <div className="flex items-center justify-between mb-[1%] w-full h-[70%]">
                    <input
                        className="ml-[15px] w-full border-none outline-none focus:outline-none focus:ring-0 focus:border-gray-600 autofill:bg-none" id="input-text" type="text" placeholder={placeholderText}
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
                    className={inputAction==='ai' || inputAction=='doc upload'?'hidden': "relative flex items-center justify-center gap-2 p-1.5 h-[32px] w-[90px] border border-[#0A1A2F] rounded-[20px] cursor-pointer"}
                    onClick={() => setInputAction('google')}
                    >
                        <FcGoogle className="w-[18px] h-[18px] fill-[#F5F5F5]" />
                        <span className="text-[13px]">Search</span>
                        <ClearButton inputAction={inputAction} inputActionText="google" clearInputAction={clearInputAction} />
                    </div>
                    <div
                    className={inputAction==='google' || inputAction=='doc upload'?'hidden': "relative flex items-center justify-center gap-2 p-1.5 h-[32px] w-[70px] border border-[#0A1A2F] rounded-[20px] cursor-pointer"}
                    onClick={() => setInputAction('ai')}
                    >
                        <BotIcon size={18} color="#F5F5F5" />
                        <span className="text-[13px]">AI</span>
                        <ClearButton inputAction={inputAction} inputActionText="ai" clearInputAction={clearInputAction} />
                    </div>
                    <input
                        className={inputAction==='doc upload'?' w-[75%] text-transparent bg-[#0A1A2F] px-4 py-2 rounded-xl text-white cursor-pointer file:border-0 file:bg-transparent file:text-transparent file:w-0 file:p-0 file:m-0': "hidden"}
                        type="file"
                        id="upload-document"
                        ref={docUploadInputRef}
                        onInput={()=>{
                            setInputAction('doc upload');
                            setPlaceholderText("Make a query to upload")
                        }}
                    />
                        <button
                            className={inputAction==="doc upload"?"absolute bg-bgforeground top-[38%] right-[25%] flex items-center justify-center p-2.5 rounded-full border border-[#0A1A2F] cursor-pointer":"hidden"}
                            onClick={clearInputAction}
                            >
                                <X size={15} color="#F5F5F5" />
                        </button>
                    <label className={inputAction=='ai' || inputAction=='google'?'hidden': "relative flex items-center justify-center gap-2 p-1.5 h-[32px] w-[70px] border border-[#0A1A2F] rounded-[20px] cursor-pointer"}
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

            {showSendErrorModal && (
                <Modal
                    message="An error occurred. Please try again."
                    isMessageModal={true}
                    setShowModal={setShowSendErrorModal}
                />
            )}

            {showEmptyQueryModal && (
                <Modal
                    message="Enter a qeury before upload."
                    isMessageModal={true}
                    setShowModal={setShowEmptyQueryModal}
                />
            )}

            {showSearchLoadingToast && (
                <LoadingToast
                    message="Loading Search Response"
                    show={showSearchLoadingToast}
                />
            )}

            {showDocUploadResponseLoadingToast && (
                <LoadingToast
                    message="Loading Upload Response"
                    show={showDocUploadResponseLoadingToast}
                />
            )}
        </>
    )
}


type buttonProps = {
    inputAction: string
    inputActionText: string,
    clearInputAction: (
        e: React.MouseEvent<HTMLButtonElement>
    ) => void;
}

const ClearButton = ({inputAction, inputActionText, clearInputAction}: buttonProps) => {
    return(
        <button
            className={inputAction===inputActionText?"absolute bg-bgforeground top-[-40%] right-[-25%] flex items-center justify-center p-1.5 rounded-full border-[2px] border-[#0A1A2F] cursor-pointer":"hidden"}
            onClick={clearInputAction}
            >
                <X size={15} color="#F5F5F5" />
        </button>
    )
}
