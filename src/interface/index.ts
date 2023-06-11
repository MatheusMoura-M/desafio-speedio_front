import { ReactNode } from "react";
import {
  iUserRequest,
  iUserLogin,
  iGetUserResponse,
  iOmitClientPassword,
  iUserResponse,
} from "./user.interface";
import {
  iLinkRequest,
  iLinkResponse,
  iLinkUpdate,
  iLinkUpdateResponse,
} from "./link.interface";
import { InputProps, iShowPass } from "./input.interface";

export interface iProviderProps {
  children: ReactNode;
}

interface iStatusModal {
  isOpen: boolean;
  onClose: () => void;
  onOpen?: () => void;
}

export type {
  iGetUserResponse,
  iUserLogin,
  iOmitClientPassword,
  iUserRequest,
  iUserResponse,
  iLinkRequest,
  iLinkResponse,
  iLinkUpdate,
  iLinkUpdateResponse,
  iStatusModal,
  InputProps,
  iShowPass,
};
