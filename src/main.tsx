import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import ApolloProviderWrapper from "./providers/ApolloProviderWrapper.tsx";

createRoot(document.getElementById("root")!).render(
  <ApolloProviderWrapper>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProviderWrapper>
);
