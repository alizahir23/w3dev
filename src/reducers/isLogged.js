const loggedReducer = (state = { name: "guest", tasks: [] }, action) => {
    switch (action.type) {
        case "SET_USER":
            return action.payload
        case "GET_USER":
            return state
        default:
            return state
    }
}

export default loggedReducer