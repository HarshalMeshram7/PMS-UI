import { getAllStaff } from "src/services/staffRequest";
import useSWR from "swr";
import { swrConfigs } from "./swrConfigs";



export function useAllStaff( params) {
  const { data, mutate, error } = useSWR([ params , "all_staff"], getAllStaff, swrConfigs);

  const loading = !data && !error;

  return {
    loading,
    staffs: data,
    mutate,
  };
}

