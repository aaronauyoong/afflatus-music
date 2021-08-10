import { useReducer } from 'react';
import { LOGGED_IN } from "./actions";

export default function reducer(state, action) {
	switch (action.type) {
		case LOGGED_IN:
			return {
				...state,
				user: [...state.user, action.payload],
			};
		default:
			return state;
	}
}

export function useLoginReducer(initialState) {
	return useReducer(reducer, initialState);
}
