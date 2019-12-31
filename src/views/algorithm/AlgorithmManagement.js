import React, {
    useState,
    useEffect
} from 'react';
import {
    Button,
    colors,
    Typography
} from '@material-ui/core';
import {
    useDispatch,
    useSelector
} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import MainCategory from './MainCategory'
import SubCategory from './SubCategory'
import Content from './Content'
import {makeStyles} from "@material-ui/styles";
import {fetchPosts} from "../../actions/algorithmManagementAction";

export const MODEL_CATEGORY_PROGRESSION_ANALYSIS = "progressionAnalysis";
export const MODEL_CATEGORY_RISK_ASSESSMENT = "riskAssessment";
export const MODEL_CATEGORY_SURVIVAL_ANALYSIS = "survivalAnalysis";
export const MODEL_CATEGORY_TREATMENT_RECOMMENDATION = "treatmentRecommendation";
export const MODEL_CATEGORY_TREATMENT_COMPARISION = "treatmentComparison";
export const MODEL_CATEGORY_DATA_IMPUTATION = "dataImputation";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'white'
    },
    algorithmSelect:{
        height: "100%",
        width: '20%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    category: {
        height: '95%',
        width: "50%",
        backgroundColor: 'white',
        borderRightColor: colors.grey[200],
        borderRightStyle: 'solid',
        borderRightWidth: 1
    },
    addAlgorithm: {
        height: "5%",
        width: '100%',
        borderTopWidth: 1,
    },
    title:{
        height: '4%',
        width: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRightColor: colors.grey[200],
        borderRightStyle: 'solid',
        borderRightWidth: 1
    },
    categoryList: {
        height: '91%',
        width: '50%',
        borderRightColor: colors.grey[200],
        borderRightStyle: 'solid',
        borderRightWidth: 1
    },
    content: {
        height: "100%",
        width: '80%',
    },
    button: {
        height: "100%",
        width: '100%'
    },
    nullContainer: {
        display:'flex',
        height:'100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));

const algorithmTransfer= res =>{
    let algorithmMap = new Map();
    for(let item of res){
        const user = item['createUser'];
        const mainCategory = item['mainCategory'];
        const modelChineseName = item['modelChineseName'];
        const modelEnglishName = item['modelEnglishName'];
        const modelChineseFunctionName = item['modelChineseFunctionName'];
        const modelEnglishFunctionName = item['modelEnglishFunctionName'];
        const platform = item['platform'];
        const accessControl = item['accessControl'];
        const createTime = item['createTime'];
        const lastUpdateTime = item['lastUpdateTime'];

        if(!algorithmMap.has(mainCategory))
            algorithmMap.set(mainCategory, new Map());
        if(!algorithmMap.get(mainCategory).has(modelEnglishName))
            algorithmMap.get(mainCategory).set(modelEnglishName, [modelChineseName, new Map()]);
        algorithmMap.get(mainCategory).get(modelEnglishName)[1].set(
            modelEnglishFunctionName,
            {
                user:user, modelChineseFunctionName: modelChineseFunctionName,
                platform: platform, accessControl: accessControl, createTime: createTime,
                lastUpdateTime: lastUpdateTime
            })
    }
    return algorithmMap
};

const SquareButton = withStyles({
    root: {
        borderRadius: 0,
    },
})(Button);

const AlgorithmManagement = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    // 目前仅支持到这一程度，以后可以使用WebSocket技术更改，使得算法数据库更新时，后端可以通知前端
    // 这样就不用重新打开界面才能看到新载入的数据了
    useEffect(()=>{
        dispatch(fetchPosts())
    }, []);

    const user = useSelector(state=>state.session.user.userName);
    const algorithmList = useSelector(state=>state.algorithm.algorithmList);
    const algorithmMap = algorithmTransfer(algorithmList);

    const [selectedMainCateGory, setMainCateGory] = useState('NotSelected');
    const [selectedAlgorithmMainCategory, setAlgorithmMainCategory] = useState('NotSelected');
    const [selectedAlgorithmSubCategory, setAlgorithmSubCategory] = useState('NotSelected');

    // set sublist
    let algorithmSubList= [];
    if(selectedMainCateGory!=="NotSelected"&&selectedAlgorithmMainCategory!=="NotSelected"
        &&selectedAlgorithmMainCategory!=="noModel"){
        const algorithmSubKeyList = Array.from(algorithmMap.get(selectedMainCateGory).get(selectedAlgorithmMainCategory)[1].keys());
        for(let item of algorithmSubKeyList){
            const modelInfo = algorithmMap.get(selectedMainCateGory).get(selectedAlgorithmMainCategory)[1].get(item);
            algorithmSubList.push([modelInfo.modelChineseFunctionName, item])
        }
    }
    return (
        <div className={classes.root}>
            <div className={classes.algorithmSelect}>
                <div className={classes.title}>
                    <Typography variant="h5">
                        算法类型
                    </Typography>
                </div>
                <div className={classes.title}>
                    <Typography variant="h5">
                        具体功能
                    </Typography>
                </div>
                <div className={classes.categoryList}>
                    <MainCategory
                        expandPanel={selectedMainCateGory}
                        setExpandPanel={setMainCateGory}
                        selectedAlgorithm={selectedAlgorithmMainCategory}
                        setSelectedAlgorithm={setAlgorithmMainCategory}
                        algorithmMap={algorithmMap}
                    />
                </div>
                <div className={classes.categoryList}>
                    <SubCategory
                        selectedAlgorithmSubCategory={selectedAlgorithmSubCategory}
                        algorithmList={algorithmSubList}
                        setAlgorithmSubCategory={setAlgorithmSubCategory}
                        user={user}
                    />
                </div>
                <div className={classes.addAlgorithm}>
                    <SquareButton
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        添加新算法
                    </SquareButton>
                </div>
            </div>
            <div className={classes.content}>
                {(  selectedMainCateGory !== "NotSelected"
                    && selectedAlgorithmMainCategory !== "NotSelected"
                    && selectedAlgorithmSubCategory !== "NotSelected"
                )
                    ?
                    <Content
                        selectedMainCateGory={selectedMainCateGory}
                        selectedAlgorithmMainCategory={selectedAlgorithmMainCategory}
                        selectedAlgorithmSubCategory={selectedAlgorithmSubCategory}
                    />
                    :
                    <div className={classes.nullContainer}>
                        <Typography variant={'h4'}>
                            请选择算法
                        </Typography>
                    </div>
                }
            </div>
        </div>
    )
};

export default AlgorithmManagement