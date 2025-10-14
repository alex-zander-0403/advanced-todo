import { useContext } from "react";
import { NetworkContext } from "../contexts/NetworkContext";

//
export function NetworkNotification() {
  const { networkStatus } = useContext(NetworkContext);
  const { isOnline, showNotification, message } = networkStatus;

  if (!showNotification) return null;

  return (
    <div
      className={`text-center w-full fixed top-0 left-0 z-10 p-3 text-lg text-white ${isOnline ? "bg-green-700" : "bg-red-700"}`}
    >
      <p>{message}</p>
    </div>
  );
}
