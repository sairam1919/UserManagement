export function selectBookAction(book) {
    // console.log("actions being called",book)
    return {
        type: 'UPDATE_CULPRITS',
        payload: book
    }
}