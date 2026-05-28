import { db, user } from "./authentication";
import { addDoc, collection } from "firebase/firestore";


export const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', "focus-hub");

    const isPDF = file.type === 'application/pdf';
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    const resourceType = isImage||isPDF ? 'image' : isVideo ? 'video' : 'raw';

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/dnn8wbubn/${resourceType}/upload`,
        { method: 'POST', body: formData }
    );

    if (!response.ok) throw new Error('Cloudinary upload failed');

    const data = await response.json();

    return {
        originalUrl: data.secure_url,
        fileType: file.type,
        fileName: file.name,
        publicId: data.public_id
    };
};


export async function saveToFirestore(fileName: string, fileType: string, url: string, personalStudyMode: boolean, groupId: string){
    if(personalStudyMode) throw new Error("wrong study mode");

    if(user){
        try{
           await addDoc(collection(db, 'groups', groupId, "chat"), {
                userId: user.uid,
                profileImage: user.photoURL,
                sender: user.displayName,
                url: url,
                fileName: fileName,
                isDoc: true,
                tag: fileType,
                createdAt: new Date()
            });
        }
        catch(err){
            console.error(err);
        }
    }
}

export const downloadOriginalFile = async (originalUrl: string, fileName: string) => {
    try {
        const response = await fetch(originalUrl);
        if (!response.ok) throw new Error('Download failed');

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Download error:', error);
        throw error;
    }
};
