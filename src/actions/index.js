export const getUser = () => {
    return {
        type: "GET_USER"
    }
}
export const setUser = (data) => {
    return {
        type: "SET_USER",
        payload: data
    }
}