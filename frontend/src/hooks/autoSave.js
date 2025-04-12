// === FILE: /client/src/hooks/useAutoSave.js ===
import { useEffect } from "react";

const useAutoSave = (data, callback, delay = 3000) => {
  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => clearTimeout(handler);
  }, [data]);
};

export default useAutoSave;