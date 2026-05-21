import ChatMessage from "./ChatMessage"
import { type chatMessagesType } from "../types/messageTypes";

// USE FILE EXTENSION FROM ACTUAL UPLAODED FILES TO DETERMINE TAG TYPE(PDF, DOC, IMAGE OR TEXT) OF THE DOC

type props = {
    chatMessages: chatMessagesType;
};

export default function WorkArea({chatMessages}: props){

    return(
        <>
            <div className="fixed flex flex-col items-start gap-[10px] pt-[90px] pb-[200px] pr-[10px] pl-[10px] w-full h-screen overflow-y-scroll overflow-x-hidden no-scrollbar mask-[linear-gradient(to_bottom,transparent,black_15%,black_80%,transparent)] lg:pt-[70px] lg:pr-0 lg:pl-0 lg:left-[15%] lg:w-[70%] lg:mask-[linear-gradient(to_bottom,transparent,black_8%,black_70%,transparent)]">
                {   chatMessages?
                    chatMessages.map((msg) => (
                        <ChatMessage key={msg.id} id={msg.id} userId={msg.userId} sender={msg.sender} profileImage={msg.profileImage} message={msg.message} searchMethod={msg.searchMethod} query={msg.query} response={msg.response} previewUrl={msg.previewUrl} originalUrl={msg.originalUrl} tag={msg.tag} createdAt={msg.createdAt} />
                    ))
                    : (
                        <div className="">Oops nothing here</div>
                    )
                }
            </div>
        </>
    )
}

// const [chatMessages] = useState([
    //     {
    //         sender: "Ethan",
    //         profileImage: "/user-1.jpg",
    //         message: "Does anyone have the updated software engineering notes?",
    //         tag: "message",
    //         createdAt: "5:00pm",
    //         isUser: false
    //     },
    //     {
    //         sender: "Maya",
    //         profileImage: "/user-2.jpg",
    //         message: "Yeah give me a sec to upload them.",
    //         tag: "message",
    //         createdAt: "5:07pm",
    //         isUser: false
    //     },
    //     {
    //         sender: "Maya",
    //         profileImage: "/user-2.jpg",
    //         originalUrl: "/docs/previewPDF.pdf",
    //         previewUrl: "/docs/previewPDF.pdf",
    //         tag: "pdf",
    //         createdAt: "5:12pm",
    //         isUser: false
    //     },
    //     {
    //         sender: "Kelvin",
    //         message: "Let me also upload the slides we needed",
    //         tag: "message",
    //         createdAt: "5:13pm",
    //         isUser: true
    //     },
    //     {
    //         sender: "Kelvin",
    //         originalUrl: "/docs/previewPDF.pdf",
    //         previewUrl: "/docs/previewPDF.pdf",
    //         tag: "doc",
    //         createdAt: "5:16pm",
    //         isUser: true
    //     },
    //     {
    //         sender: "Ethan",
    //         profileImage: "/user-1.jpg",
    //         searchMethod: "Google Search",
    //         query: "Briefly explain what agile methodology is in software development",
    //         message: "Top results for: Agile methodology in software development",
    //         tag: "google search",
    //         createdAt: "5:20pm",
    //         isUser: false
    //     },
    //     {
    //         sender: "Kelvin",
    //         message: "Great that was very expalnatory",
    //         tag: "message",
    //         createdAt: "5:23pm",
    //         isUser: true
    //     },
    //     {
    //         sender: "Maya",
    //         profileImage: "/user-2.jpg",
    //         message: "Can someone summarize the waterfall model quickly?",
    //         tag: "message",
    //         createdAt: "5:27pm",
    //         isUser: false
    //     },
    //     {
    //         sender: "Maya",
    //         profileImage: "/user-2.jpg",
    //         searchMethod: "AI Search",
    //         query: "consicely and briefly explain what the waterfall methodology is in software development,  as well as it's phases",
    //         message: "The waterfall model is a linear software development approach with sequential phases.",
    //         tag: "ai search",
    //         createdAt: "5:33pm",
    //         isUser: false
    //     },
    //     {
    //         sender: "Sophia",
    //         profileImage: "/user-3.jpg",
    //         message: "We should probably add diagrams to our presentation slides.",
    //         tag: "message",
    //         createdAt: "5:35pm",
    //         isUser: false
    //     },
    //     {
    //         sender: "Sofia",
    //         profileImage: "/user-3.jpg",
    //         searchMethod: "Google Search",
    //         query: "Provide sample examples of UML disgrams that i can use for my project",
    //         message: "Top results for: UML diagram examples for student projects",
    //         tag: "google search",
    //         createdAt: "5:40pm",
    //         isUser: false
    //     },
    //     {
    //         sender: "Kelvin",
    //         message: "Our database schema still needs normalization.",
    //         tag: "message",
    //         createdAt: "6:01pm",
    //         isUser: true
    //     },
    //     {
    //         sender: "Kelvin",
    //         searchMethod: "AI Search",
    //         query: "Explin in detail what the third normal form is in databases",
    //         message: "Third Normal Form removes transitive dependencies from database tables.",
    //         tag: "ai search",
    //         createdAt: "6:06pm",
    //         isUser: true
    //     },
    //     {
    //         sender: "Sophia",
    //         profileImage: "/user-3.jpg",
    //         originalUrl: "/docs/previewImage.jpg",
    //         previewUrl: "/docs/previewImage.jpg",
    //         tag: "image",
    //         createdAt: "6:16pm",
    //         isUser: false
    //     },
    //     {
    //         sender: "Noah",
    //         profileImage: "/user-1.jpg",
    //         message: "Who is handling the frontend section tomorrow?",
    //         tag: "message",
    //         createdAt: "6:30pm",
    //         isUser: false
    //     },
    //     {
    //         sender: "Kelvin",
    //         message: "I can handle the UI demo and navigation flow.",
    //         tag: "message",
    //         createdAt: "6:42pm",
    //         isUser: true
    //     },
    //     {
    //         sender: "Kelvin",
    //         searchMethod: "Google Search",
    //         query: "Quickly suggest some react dashboard interfaces i can use as inspiration",
    //         message: "Top results for: React dashboard UI inspiration",
    //         tag: "google search",
    //         createdAt: "6:43pm",
    //         isUser: true
    //     },
    //     {
    //         sender: "James",
    //         profileImage: "/user-4.jpg",
    //         searchMethod: "AI Search",
    //         query: "Generate a quiz from this document",
    //         message: "Suggested quiz questions generated from uploaded networking notes.",
    //         tag: "ai search",
    //         createdAt: "6:47pm",
    //         isUser: false
    //     },
    //     {
    //         sender: "Kelvin",
    //         message: "The collaboration analytics feature is actually looking clean now.",
    //         tag: "message",
    //         createdAt: "6:50pm",
    //         isUser: true
    //     },
    //     {
    //         sender: "James",
    //         profileImage: "/user-4.jpg",
    //         message: "Let’s finalize the proposal document tonight. Lemme send the template",
    //         tag: "message",
    //         createdAt: "6:54pm",
    //         isUser: false
    //     },
    //     {
    //         sender: "James",
    //         profileImage: "/user-4.jpg",
    //         previewUrl: "/docs/previewTEXT.txt",
    //         tag: "text",
    //         createdAt: "6:54pm",
    //         isUser: false
    //     }
    // ])
