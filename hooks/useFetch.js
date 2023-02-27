import { useState, useEffect } from "react";

const useFetch = (cb: Function) => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    cb()
      .then((res) => {
        setData(res.data);
        setError(null);
      })
      .catch((err) => {
        setData(null);
        setError(err);
      })
      .finally(() => setIsLoading(false));
  });

  return {
    data,
    error,
    isLoading,
  };
};

export default useFetch;
