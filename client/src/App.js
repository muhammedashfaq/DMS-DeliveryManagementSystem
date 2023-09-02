import React from "react";
import { BrowserRouter} from "react-router-dom";
import { UserProvider } from "./Helper/context/userContext";
import AppRoutes from "./appRoutes";

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
