import { saveSearchResponse } from "./firestore";
// import { httpsCallable } from 'firebase/functions';
// import { functions } from "./authentication";
// import { type HttpsCallableResult } from "firebase/functions";


// const googleSearch = httpsCallable(functions, "braveSearch");


export async function sendGoogleSearchQuery(query: string, personalStudyMode: boolean){
    if(!query) return;
    const isGoogleSearch = true;
    // await saveUserMessage(query, personalStudyMode);

    async function googleSearch(query: string){
        try{
            const response = await fetch(
                `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`
            );
            const data = await response.json();
            return data;
        }
        catch(err){
            console.error(err);
        }
    }

    const rawResponse = await googleSearch(query);
    // console.log(rawResponse);

    const response = rawResponse.Abstract;
    // console.log(response);

    if(!response){
        throw new Error;
    }
    await saveSearchResponse(query, response, personalStudyMode, isGoogleSearch)
}


//95e4d89cdb1164138

// async function googleSearch() {
//     const GOOGLE_SEARCH_API_KEY = "AIzaSyBMvIHHaP4Ajqro523p2W17UDyzMGcEnJM";
//     const SEARCH_ENGINE_ID = "95e4d89cdb1164138";

//     try{
//         const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_SEARCH_API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${query}`;
//         const response = await fetch(url);
//         // https://www.googleapis.com/customsearch/v1?key=AIzaSyBMvIHHaP4Ajqro523p2W17UDyzMGcEnJM&cx=95e4d89cdb1164138&q=test

//         const data = await response.json();
//         console.log(data)

//         return data;
//     }
//     catch(error){
//         console.error('Function error:', error);
//         throw error;
//     }
// }


// exports.googleSearch = onCall({ secrets: [googleApiKey] }, async (request) => {
//     try {
//         const { query } = request.data;
//         const SEARCH_ENGINE_ID = "95e4d89cdb1164138";

//         const url = `https://www.googleapis.com/customsearch/v1?key=${googleApiKey.value()}&cx=${SEARCH_ENGINE_ID}&q=${query}`;
//         const response = await fetch(url);
//         const data = await response.json();

//         return data;
//     } catch(error) {
//         console.error('Function error:', error);
//         throw error;
//     }
// });
