// Import our actions from our actions file
import { LOGGED_IN } from "./actions";

// Reducer accepts state and an action, returns a new state
export default function reducer(state, action) {
	switch (action.type) {
		case LOGGED_IN:
			return {
				...state,
                user: [...state.user, action.payload]
			};
		default:
			return state;
	}
}

// export function useProductReducer(initialState) {
//     return useReducer(reducer, initialState);
//   }
