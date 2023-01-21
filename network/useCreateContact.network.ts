import axios from "axios";

import { useNetwork } from "@/utils/useNetwork";

export function useCreateContact() {
  return useNetwork((body: FormData) => {
    return axios.post("/api/contact", body);
  });
}
