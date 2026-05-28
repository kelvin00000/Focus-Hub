import { saveSearchResponse } from "./firestore";


export async function sendGoogleSearchQuery(query: string, personalStudyMode: boolean, groupId: string){
    if(!query) return;
    const isGoogleSearch = true;

    const googleSearch = async (query: string) => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/brave-search`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        return await response.json();
    };

    const rawResponse = await googleSearch(query);
    // console.log(rawResponse);

    const response = rawResponse.web.results[2].description;
    // console.log(response);

    if(!response){
        throw new Error;
    }
    await saveSearchResponse(query, response, personalStudyMode, isGoogleSearch, groupId)
}
