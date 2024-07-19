// import { useRef, useEffect } from "react";

// export const useKeydown = (keyId, callback) => {
//   const ref = useRef(null);

//   useEffect(() => {
//     const handleKeydown = (event) => {
//       if (event.key === keyId) {
//         if (callback) callback(ref.current);
//       }
//     };

//     window.addEventListener("keydown", handleKeydown);

//     return () => {
//       window.removeEventListener("keydown", handleKeydown);
//     };
//   }, []);

//   return ref;
// };
import { useEffect } from "react";

export const closeModalKeydown = (keyId, callback) => {
  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.key === keyId) {
        callback();
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [keyId, callback]);

  return null;
};
