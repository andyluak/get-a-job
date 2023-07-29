import React, { useEffect } from "react";

const useEffectOnce = (callback: () => void | (() => void | undefined)) => {
  const initial = React.useRef(true);

  useEffect(() => {
    if (!initial.current) return;

    initial.current = false;
    callback();
  }, [callback]);
};

export default useEffectOnce;
