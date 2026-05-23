import { pdfjs } from "react-pdf";
import mammoth from 'mammoth';

// Set PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc =
  new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

export const extractDocumentText = async (file: File) => {
  const fileType = file.type;
  let extractedText = '';

  try {
        // PDF EXTRACTION
        if (fileType === 'application/pdf') {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;

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

        // TXT/MD EXTRACTION
        else if (fileType === 'text/plain' || fileType === 'text/markdown') {
            extractedText = await file.text();
        }

        else {
            throw new Error('Unsupported file type. Please upload PDF, DOCX, TXT, or MD files.');
        }

        return extractedText;
    }
    catch (error) {
        console.error('Error extracting document text:', error);
        throw error;
    }
};
