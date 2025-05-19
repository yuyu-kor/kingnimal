import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchEndangeredAnimals = (page) => {
  return api.get(`/taxa?threatened=true`, {
    params: {
      rank: "species",
      is_active: true,
      page: page,
      per_page: 8,
      locale: "ko",
    },
  });
};

export const useEndangeredAnimals = (page) => {
  return useQuery({
    queryKey: ["endangered-animals", page],
    queryFn: () => fetchEndangeredAnimals(page),
    select: (result) => result.data,
    refetchOnWindowFocus: false,
  });
};
