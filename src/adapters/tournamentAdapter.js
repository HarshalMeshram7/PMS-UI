import { getAllTournament } from "src/services/tournamentRequest";
import useSWR from "swr";
import { swrConfigs } from "./swrConfigs";

export function useAllTournament( params) {
  const { data, mutate, error } = useSWR([ params , "all_tournament"], getAllTournament, swrConfigs);

  const loading = !data && !error;

  return {
    loading,
    tournaments: data,
    mutate,
  };
}

