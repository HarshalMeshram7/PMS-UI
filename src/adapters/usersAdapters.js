import { getAllUser,getAllUser2, getUser } from "src/services/userRequests";
import useSWR from "swr";
import { swrConfigs } from "./swrConfigs";



export function useAllUser( params) {
  const { data, mutate, error } = useSWR([ params , "all_users"], getAllUser, swrConfigs);

  const loading = !data && !error;

  return {
    loading,
    users: data,
    mutate,
  };
}
export function useAllUser2( params) {
  const { data, mutate, error } = useSWR([ params , "all_users2"], getAllUser2, swrConfigs);

  const loading = !data && !error;

  return {
    loading,
    users: data,
    mutate,
  };
}
