import { useState } from "react";
import { AxiosResponse } from "axios";

export function useNetwork<Response, T>(
  request: (body: T) => Promise<AxiosResponse<Response>>
) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<Response>();
  const makeRequest = (
    body: T,
    onSuccess?: (responseData: Response) => void,
    onError?: (err: Error) => void
  ) => {
    setIsLoading(true);
    setIsError(false);
    request(body)
      .then((res) => {
        setData(res.data);
        if (onSuccess) onSuccess(res.data);
      })
      .catch((err: Error) => {
        if (onError) onError(err);
      })
      .finally(() => setIsLoading(false));
  };

  return { isLoading, isError, data, makeRequest };
}
