import React, { useContext, createContext } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { useLoginReducer } from './reducers'

const spotifyApi = new SpotifyWebApi({
	clientId: "2ae77a009ef04f15b6de9046ff925ebb",
});

// const me = spotifyApi.getMe();

const getMyData = () => {
    (async () => {
        const me = await spotifyApi.getMe();
        console.log(me.body);

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

getMyData();

console.log(getMyData)

const UserContext = createContext();
const { Provider } = UserContext;

const StoreProvider = ({ value = [], ...props }) => {
	const [state, dispatch] = useLoginReducer({
        // -------
        // displayName: me.body.display_name,
        // email: me.body.email,
        // userSpotifyId: me.body.id,
        // userProfilePic: me.body.images[0],
        // userAccountType: me.body.product,
        // userSpotifyAccount: me.body.external_urls.spotify

        displayName: "",
        email: "",
        userSpotifyId: "",
        userProfilePic: "",
        userAccountType: "",
        userSpotifyAccount: ""
	});

	return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
	return useContext(UserContext);
};

export { StoreProvider, useStoreContext };


// ------------------------------------------------------ //


// // Create our authorization (user logged in/out) context using React.CreateContext()
// export const AuthContext = React.createContext();

// // Create a custom hook that allows easy access to our AuthContext values
// export const UserAuthorized = () => useContext(AuthContext);

// export const UserLoginProvider = ({ code }) => {
// 	// Function to get user name (display_name)
// 	function getMyData() {
// 		(async () => {
// 			const me = await spotifyApi.getMe();

// 			const displayName = me.body.display_name;
// 			const email = me.body.email;
// 			const userSpotifyId = me.body.id;
// 			const userProfilePic = me.body.images[0];
// 			const userAccountType = me.body.product;
// 			const userSpotifyAccount = me.body.external_urls.spotify;

// 			return [
// 				displayName,
// 				email,
// 				userSpotifyId,
// 				userProfilePic,
// 				userAccountType,
// 				userSpotifyAccount,
// 			];
// 		})().catch((err) => {
// 			console.error(err);
// 		});
// 	}

// 	console.log(getMyData);

// 	const [user, setUser] = useState([
// 		{
// 			id: userSpotifyId,
// 			name: displayName,
// 			email: email,
// 			profilePic: userProfilePic,
// 			accountType: userAccountType,
// 			spotifyLink: userSpotifyAccount,
// 		},
// 	]);

// 	// The value prop expects an initial state object
// 	return (
// 		<AuthContext.Provider value={{  }}>
// 			{code}
// 		</AuthContext.Provider>
// 	);
// };
