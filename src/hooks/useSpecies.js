import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSpecies = () => {
  return api.get(`/taxa`, {
    params: {
      rank: "species",
      is_active: true,
    },
  });
};

export const useSpeciesQuery = () => {
  return useQuery({
    queryKey: ["species"],
    queryFn: fetchSpecies,
    select: (result) => result.data,
    refetchOnWindowFocus: false,
  });
};
