import axios from "axios";

import { useNetwork } from "@/utils/useNetwork";

export function useDeleteContact(id: number) {
  return useNetwork(() => {
    return axios.delete("/api/contact/" + id);
  });
}
