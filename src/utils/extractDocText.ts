import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
import mammoth from 'mammoth';
import JSZip from 'jszip';

// Set PDF.JS WORKER
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export const extractDocumentText = async (file: File) => {
  const fileType = file.type;
  let extractedText = '';

  try {
        // PDF EXTRACTION
        if (fileType === 'application/pdf') {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map((item) => ('str' in item ? item.str : '')).join(' ');
                extractedText += pageText + '\n';
            }
        }

        // DOCX EXTRACTION
        else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            const arrayBuffer = await file.arrayBuffer();
            const result = await mammoth.extractRawText({ arrayBuffer });
            extractedText = result.value;
        }
        // PPTX EXTRACTION
        else if (fileType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
            const arrayBuffer = await file.arrayBuffer();
            const zip = await JSZip.loadAsync(arrayBuffer);

            const slideFiles = Object.keys(zip.files).filter(name =>
                name.startsWith('ppt/slides/slide') && name.endsWith('.xml')
            );

            for (const slideName of slideFiles) {
                const slideXml = await zip.file(slideName)?.async('text');
                if (slideXml) {
                    // EXTRCAT TEXT BETWEEN <A:T> TAGS
                    const textMatches = slideXml.match(/<a:t>([^<]+)<\/a:t>/g);
                    if (textMatches) {
                        const slideText = textMatches.map(match =>
                            match.replace(/<\/?a:t>/g, '')
                        ).join(' ');
                        extractedText += slideText + '\n';
                    }
                }
            }
        }

        // TXT/MD EXTRACTION
        else if (fileType === 'text/plain' || fileType === 'text/markdown') {
            extractedText = await file.text();
        }

        else {
            throw new Error('Unsupported file type');
        }

        return extractedText;
    }
    catch (error) {
        console.error('Error extracting document text:', error);
        throw error;
    }
};
