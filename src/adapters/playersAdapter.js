import { getAllPlayers } from "src/services/playersRequest";
import useSWR from "swr";
import { swrConfigs } from "./swrConfigs";

export function useAllPlayers(params) {
    const { data, mutate, error } = useSWR([params, "all_Academies"], getAllPlayers, swrConfigs);

    const loading = !data && !error;

    return {
        loading,
        players: data,
        mutate,
        error,
    };
}
