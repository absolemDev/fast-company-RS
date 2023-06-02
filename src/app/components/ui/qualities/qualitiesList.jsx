import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useSelector } from "react-redux";
import { getQualitiesLoadingStatus } from "../../../store/qualities";

const QualitiesList = ({ qualities }) => {
    const isLoading = useSelector(getQualitiesLoadingStatus());
    if (isLoading) return "Loading...";
    return (
        <>
            {qualities.map((qual) => (
                <Quality key={qual} id={qual} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
