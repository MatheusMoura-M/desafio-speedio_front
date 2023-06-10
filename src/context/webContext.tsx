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

export interface iAuthProviderData {
  navigate: NavigateFunction;
  getUserProfile: () => Promise<void>;
  onRegisterSubmit: (dataRegister: iUserRequest) => Promise<void>;
  onLogin: (user: iUserLogin) => Promise<void>;
  onDeleteUser: () => Promise<void>;
  getUserSpecific: (id: string) => Promise<void>;
  isLogged: boolean;
  setIsLogged: Dispatch<SetStateAction<boolean>>;
  userLogged: iUserResponse;
  setUserLogged: Dispatch<SetStateAction<iUserResponse>>;
  onShortenLink: (data: iLinkRequest) => Promise<void>;
  onUpdateShortenedLink: (data: iLinkUpdate, id: string) => Promise<void>;
  getShortenedLinkSpecific: (id: string) => Promise<void>;
  onDeleteShortenedLink: (id: string) => Promise<void>;
  allLinksByUser: iLinkResponse[];
  setAllLinksByUser: Dispatch<SetStateAction<iLinkResponse[]>>;
  allLinks: iLinkResponse[];
  setAllLinks: Dispatch<SetStateAction<iLinkResponse[]>>;
  currentLink: iLinkResponse;
  setCurrentLink: Dispatch<SetStateAction<iLinkResponse>>;
  getAllLinks: () => Promise<void>;
}

export const AuthContext = createContext<iAuthProviderData>(
  {} as iAuthProviderData
);

export const AuthProvider = ({ children }: iProviderProps) => {
  const token = localStorage.getItem("@token");
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  const [userLogged, setUserLogged] = useState<iUserResponse>(
    {} as iUserResponse
  );
  const [currentLink, setCurrentLink] = useState({} as iLinkResponse);
  const [allLinks, setAllLinks] = useState([] as iLinkResponse[]);
  const [allLinksByUser, setAllLinksByUser] = useState([] as iLinkResponse[]);

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

  const GetUserLinks = async () => {
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

  const getAllLinks = async () => {
    try {
      const resp = await api.get(`/link`);

      setAllLinks(resp.data);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error, {
          autoClose: 1000,
        });
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

  const getUserSpecific = async (id: string) => {
    try {
      const resp = await api.get(`/user/${id}`);

      // setOwnerOfAdSelected(resp.data);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error, {
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
        GetUserLinks();
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
    }
  };

  return (
    <AuthContext.Provider
      value={{
        navigate,
        getUserProfile,
        getUserSpecific,
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
        getAllLinks,
        setAllLinks,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
