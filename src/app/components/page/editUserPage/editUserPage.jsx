import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";
import { useAuth } from "../../../hooks/useAuth";
import { useProfessions } from "../../../hooks/useProfession";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    getQualities,
    getQualitiesByIds,
    getQualitiesLoadingStatus
} from "../../../store/qualities";

const EditUserPage = () => {
    const { currentUser, updateUserData } = useAuth();
    const { professions, isLoading: isLoadingProf } = useProfessions();
    const userQualities = useSelector(getQualitiesByIds(currentUser.qualities));
    const qualities = useSelector(getQualities());
    const isLoadingQual = useSelector(getQualitiesLoadingStatus());
    const history = useHistory();
    const [data, setData] = useState();

    useEffect(() => {
        if (!isLoadingProf && !isLoadingQual) {
            setData({
                name: currentUser.name,
                email: currentUser.email,
                profession: currentUser.profession,
                sex: currentUser.sex,
                qualities: userQualities.map(({ _id, name }) => {
                    return { label: name, value: _id };
                })
            });
        }
    }, [isLoadingProf, isLoadingQual]);

    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateUserData({
            ...currentUser,
            ...data,
            qualities: data.qualities.map((q) => q.value)
        });
        history.push(`/users/${currentUser._id}`);
    };

    const transformData = (data) => {
        return data.map((item) => ({ label: item.name, value: item._id }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {data && Object.keys(professions).length > 0 ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                defaultOption="Choose..."
                                options={transformData(professions)}
                                name="profession"
                                onChange={handleChange}
                                value={data.profession}
                                error={errors.profession}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                defaultValue={data.qualities}
                                options={transformData(qualities)}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите ваши качества"
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    ) : (
                        "Loading..."
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
