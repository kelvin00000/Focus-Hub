import { saveSearchResponse } from "./firestore";


export async function sendAISearchQuery(query: string, personalStudyMode: boolean, groupId: string){
    if(!query) throw new Error
    const isGoogleSearch = false;

    const searchOpenAI = async (prompt: string) => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/ai-search`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });

        const data = await response.json();
        return data.text;
    };

    const rawResponse = await searchOpenAI(query);
    // console.log(rawResponse)

    if(!rawResponse){
        throw new Error;
    }
    saveSearchResponse(query, rawResponse!, personalStudyMode, isGoogleSearch, groupId)
}



export async function sendAIDocQuery(convertedText: string, query: string, personalStudyMode: boolean, groupId: string){
    if(!convertedText) throw new Error();

    // Construct final prompt
    const prompt = `Here is a document:
    ${convertedText}
    Question: ${query}
    Please answer the question based on the document content.`;

    await sendAISearchQuery(prompt, personalStudyMode, groupId);
}
