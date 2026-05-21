import { BrowserRouter } from 'react-router';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Userprovider } from './contexts/userContext.tsx';
import { StudyModeProvider } from './contexts/studyModeContext.tsx';
import App from './App.tsx'
import './index.css'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Userprovider>
        <StudyModeProvider>
            <App />
        </StudyModeProvider>
      </Userprovider>
    </BrowserRouter>
  </StrictMode>,
)
