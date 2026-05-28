import { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
// import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import Modal from "./Modal";
import { BotIcon, DownloadIcon, FileIcon } from "lucide-react";
import { FcGoogle } from "react-icons/fc"
import { formatMessageTime } from "../utils/formatMessageTime";
import { user } from "../services/authentication";
import type { Timestamp } from "firebase/firestore";
import { deleteMessage } from "../services/firestore";
import { useStudyMode } from "../hooks/useStudyMode";
import LoadingToast from "./Toasttip";
import { downloadOriginalFile } from "../services/docShare";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs`;


type props = {
    id: string
    userId: string
    sender: string
    profileImage?: string
    message?: string
    query?: string
    response?: string
    fileName?: string
    url?: string
    isDoc?: boolean
    searchMethod?: string,
    tag: string
    createdAt: Timestamp
    renderChatMessages: () => Promise<void>
    groupIdValue?: string
}



export default function ChatMessage({id, userId, sender, profileImage, searchMethod, query, response, message, fileName, url, isDoc, tag, createdAt, renderChatMessages, groupIdValue}: props){
    const { personalStudyMode } = useStudyMode();
    const [ showWarningModal, setShowWarningModal ] = useState(false);
    const [ showDeleteErrorModal, setShowDeleteErrorModal ] = useState(false);
    const [ showDeleteLoadingToast, setShowDeleteLoadingToast ] = useState(false);
    const timerRef = useRef<number | null>(null);
    const [text, setText] = useState("");
    const messageCard = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetch(`${url}`)
        .then((res) => res.text())
        .then((data) => setText(data));
    }, []);

    const handleHoldStart = () => {
        timerRef.current = window.setTimeout(() => {
            setShowWarningModal(true);
        }, 3000);
    };
    const handleHoldEnd = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
    };

    const handleMessageDelete = async () => {
        setShowDeleteLoadingToast(true);
        try{
            const messageId = messageCard.current?.dataset.messageId;
            await deleteMessage(personalStudyMode, messageId!, groupIdValue!)
            await renderChatMessages()
            setShowDeleteLoadingToast(false);
            return;
        }
        catch(err){
            console.error(err)
            setShowDeleteLoadingToast(false);
            setShowDeleteErrorModal(true);
            return;
        }
    }
    const handleDocDownload = async (url: string, fileName: string) => {
        try {
            await downloadOriginalFile(url, fileName);
        }
        catch (error) {
            console.error(error)
        }
    }


    // TIME FORMAT
    const timeCreated = formatMessageTime(createdAt);

    return(
        <>
            <div className={`flex ${userId===user?.uid?'justify-end':'justify-start'} w-full`}>
                <img className={`${userId===user?.uid?'hidden':'mr-[5px] w-[30px] h-[30px] rounded-full'}`} src={profileImage} />
                <div
                    data-message-id={id}
                    ref={messageCard}
                    onMouseDown={handleHoldStart}
                    onMouseUp={handleHoldEnd}
                    onMouseLeave={handleHoldEnd}
                    onTouchStart={handleHoldStart}
                    onTouchEnd={handleHoldEnd}
                    className="flex flex-col shrink-0 gap-10px p-[15px] max-w-[82%] min-w-[60%] lg:min-w-[40%] text-[#F5F5F5] bg-bgforeground rounded-[20px] border border-gray-800 lg:max-w-[65%]">
                    <div className="mb-[10px] font-light italic">{
                        userId===user?.uid?''
                        : searchMethod==='AI Search'? (
                            <div className="flex items-center gap-2.5">
                                <BotIcon size={18} color="#F5F5F5" />
                                <span>{sender}'s  {searchMethod}</span>
                            </div>
                        )
                        : searchMethod==='Google Search'? (
                            <div className="flex items-center gap-2.5">
                                <FcGoogle size={18} color="#F5F5F5" />
                                <span>{sender}'s  {searchMethod}</span>
                            </div>
                        )
                        : sender
                    }</div>
                    {query?
                        <>
                            <span className="mb-[3px] text-[12px] italic">Query</span>
                            <div className="mb-[15px] line-clamp-3">{query}</div>
                            <span className="mb-[3px] text-[12px] italic">Response</span>
                            <div className="mb-[15px]">{response}</div>
                        </>
                    : ''
                    }

                    {tag==='image/png'||tag==='image/jpg'||tag==='image/webp'||tag==='image/jpeg'
                        ? <img className="object-cover rounded-[18px]" src={url} onClick={() => {window.open(url)}} />
                    :tag==='application/pdf'
                        ? <div className="max-h-[140px] overflow-hidden">
                            <Document file={url} onClick={() => {window.open(url)}}>
                                <Page pageNumber={1} width={250} height={25} />
                            </Document>
                        </div>
                    :tag==='application/vnd.openxmlformats-officedocument.wordprocessingml.document'||tag==='application/vnd.openxmlformats-officedocument.presentationml.presentation'
                        ?<div
                            className="cursor-pointer flex flex-col items-center gap-2"
                            onClick={() => window.open(url)}
                        >
                            <FileIcon size={70} className="text-bgtext" />
                            <span className="line-clamp-1">{fileName}</span>
                        </div>
                    :tag==='text/plain'
                        ?<div className="">
                            <pre className="whitespace-pre-wrap text-sm">
                                {text}
                            </pre>
                        </div>
                        :<div className="">{message}</div>
                    }

                    <div className="flex items-end justify-between mt-[15px]">
                        <div className="text-[15px] text-blue-950 italic">
                        {tag==="application/vnd.openxmlformats-officedocument.presentationml.presentation"?"pptx"
                        :tag==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"? "docx"
                        :tag
                        }
                        </div>

                        <div className="flex flex-col items-center justify-center gap-1.5">
                            {isDoc
                                ?<button
                                    className="p-2.5 rounded-full border border-gray-800 bg-[#0A1A2F] cursor-pointer"
                                    onClick={() => {
                                        handleDocDownload(url!, fileName!)
                                    }}
                                >
                                    <DownloadIcon size={18} className="text-bgtext" />
                                </button>
                                :''
                            }
                            <span className="text-[13px]">{timeCreated}</span>
                        </div>
                    </div>
                </div>
            </div>

            {showWarningModal &&
                (<Modal
                    message="Delete this message. This cannot be undone."
                    isDeleteMessageModal={true}
                    handleMessageDelete={handleMessageDelete}
                    setShowModal={setShowWarningModal}
                />
            )}

            {showDeleteErrorModal &&
                (<Modal
                    message="Delete was unsuccessful. Please try again."
                    isMessageModal={true}
                    setShowModal={setShowDeleteErrorModal}
                />
            )}

            {showDeleteLoadingToast && (
                <LoadingToast
                    message="Deleting message"
                    show={showDeleteLoadingToast}
                />
            )}
        </>
    )
}
