import NormalizedName from '../utils/ParaName';
import RouteName from '../utils/RouteName';

export const SUCCESS = "SUCCESS";
export const FAILED = "FAILED";
export const IN_PROGRESS = "IN_PROGRESS";
export const NOT_UPDATE = "NOT_UPDATE";
export const FILE_NAME_ERROR = "FILE_NAME_ERROR";

export const MODEL_FILE = "MODEL_FILE";
export const MODEL_CONFIG = "MODEL_CONFIG";
export const MODEL_DOC = "MODEL_DOC";
export const MODEL_PREPROCESS = "MODEL_PREPROCESS";
export const ACCESS_CONTROL = "ACCESS_CONTROL";
export const MODEL_PLATFORM = "MODEL_PLATFORM";

export const ALGORITHM_LIST_REQUEST_POSTS = 'ALGORITHM_LIST_REQUEST_POSTS';
export const ALGORITHM_LIST_RECEIVE_SUCCESS_POSTS = 'ALGORITHM_LIST_RECEIVE_SUCCESS_POSTS';
export const ALGORITHM_LIST_RECEIVE_FAILED_POSTS = 'ALGORITHM_LIST_RECEIVE_FAILED_POSTS';

export const MODEL_UPDATE_INFO_INITIALIZE = 'MODEL_UPDATE_INFO_INITIALIZE';
export const UPDATE_MODEL_UPDATE_INFO = "UPDATE_MODEL_UPDATE_INFO";

export const MODEL_FILE_UPDATE_REQUEST = "MODEL_FILE_UPDATE_REQUEST";
export const MODEL_FILE_UPDATE_SUCCESS = "MODEL_FILE_UPDATE_SUCCESS";
export const MODEL_FILE_UPDATE_FAILED = "MODEL_FILE_UPDATE_FAILED";


export function requestPosts() {
    return ({type: ALGORITHM_LIST_REQUEST_POSTS})
}


export function receiveSuccessResult(res) {
    return ({
        type: ALGORITHM_LIST_RECEIVE_SUCCESS_POSTS,
        content: res
    })
}

export function receiveFailedResult() {
    return {type: ALGORITHM_LIST_RECEIVE_FAILED_POSTS,}
}

export function initializeUpdateInfo(res){
    return {type: MODEL_UPDATE_INFO_INITIALIZE, content: res}
}

export function updateModelUpdateInfo(infoCategory, infoType, updateInfoTime, unifiedName){
    return {type: UPDATE_MODEL_UPDATE_INFO, infoCategory: infoCategory, unifiedName: unifiedName, infoType: infoType,
        updateInfoTime: updateInfoTime}
}

export function fetchModelListPosts() {
    return function(dispatch, getState) {
        dispatch(requestPosts());
        let url = RouteName.B_ALGORITHM_MANAGEMENT + RouteName.FETCH_MODEL_LIST;
        let token = getState().session.authenticToken;
        let header = {'Authorization': token};
        return fetch(url, {method: NormalizedName.GET, headers: header})
            .then(res => res.json())
            .then(
                res => {
                    if(res.status && !(res.status === '200' || res.status === 200)){
                        dispatch(receiveFailedResult());
                        console.log('Unknown: Error, get algorithm info failed')
                    }
                    else{
                        dispatch(receiveSuccessResult(res));
                        console.log('get algorithm info succeed');

                        //初始化所有模型更新信息的状态
                        let modelUpdateInfo = {
                            updateModelFile:{},
                            updateModelConfig:{},
                            updateModelDoc:{},
                            updatePreprocess:{},
                            updateAccessControl:{},
                            updatePlatForm:{},
                        };
                        for(let item of res){
                            const unifiedName = item['mainCategory']+ "_"+item['modelEnglishName']+
                                "_"+ item['modelEnglishFunctionName'];
                            const defaultDate = new Date(1970, 1, 1, 0, 0, 0, 0);
                            modelUpdateInfo.updateModelFile[unifiedName]=[NOT_UPDATE, defaultDate];
                            modelUpdateInfo.updateModelConfig[unifiedName]=[NOT_UPDATE, defaultDate];
                            modelUpdateInfo.updateModelDoc[unifiedName]=[NOT_UPDATE, defaultDate];
                            modelUpdateInfo.updatePreprocess[unifiedName]=[NOT_UPDATE, defaultDate];
                            modelUpdateInfo.updateAccessControl[unifiedName]=[NOT_UPDATE, defaultDate];
                            modelUpdateInfo.updatePlatForm[unifiedName]=[NOT_UPDATE, defaultDate];
                        }
                        dispatch(initializeUpdateInfo(modelUpdateInfo))
                    }
                }
            );
    }
}

export function modelUpdatePost(mainCateGory, algorithmMainCategory, algorithmSubCategory, file){
    return function(dispatch, getState) {
        dispatch(requestPosts());
        let url = RouteName.B_ALGORITHM_MANAGEMENT + RouteName.FETCH_MODEL_LIST;
        let token = getState().session.authenticToken;
        let header = {'Authorization': token};
        return fetch(url, {method: NormalizedName.GET, headers: header})
            .then(res => res.json())
            .then(
                res => {
                    if(res.status && !(res.status === '200' || res.status === 200)){
                        dispatch(receiveFailedResult());
                        console.log('Unknown: Error, get algorithm info failed')
                    }
                    else{
                        dispatch(receiveSuccessResult(res));
                        console.log('get algorithm info succeed');

                    }
                }
            );
    }
}