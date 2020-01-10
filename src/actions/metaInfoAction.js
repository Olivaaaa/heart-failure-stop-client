export const CREATE_NEW_QUERY = 'CREATE_NEW_QUERY';
export const EDIT_QUERY_NAME = 'EDIT_QUERY_NAME';
export const DELETE_QUERY = 'DELETE_QUERY';
export const META_INFO_SET_STATE = "META_INFO_SET_STATE";

export function metaInfoSetState(newState) {
    return ({type: META_INFO_SET_STATE, newState: newState})
}

export function createNewQuery(queryType) {
    return ({type: CREATE_NEW_QUERY, queryType: queryType})
}

export function editQueryName(id, name) {
    return ({type: EDIT_QUERY_NAME, id: id, name: name})
}

export function deleteQuery(id) {
    return ({type: DELETE_QUERY, id: id})
}