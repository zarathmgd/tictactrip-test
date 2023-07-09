import React, { useState } from "react";

export const AppContext = React.createContext<any>("");

export default function Context({ children }: { children: any }) {
  const [total, setTotal] = useState<number>(0);
  return <AppContext.Provider value={{ total, setTotal }}>{children}</AppContext.Provider>;
}
