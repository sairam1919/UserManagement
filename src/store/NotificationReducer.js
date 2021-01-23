export default function(state = null, action) {
    switch(action.type) {
        case 'UPDATE_CULPRITS':
            // console.log("in reducer",action.payload )
            return action.payload;
    }
    return state
}