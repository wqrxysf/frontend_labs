import { useDispatch } from "react-redux";
import actionCreators from "../store/redux/actionCreators";
import { bindActionCreators } from "redux";

const useAppActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actionCreators, dispatch);
};

export { useAppActions };
