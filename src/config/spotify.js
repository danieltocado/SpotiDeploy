export const authEndpoint = "https://accounts.spotify.com/authorize";

const clientId = "8ff1a7ee0f904318b9f38b37e6067262";

const redirectUri = "https://spotify-clone-wine.vercel.app/home"; //"http://localhost:3000/home"; 

const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state"
];

export const getToken = () => {
    return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
        var parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1])

        return initial
    }, {})
}

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;