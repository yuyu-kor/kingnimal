import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchEndangeredAnimals = () => {
  return api.get(`/taxa?threatened=true`, {
    params: {
      rank: "species",
      is_active: true,
    },
  });
};

export const useEndangeredAnimals = () => {
  return useQuery({
    queryKey: ["endangered-animals"],
    queryFn: fetchEndangeredAnimals,
    select: (result) => result.data,
    refetchOnWindowFocus: false,
  });
};
