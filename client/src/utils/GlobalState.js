import React, { useState, useContext, createContext, useReducer } from "react";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
	clientId: "2ae77a009ef04f15b6de9046ff925ebb",
});

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
	const [state, dispatch] = useProductReducer({
		products: [],
		cart: [],
		cartOpen: false,
		categories: [],
		currentCategory: "",
	});

	return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
	return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };


// ------------------------------------------------------ //


// Create our authorization (user logged in/out) context using React.CreateContext()
export const AuthContext = React.createContext();

// Create a custom hook that allows easy access to our AuthContext values
export const UserAuthorized = () => useContext(AuthContext);

export const LoginUserProvider = ({ code }) => {
	// Function to get user name (display_name)
	function getMyData() {
		(async () => {
			const me = await spotifyApi.getMe();

			const displayName = me.body.display_name;
			const email = me.body.email;
			const userSpotifyId = me.body.id;
			const userProfilePic = me.body.images[0];
			const userAccountType = me.body.product;
			const userSpotifyAccount = me.body.external_urls.spotify;

			return [
				displayName,
				email,
				userSpotifyId,
				userProfilePic,
				userAccountType,
				userSpotifyAccount,
			];
		})().catch((err) => {
			console.error(err);
		});
	}

	console.log(getMyData);

	const [user, setUser] = useState([
		{
			id: userSpotifyId,
			name: displayName,
			email: email,
			profilePic: userProfilePic,
			accountType: userAccountType,
			spotifyLink: userSpotifyAccount,
		},
	]);

	// The value prop expects an initial state object
	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{code}
		</AuthContext.Provider>
	);
};
