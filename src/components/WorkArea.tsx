import { useState } from "react"
import ChatMessage from "./ChatMessage"


export default function WorkArea(){
    const [chatMessages] = useState([
        {
            sender: "Ethan",
            message: "Does anyone have the updated software engineering notes?",
            tag: "message",
            isUserMessage: false
        },
        {
            sender: "Maya",
            message: "Yeah give me a sec to upload them.",
            tag: "message",
            isUserMessage: false
        },
        {
            sender: "Ethan",
            searchMethod: "Google Search",
            query: "Briefly explain what agile methodology is in software development",
            message: "Top results for: Agile methodology in software development",
            tag: "google search",
            isUserMessage: false
        },
        {
            sender: "Kelvin",
            message: "Great that was very expalnatory",
            tag: "message",
            isUserMessage: true
        },
        {
            sender: "Maya",
            message: "Can someone summarize the waterfall model quickly?",
            tag: "message",
            isUserMessage: false
        },
        {
            sender: "Maya",
            searchMethod: "AI Search",
            query: "consicely and briefly explain what the waterfall methodology is in software development,  as well as it's phases",
            message: "The waterfall model is a linear software development approach with sequential phases.",
            tag: "ai search",
            isUserMessage: false
        },
        {
            sender: "Sophia",
            message: "We should probably add diagrams to our presentation slides.",
            tag: "message",
            isUserMessage: false
        },
        {
            sender: "Sofia",
            searchMethod: "Google Search",
            query: "Provide sample examples of UML disgrams that i can use for my project",
            message: "Top results for: UML diagram examples for student projects",
            tag: "google search",
            isUserMessage: false
        },
        {
            sender: "Kelvin",
            message: "Our database schema still needs normalization.",
            tag: "message",
            isUserMessage: true
        },
        {
            sender: "Kelvin",
            searchMethod: "AI Search",
            query: "Explin in detail what the third normal form is in databases",
            message: "Third Normal Form removes transitive dependencies from database tables.",
            tag: "ai search",
            isUserMessage: true
        },
        {
            sender: "Noah",
            message: "Who is handling the frontend section tomorrow?",
            tag: "message",
            isUserMessage: false
        },
        {
            sender: "Kelvin",
            message: "I can handle the UI demo and navigation flow.",
            tag: "message",
            isUserMessage: true
        },
        {
            sender: "Kelvin",
            searchMethod: "Google Search",
            query: "Quickly suggest some react dashboard interfaces i can use as inspiration",
            message: "Top results for: React dashboard UI inspiration",
            tag: "google search",
            isUserMessage: true
        },
        {
            sender: "James",
            searchMethod: "AI Search",
            query: "Generate a quiz from this document",
            message: "Suggested quiz questions generated from uploaded networking notes.",
            tag: "ai search",
            isUserMessage: false
        },
        {
            sender: "Kelvin",
            message: "The collaboration analytics feature is actually looking clean now.",
            tag: "message",
            isUserMessage: true
        },
        {
            sender: "James",
            message: "Let’s finalize the proposal document tonight.",
            tag: "message",
            isUserMessage: false
        }
    ])
    return(
        <>
            <div className="fixed flex flex-col items-start gap-[10px] pt-[90px] pb-[200px] pr-[20px] pl-[20px] w-full h-screen overflow-y-scroll overflow-x-hidden no-scrollbar mask-[linear-gradient(to_bottom,transparent,black_15%,black_80%,transparent)] lg:pt-[70px] lg:left-[15%] lg:w-[70%] lg:mask-[linear-gradient(to_bottom,transparent,black_8%,black_70%,transparent)]">
                {chatMessages.map((msg, i) => (
                    <ChatMessage key={i} sender={msg.sender} message={msg.message} searchMethod={msg.searchMethod} query={msg.query} tag={msg.tag} isUserMessage={msg.isUserMessage} />
                ))}
            </div>
        </>
    )
}
