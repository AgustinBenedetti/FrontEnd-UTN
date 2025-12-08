import { createContext, useContext, useState } from "react";

const ChannelsContext = createContext();

export const ChannelsProvider = ({ children }) => {
  const [channels, setChannels] = useState([]);

  return (
    <ChannelsContext.Provider value={{ channels, setChannels }}>
      {children}
    </ChannelsContext.Provider>
  );
};

export const useChannels = () => useContext(ChannelsContext);
