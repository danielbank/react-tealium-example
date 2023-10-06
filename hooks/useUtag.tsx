import { useState, useEffect, createContext, useContext } from "react";

declare global {
  interface Window {
    utag?: Utag;
  }
}

export interface Utag {
  link: (data: object) => void;
  view: (data: object) => void;
}

interface Props {
  children?: React.ReactNode;
}

const EmptyUtag: Utag = { link: () => undefined, view: () => undefined };

const UtagContext: React.Context<Utag> = createContext<Utag>({} as Utag);

export const useUtag = (): Utag => useContext(UtagContext);

export const UtagProvider = ({ children }: Props) => {
  // This implementation silently drops events because the EmptyUtag object does nothing
  const [utag, setUtag] = useState(EmptyUtag);

  // Poll for the utag object on the window over a period of 10 seconds
  useEffect(() => {
    if (window.utag) {
      setUtag(window.utag);
      return;
    }
    let i = 0;
    const interval = setInterval(() => {
      if (window.utag) {
        setUtag(window.utag);
        clearInterval(interval);
        return;
      }
      i = i + 1;
      if (i > 50) {
        clearInterval(interval);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return <UtagContext.Provider value={utag}>{children}</UtagContext.Provider>;
};
