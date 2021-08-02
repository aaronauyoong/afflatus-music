// Helper function to extract code from url parameters 

export default function urlCode() {
    const urlCode = new URLSearchParams(window.location.search).get("code");

    console.log(urlCode);

    return urlCode;
}