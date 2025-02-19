import { createReducer, on } from "@ngrx/store";
import { loadFooterLinks, loadFooterLinksFailure, loadFooterLinksSuccess } from "./actions";
import { FooterState } from "./_interfaces";

const initialState: FooterState = {
    links: {data: [], error: null, loading: false}
}

export const footerReducer = createReducer(initialState,
    on(loadFooterLinks, (state) => ({
        ...state,
        links: {
            ...state.links,
            loading: true
        }
    })),
    on(loadFooterLinksSuccess, (state, {data}) => ({
        ...state,
        links: {
            ...state.links,
            data,
            loading: false
        }
    })),
    on(loadFooterLinksFailure, (state, {error }) => ({
        ...state,
        links: {
            ...state.links,
            loading: false,
            error,
            
        }
    }))
)