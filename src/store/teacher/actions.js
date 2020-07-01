import { apiUrl } from '../../config/constants';
import axios from 'axios';
import { selectTeacherToken } from './selectors';
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from '../appState/actions';

export const LOGIN_SUCCESS_TEACHER = 'LOGIN_SUCCESS_TEACHER';
export const TOKEN_STILL_VALID_TEACHER = 'TOKEN_STILL_VALID_TEACHER';
export const LOG_OUT_TEACHER = 'LOG_OUT_TEACHER';

const loginSuccessTeacher = (teacherWithToken) => {
  return {
    type: LOGIN_SUCCESS_TEACHER,
    payload: teacherWithToken,
  };
};

const tokenStillValid = (teacherWithoutToken) => ({
  type: TOKEN_STILL_VALID_TEACHER,
  payload: teacherWithoutToken,
});

export const loginTeacher = (email, password, isStudent) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
        isStudent,
      });

      dispatch(loginSuccessTeacher(response.data));
      dispatch(showMessageWithTimeout('success', false, 'welcome back!', 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage('error', true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage('error', true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getTeacherWithStoredToken = () => {
  return async (dispatch, getState) => {
    const token = selectTeacherToken(getState());

    if (token === null) return;

    dispatch(appLoading());
    try {
      const response = await axios.get(`${apiUrl}/teacher`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      dispatch(logOutTeacher());
      dispatch(appDoneLoading());
    }
  };
};

export const logOutTeacher = () => ({ type: LOG_OUT_TEACHER });
