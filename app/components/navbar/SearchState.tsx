import create from "zustand";

type State = {
  searchState: any;
  setSearchState: (searchState: any) => void;
};

export const useSearchStateStore = create<State>((set) => ({
  searchState: {},
  setSearchState: (searchState) => set(() => ({ searchState })),
}));
