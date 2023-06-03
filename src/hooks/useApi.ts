import axios from "axios";
import { useEffect, useState } from "react";

export function useApi<T = unknown>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<number>(0);

  async function fetchData() {
    await axios
      .get(url)
      .then((response) => {
        setData(response.data);
        setStatus(response.status);
      })
      .catch((error) => {
        setStatus(error.response.status); 
      });
  }

  useEffect(() => {
    fetchData()
  }, [url]);

  return { data, status };
}
