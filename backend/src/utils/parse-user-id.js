export default function parseUserID(token) {
    try {
        const parts = token.split(".");
        const decodedPayload = JSON.parse(atob(parts[1]));
        return decodedPayload["sub"];
    } catch (error) {
        return { error: error.message };
    }
}