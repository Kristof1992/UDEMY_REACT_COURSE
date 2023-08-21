import { useEffect } from "react";

/**
 * @Hook
 */
export function useKey(key, action) {
  useEffect(
    function () {
      function callback(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }
      document.addEventListener("keydown", callback);
      return () => document.removeEventListener("keydown", action);
    },
    [action, key]
  );
}
