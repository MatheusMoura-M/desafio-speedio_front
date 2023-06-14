import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import {
  iLinkRequest,
  iLinkResponse,
  iLinkUpdate,
  iProviderProps,
  iUserLogin,
  iUserRequest,
  iUserResponse,
} from "../interface";
import { api } from "../services/api";
import axios from "axios";
import { toast } from "react-toastify";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { MenuItem, useDisclosure } from "@chakra-ui/react";

export interface iAuthProviderData {
  navigate: NavigateFunction;
  getUserProfile: () => Promise<void>;
  onRegisterSubmit: (dataRegister: iUserRequest) => Promise<void>;
  onLogin: (user: iUserLogin) => Promise<void>;
  onDeleteUser: () => Promise<void>;
  isLogged: boolean;
  setIsLogged: Dispatch<SetStateAction<boolean>>;
  userLogged: iUserResponse;
  setUserLogged: Dispatch<SetStateAction<iUserResponse>>;
  onShortenLink: (data: iLinkRequest) => Promise<void>;
  onUpdateShortenedLink: (data: iLinkUpdate, id: string) => Promise<void>;
  getShortenedLinkSpecific: (shortened_link: string) => Promise<void>;
  onDeleteShortenedLink: (id: string) => Promise<void>;
  allLinksByUser: iLinkResponse[];
  setAllLinksByUser: Dispatch<SetStateAction<iLinkResponse[]>>;
  allLinks: iLinkResponse[];
  setAllLinks: Dispatch<SetStateAction<iLinkResponse[]>>;
  currentLink: iLinkResponse;
  setCurrentLink: Dispatch<SetStateAction<iLinkResponse>>;
  getUserLinks: () => Promise<void>;
  MenuHamburguer: ({ children }: iProviderProps) => JSX.Element;
  isOpenLogin: boolean;
  onOpenLogin: () => void;
  onCloseLogin: () => void;
  isOpenRegister: boolean;
  onOpenRegister: () => void;
  onCloseRegister: () => void;
  isOpenLinks: boolean;
  onOpenLinks: () => void;
  onCloseLinks: () => void;
  token: string | null;
  allVisits: number[] | undefined;
  setAllVisits: Dispatch<SetStateAction<number[] | undefined>>;
  appear: boolean;
  setAppear: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<iAuthProviderData>(
  {} as iAuthProviderData
);

export const AuthProvider = ({ children }: iProviderProps) => {
  const token = localStorage.getItem("@token");
  const navigate = useNavigate();

  // States
  const [isLogged, setIsLogged] = useState(false);
  const [userLogged, setUserLogged] = useState<iUserResponse>(
    {} as iUserResponse
  );
  const [currentLink, setCurrentLink] = useState({} as iLinkResponse);
  const [allLinks, setAllLinks] = useState([] as iLinkResponse[]);
  const [allVisits, setAllVisits] = useState<number[]>();
  const [allLinksByUser, setAllLinksByUser] = useState([] as iLinkResponse[]);
  const [appear, setAppear] = useState(false);

  // Disclosure
  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onClose: onCloseLogin,
  } = useDisclosure();
  const {
    isOpen: isOpenRegister,
    onOpen: onOpenRegister,
    onClose: onCloseRegister,
  } = useDisclosure();
  const {
    isOpen: isOpenLinks,
    onOpen: onOpenLinks,
    onClose: onCloseLinks,
  } = useDisclosure();

  // Functions
  const getUserProfile = async () => {
    try {
      const resp = await api.get("/user/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("@token")}` },
      });

      setUserLogged(resp.data);
      setIsLogged(true);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        error.response?.data.error && localStorage.removeItem("@token");
        toast.error(error.response?.data.error, {
          autoClose: 1000,
        });
      }
    }
  };

  const getUserLinks = async () => {
    if (token) {
      try {
        const resp = await api.get(`/user/links`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
          },
        });

        setAllLinksByUser(resp.data);
      } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data.error, {
            autoClose: 1000,
          });
        }
      }
    }
  };

  const onRegisterSubmit = async (dataRegister: iUserRequest) => {
    try {
      await api.post("/user", dataRegister);

      toast.success("Usuário registrado com sucesso", {
        autoClose: 1000,
      });
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error, {
          autoClose: 1000,
        });
      }
    }
  };

  const onLogin = async (user: iUserLogin): Promise<void> => {
    try {
      const { data } = await api.post("login", user);
      window.localStorage.setItem("@token", data.token);

      getUserProfile();
      setIsLogged(true);
      toast.success("Usuário logado com sucesso", {
        autoClose: 1000,
      });
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error, {
          autoClose: 1000,
        });
      }
    }
  };

  const onDeleteUser = async () => {
    try {
      await api.delete("/user", {
        headers: { Authorization: `Bearer ${localStorage.getItem("@token")}` },
      });

      toast.success("Usuário deletado com sucesso", {
        autoClose: 1000,
      });

      localStorage.removeItem("@token");
      setIsLogged(false);
      setUserLogged({} as iUserResponse);
      navigate("/");
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.log(error);
        toast.error(error.response?.data.error.errors[0], {
          autoClose: 1000,
        });
      }
    }
  };

  const onShortenLink = async (data: iLinkRequest) => {
    try {
      if (token) {
        const resp = await api.post("/link", data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
          },
        });
        setCurrentLink(resp.data);
        getUserLinks();
      } else {
        const resp = await api.post("/link", data);
        setCurrentLink(resp.data);
      }

      toast.success("Link encurtado com sucesso", {
        autoClose: 1000,
      });
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error.errors[0], {
          autoClose: 1000,
        });
      }
    }
  };

  const onUpdateShortenedLink = async (data: iLinkUpdate, id: string) => {
    try {
      await api.patch(`/link/${id}`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("@token")}` },
      });

      toast.success("Link editado com sucesso", {
        autoClose: 1000,
      });
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error, {
          autoClose: 1000,
        });
      }
    } finally {
      getUserLinks();
    }
  };

  const getShortenedLinkSpecific = async (shortened_link: string) => {
    try {
      const resp = await api.get(`/link/${shortened_link}`);

      setCurrentLink(resp.data);
      window.location.href = resp.data.original_link;
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error, {
          autoClose: 1000,
        });
      }
    }
  };

  const onDeleteShortenedLink = async (id: string) => {
    try {
      await api.delete(`/link/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("@token")}` },
      });

      toast.success("Link deletado com sucesso", {
        autoClose: 1000,
      });
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error.errors[0], {
          autoClose: 1000,
        });
      }
    } finally {
      getUserLinks();
    }
  };

  const MenuHamburguer = ({ children }: iProviderProps) => (
    <MenuItem
      display={
        children === "Meus links" || children === "Top 100 URLs"
          ? { base: "flex", sm2: "none" }
          : "flex"
      }
      alignSelf={"center"}
      justifyContent={"center"}
      bg={"gray.200"}
      color={"#0B0D0D"}
      border={"2px solid"}
      borderColor={"#ADB5BD"}
      borderRadius={".3rem"}
      my={".5rem"}
      py={"1rem"}
      w={"90%"}
      h={"48px"}
      fontWeight={500}
      _hover={{
        bg: "gray.300",
        transition: "0.3s",
      }}
      transition={"0.3s"}
      onClick={
        children === "Meus links"
          ? () => {
              onOpenLinks();
              getUserLinks();
            }
          : children === "Entrar"
          ? onOpenLogin
          : children === "Registrar"
          ? onOpenRegister
          : children === "Top 100 URLs"
          ? () => navigate("/top100")
          : children === "Excluir conta"
          ? onDeleteUser
          : () => {
              localStorage.removeItem("@token");
              setIsLogged(false);
              setUserLogged({} as iUserResponse);
              navigate("/");
            }
      }
    >
      {children}
    </MenuItem>
  );

  return (
    <AuthContext.Provider
      value={{
        navigate,
        getUserProfile,
        onLogin,
        onDeleteUser,
        onRegisterSubmit,
        isLogged,
        setIsLogged,
        setUserLogged,
        userLogged,
        getShortenedLinkSpecific,
        onDeleteShortenedLink,
        onShortenLink,
        onUpdateShortenedLink,
        allLinksByUser,
        setAllLinksByUser,
        currentLink,
        setCurrentLink,
        allLinks,
        setAllLinks,
        getUserLinks,
        MenuHamburguer,
        isOpenLogin,
        isOpenRegister,
        onCloseLogin,
        onCloseRegister,
        onOpenLogin,
        onOpenRegister,
        onCloseLinks,
        isOpenLinks,
        onOpenLinks,
        token,
        allVisits,
        setAllVisits,
        appear,
        setAppear,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
