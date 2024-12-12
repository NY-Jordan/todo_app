export const initialState = {
    name: "exemple",
    exemples : [],
    error : false,
}

const  ExempleReducer = (state = initialState, action) => {
    switch (action.type) {
    default:
        return {...state};
    }
};

export default ExempleReducer;