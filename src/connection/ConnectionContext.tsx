import React, {
  useEffect,
  useState,
  useLayoutEffect,
  useContext,
  createContext
} from "react";
import Peer from "peerjs";

type Connection = {
  peer: Peer | null;
  setPeer: (id: string) => Peer;
};
export const ConnectionContext = createContext<Connection>({} as Connection);

export function ConnectionProvider(props: any) {
  const [peer, setPeer] = useState(null);

  return (
    <ConnectionContext.Provider
      value={{
        peer,
        setPeer
      }}
      {...props}
    />
  );
}
