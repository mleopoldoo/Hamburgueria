// import { useRef, useEffect } from "react";

// export const closeModalClick = (callback) => {
//   const ref = useRef(null);
//   useEffect(() => {
//     const handleOutclick = (event) => {
//       if (!ref.current?.contains(event.target)) {
//         if (callback) callback();
//       }
//     };
//     window.addEventListener("mousedown", handleOutclick);

//     return () => {
//       window.removeEventListener("mousedown", handleOutclick);
//     };
//   }, []);
//   return ref;
// };
import { useRef, useEffect } from "react";

export const closeModalClick = (callback) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleOutclick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleOutclick);

    return () => {
      document.removeEventListener("mousedown", handleOutclick);
    };
  }, [callback]);

  return ref;
};
