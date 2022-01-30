import { useDispatch } from "react-redux";
import { useSelector } from "../store";
import { commonAction } from "../store/common";


export default () => {
    const dispatch = useDispatch();
    const validateMode = useSelector((state) => state.common.validateMode);

    const setValiedateMode = (value: boolean) =>
        dispatch(commonAction.setValidateMode(value));

    return {validateMode, setValiedateMode};
};


