import { useEffect, useState } from "react";

//Prefix the localStorage key
const PREFIX = "codepen-clone-react-";

function useLocalStorage(key, initialValue) {
  //add the element to the key
  const prefixedKey = PREFIX + key;

  const [value, setValue] = useState(() => {
    const localValue = localStorage.getItem(prefixedKey);
    if (localValue != null) {
      return JSON.parse(localValue);
    }

    if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  //Each time a value field change, save the data in the localStorage
  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
}

export default useLocalStorage;
