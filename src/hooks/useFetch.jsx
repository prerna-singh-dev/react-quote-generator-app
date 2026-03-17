import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url);
      const result = await response.json();
      setData(result.quotes);
      setLoading(false);
    }

    fetchData();
  }, [url]);

  return [{ data: data, loading: loading }];
};
