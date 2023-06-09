import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./context/webContext";
import custonTheme from "./styles/theme";
import RoutesMain from "./routes";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <ChakraProvider theme={custonTheme}>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <AuthProvider>
        <RoutesMain />
      </AuthProvider>
      <ToastContainer />
    </ChakraProvider>
  );
};

export default App;
