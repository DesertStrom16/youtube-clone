import { io } from "socket.io-client";
import { serverUrl } from "./utils/env";

export const socket = io(`${serverUrl}`, { autoConnect: false });