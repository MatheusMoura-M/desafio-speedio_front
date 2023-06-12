import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./context/webContext";
import custonTheme from "./styles/theme";
import RoutesMain from "./routes";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";

import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

export default App;
