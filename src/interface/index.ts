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

export interface iProviderProps {
  children: ReactNode;
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
};
