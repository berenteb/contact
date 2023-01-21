import axios from "axios";

import { useNetwork } from "@/utils/useNetwork";

export function useUpdateContact(id: number) {
  return useNetwork((body: FormData) => {
    return axios.patch("/api/contact/" + id, body);
  });
}
