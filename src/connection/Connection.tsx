import { ConnectionContext } from "./ConnectionContext";
import React, { useContext, useState, useEffect, useRef } from "react";
import Peer from "peerjs";

export function Connection() {
  const {
    setPeer,
    peer,
    setOutgoingConnection,
    outgoingConnection,
    startCall,
    call,
    mediaStream,
    callEstablished
  } = useContext(ConnectionContext);
  const [peerId, setPeerId] = useState("");
  const [peerCreated, setPeerCreated] = useState(false);
  const [connectionId, setConnectionId] = useState("");

  const videoRef = useRef(null);

  useEffect(() => {
    if (peer && peer.id) {
      console.log("happy");
      setPeerCreated(true);
    } else setPeerCreated(false);
  }, [peer?.id]);

  useEffect(() => {
    console.log("peer has been changed");
  }, [peer]);

  const buildVideo = () => {
    debugger;
    let videoObj = videoRef.current;
    // @ts-ignore
    videoObj.srcObject = mediaStream;
    // @ts-ignore
    videoObj.play();
  };

  return (
    <div className="connection">
      <div className="header">
        <h1>Floo Network</h1>
        {peer ? (
          <h3>Your Peer Id is {peer.id}</h3>
        ) : (
          <h3>Please Create a Peer</h3>
        )}
      </div>
      <input
        type="text"
        placeholder="Create a Unique Peer Id"
        onChange={e => setPeerId(e.target.value)}
      />
      <button
        type="button"
        onClick={() => {
          setPeer(() => new Peer(peerId, { debug: 3 }));
        }}
      >
        Create Peer
      </button>
      {peerCreated && (
        <>
          <input
            type="text"
            placeholder="Enter Connection Id"
            onChange={e => setConnectionId(e.target.value)}
          />
          <button
            type="button"
            onClick={() => {
              // TODO: This might be able to be handled in the context via an event from the peer
              // Also, not sure if we need to declare this variable first
              // Give some thought to the location of this update to our app's state
              // It seems OK, but I'm tired and it's a school night
              const thing = peer!.connect(connectionId);
              setOutgoingConnection(thing);
            }}
          >
            Connect
          </button>
        </>
      )}
      {outgoingConnection && (
        <>
          <button
            type="button"
            onClick={() => {
              startCall();
              buildVideo();
            }}
          >
            Call
          </button>
        </>
      )}
      {mediaStream && buildVideo()}
      <video
        style={{ height: 400, width: 400 }}
        id="video-chat"
        ref={videoRef}
        autoPlay={true}
      ></video>
    </div>
  );
}
