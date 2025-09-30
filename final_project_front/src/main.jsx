import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";

import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";


createRoot(document.getElementById('root')).render(
  <RecoilRoot>
    <BrowserRouter>
      <App />
    </BrowserRouter>  
  </RecoilRoot>
  
)
