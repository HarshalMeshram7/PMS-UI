import { getAllCoach } from "src/services/coachRequest";
import useSWR from "swr";
import { swrConfigs } from "./swrConfigs";


export function useAllCoach( params) {
  const { data, mutate, error } = useSWR([ params , "all_coach"], getAllCoach, swrConfigs);

  const loading = !data && !error;

  return {
    loading,
    coaches: data,
    mutate,
  };
}
