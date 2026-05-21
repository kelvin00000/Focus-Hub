import { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import Modal from "./Modal";
import { BotIcon, DownloadIcon } from "lucide-react";
import { FcGoogle } from "react-icons/fc"
import { formatMessageTime } from "../utils/formatMessageTime";
import { user } from "../services/authentication";
import type { MessageType } from "../types/messageTypes";
import { deleteMessage } from "../services/firestore";
import { useStudyMode } from "../hooks/useStudyMode";

pdfjs.GlobalWorkerOptions.workerSrc =
  new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();




export default function ChatMessage({id, userId, sender, profileImage, searchMethod, query, response, message, previewUrl, originalUrl, tag, createdAt}: MessageType){
    const { personalStudyMode } = useStudyMode()
    const [showWarningModal, setShowWarningModal] = useState(false);
     const [showDeleteErrorModal, setShowDeleteErrorModal] = useState(false);
    const timerRef = useRef<number | null>(null);
    const [text, setText] = useState("");
    const messageCard = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetch(`${previewUrl}`)
        .then((res) => res.text())
        .then((data) => setText(data));
    }, []);

    const handleHoldStart = () => {
        timerRef.current = setTimeout(() => {
            setShowWarningModal(true);
        }, 1000);
    };
    const handleHoldEnd = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
    };

    const handleMessageDelete = () => {
        try{
            const messageId = messageCard.current?.dataset.messageId;
            console.log(messageId)
            deleteMessage(personalStudyMode, messageId!)
        }
        catch(err){
            console.error(err)
            setShowDeleteErrorModal(true);
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
                    className="flex flex-col shrink-0 gap-10px p-[15px] max-w-[82%] text-[#F5F5F5] bg-bgforeground rounded-[20px] border border-gray-800 lg:max-w-[65%]">
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
                            <div className="mb-[15px]">{query}</div>
                            <span className="mb-[3px] text-[12px] italic">Response</span>
                            <div className="mb-[15px]">{response}</div>
                        </>
                    : ''
                    }

                    {tag==='image'
                        ? <img className="object-cover rounded-[18px]" src={previewUrl} onClick={() => {window.open(originalUrl)}} />
                        :tag==='pdf'
                        ? <div className="max-h-[140px] overflow-hidden">
                            <Document file={previewUrl} onClick={() => {window.open(originalUrl)}}>
                                <Page pageNumber={1} width={250} height={25} />
                            </Document>
                        </div>
                        :tag==='doc'
                        ?<div className="max-h-[140px] overflow-hidden">
                            <Document file={previewUrl} onClick={() => {window.open(originalUrl)}}>
                                <Page pageNumber={1} width={250} height={25} />
                            </Document>
                        </div>
                        :tag==='text'
                        ?<div className="">
                            <pre className="whitespace-pre-wrap text-sm">
                                {text}
                            </pre>
                        </div>
                        :<div className="">{message}</div>
                    }

                    <div className="flex items-end justify-between mt-[15px]">
                        <div className="text-[15px] text-blue-950 italic">{tag}</div>

                        <div className="flex flex-col items-center justify-center gap-1.5">
                            {tag==='doc'||tag==='image'||tag==='text'||tag==='pdf'
                                ?<button
                                    className="p-2.5 rounded-full border border-gray-800 bg-[#0A1A2F] cursor-pointer"
                                    onClick={() => {
                                        // place download function call here
                                    }}
                                >
                                    <DownloadIcon size={18} color="#F5F5F5" />
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
        </>
    )
}
