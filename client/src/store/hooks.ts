import { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector,useStore } from "react-redux";
import type { AppStore, AppDispatch, RootState } from "./store";

// for use throughout the whole app instead of plain 'useDispatch' and 'useSelector'
export const useAppDispatch: () => AppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector.withTypes<RootState>();
export const useAppStore: () => AppStore = useStore.withTypes<AppStore>();