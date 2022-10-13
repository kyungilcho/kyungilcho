import { PortalProps } from "@mui/material";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function Portal({ children }: { children: React.ReactNode }) {
  // const { children } = props;
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setElement(document.getElementById("__next"));
  }, []);

  if (!element) {
    return <></>;
  }

  return createPortal(children, element);
}
