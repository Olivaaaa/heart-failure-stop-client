import React from 'react';
import AnalysisContent from "./AnalysisContent";
import AnalysisManagement from "./AnalysisManagement/AnalysisManagement";
import {makeStyles} from "@material-ui/styles";
import {colors} from "@material-ui/core";
import {useSelector} from "react-redux";
import individualAnalysisReducer from "../../reducers/individualAnalysisReducer";

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        height: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    management:{
        width: "20%",
        height: "100%",
        backgroundColor: 'white',
        borderRightColor: colors.grey[200],
        borderRightStyle: 'solid',
        borderRightWidth: 1
    },
    content:{
        width: "80%",
        height: "100%",
        backgroundColor: 'white'
    },
}));

const Analysis = () => {
    const classes = useStyles();
    const {nextID, metaInfoMap} = useSelector(state=>state.individual.metaInfo);

    return (
        <div className={classes.root}>
            <div className={classes.management}>
                <AnalysisManagement queryIndex={nextID}/>
            </div>
            <div className={classes.content}>
                <AnalysisContent/>
            </div>
        </div>
    )
};

export default Analysis