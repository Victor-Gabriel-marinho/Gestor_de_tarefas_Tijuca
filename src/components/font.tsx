import { useEffect } from "react";

export function useFont(fontName: string) {
  useEffect(() => {
    document.body.style.fontFamily = fontName;
  }, [fontName]);
}
