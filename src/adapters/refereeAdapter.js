import { getAllReferee } from "src/services/refereeRequest";
import useSWR from "swr";
import { swrConfigs } from "./swrConfigs";



export function useAllReferee( params) {
  const { data, mutate, error } = useSWR([ params , "all_referee"], getAllReferee, swrConfigs);

  const loading = !data && !error;

  return {
    loading,
    referees: data,
    mutate,
  };
}

