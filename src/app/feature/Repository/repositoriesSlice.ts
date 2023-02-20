import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../../store";
import { Repository } from "../../../types/Repository";
import { normalizeRepositoryResponse } from "../../../utils/normilizer";
import { searchRepositories } from "./service";

interface RepositoriesState {
    items: Repository[];
    totalCount: number | undefined;
    loading: boolean;
    error: string | null;
}

const initialState: RepositoriesState = {
    items: [],
    totalCount: undefined,
    loading: false,
    error: null,

};

export const repositoriesSlice = createSlice({
    name: "repositories",
    initialState,
    reducers: {
        setRepositories: (state, action: PayloadAction<{total_count:number, items:Repository[]}>) => {
            state.items = normalizeRepositoryResponse(action.payload?.items);
            state.totalCount = action.payload.total_count;
            state.loading = false;
            state.error = null;
        },
        setLoading: (state) => {
            state.loading = true;
            state.error = null;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { setRepositories, setLoading, setError } = repositoriesSlice.actions;

export const fetchRepositories = (query: string, page: number, pageSize:number): AppThunk => async (dispatch: any) => {
    dispatch(setLoading());
    try {
        const result = await searchRepositories(query, page, pageSize);
        dispatch(setRepositories(result));
    } catch (error: any) {
        dispatch(setError(error.message));
    }
};

export const selectRepositories = (state: { repositories: RepositoriesState }) => state.repositories.items;
export const selectLoading = (state: { repositories: RepositoriesState }) => state.repositories.loading;
export const selectError = (state: { repositories: RepositoriesState }) => state.repositories.error;

export default repositoriesSlice.reducer;

