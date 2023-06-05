import React, { useReducer, useContext } from "react";

import reducer from "./reducer";
import axios from "axios";
import {
  GET_USERS_SUCCESS,
  DISPLAY_ALERT,
  MAX_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_STORY_BEGIN,
  CREATE_STORY_SUCCESS,
  CREATE_STORY_ERROR,
  GET_STORIES_BEGIN,
  GET_SAVES_SUCCESS,
  GET_STORIES_SUCCESS,
  GET_LOGS_SUCCESS,
  SET_EDIT_STORY,
  DELETE_STORY_BEGIN,
  EDIT_STORY_BEGIN,
  EDIT_STORY_SUCCESS,
  EDIT_STORY_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  GET_REPLIES_SUCCESS,
  GET_SUBREPLIES_SUCCESS,
  CREATE_LOG_SUCCESS,
  SET_EDIT_LOG,
  EDIT_LOG_SUCCESS
} from "./actions";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  isLoading: false,
  showAlert: false,
  subreplyIds:[],
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  showSidebar: false,
  isEditing: false,
  editStoryId: "",
  editLogId:"",
  title: "",
  story: "",
  status: "pending",
  totalStories: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
  reply: "",
  storyId: "",
  day:"",
  log:"",
  saves:[]
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // axios
  const authFetch = axios.create({
    baseURL: "/api/v1",
  });
  // request

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
    if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };
  const maxAlert = () => {
    dispatch({ type: MAX_ALERT });
    clearAlert();
  };
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("image", JSON.stringify(user.image));
    localStorage.setItem("_id", JSON.stringify(user._id));
    localStorage.setItem("alias", JSON.stringify(user.alias));
    localStorage.setItem("token", token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );

      const { user, token } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, alertText },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };
  const updateUser = async (currentUser) => {
    let userId=localStorage
    .getItem("user")
    .split(",")[0]
    .replace('{"_id":', "")
    .replace(/['"]+/g, "");
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);

      const { user, token } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, token },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };
  const createStory = async () => {
    const alias = localStorage.getItem("alias").slice(1, -1);
    const image = localStorage.getItem("image").slice(1, -1);
    const createdBy = localStorage
      .getItem("user")
      .split(",")[0]
      .replace('{"_id":', "")
      .replace(/['"]+/g, "");
    
    
    try {
      const { title, story } = state;
      await authFetch.post("/stories", {
        title,
        story,
        createdBy

      });
      dispatch({ type: CREATE_STORY_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
      findResource(story)
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_STORY_ERROR,
        payload: { msg: error.response.data.msg },
      });
      if (error.response.status === 429){
        dispatch({
          type: CREATE_STORY_ERROR,
          payload: { msg: 'Try again later. You can only post a story once every 5 minutes.' ,warning:false},
        });
      } 
    }

    clearAlert();
  };

  const createLog = async () => {
    const {
      day,
      log } = state;
    const createdBy = localStorage
      .getItem("user")
      .split(",")[0]
      .replace('{"_id":', "")
      .replace(/['"]+/g, "");
    dispatch({ type: CREATE_STORY_BEGIN });
    if (isNaN(day)){
      dispatch({
        type: CREATE_STORY_ERROR,
        payload: { msg: 'Day Must be an Integer.' ,warning:false},
      });
    }
    else{
    try {
      await authFetch.post("/stories/log", {
        day,
        log,
        createdBy
      });
      dispatch({ type: CREATE_LOG_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      if (error.response.status === 400){
        dispatch({
          type: CREATE_STORY_ERROR,
          payload: { msg: 'Try again later. You can only post a Dear Sobriety once every 5 minutes.' ,warning:false},
        });
      };
    }
  }
    clearAlert();
  };

  const createReply = async (storyId, reply) => {
    const createdBy = localStorage
      .getItem("user")
      .split(",")[0]
      .replace('{"_id":', "")
      .replace(/['"]+/g, "");
    dispatch({ type: CREATE_STORY_BEGIN });
    try {
      await authFetch.post("/reply", {
        reply,
        storyId,
        createdBy,
      });
  
    } catch (error) {
      if (error.response.status === 401) return;
    }
  };

  const addSave = async (savedId) => {
    const createdBy = localStorage
      .getItem("user")
      .split(",")[0]
      .replace('{"_id":', "")
      .replace(/['"]+/g, "");
    dispatch({ type: CREATE_STORY_BEGIN });
    try {
      await authFetch.post("/stories/save", {
        savedId,
        createdBy,
      });
      getSaves()
  
    } catch (error) {
      if (error.response.status === 401) return;
    }
  };

  const createSubReply = async (subreply, replyId, createdByReplyId) => {
    const createdBy = localStorage
      .getItem("user")
      .split(",")[0]
      .replace('{"_id":', "")
      .replace(/['"]+/g, "");
    dispatch({ type: CREATE_STORY_BEGIN });
    try {
      await authFetch.post("/reply/sub", {
        subreply,
        replyId,
        createdByReplyId,
        createdBy,
      });
      // dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
    }
  };

  const getStories = async (userId) => {
    const { page, search, searchStatus, searchType, sort } = state;

    let url = `/stories?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_STORIES_BEGIN });
    try {
      const { data } = await authFetch(url,{userId});
      const { stories } = data;
      dispatch({
        type: GET_STORIES_SUCCESS,
        payload: {
          stories,
        },
      });
    } catch (error) {
      logoutUser();
    }
  };

  const getLogs = async (userId) => {
    const { page, search, searchStatus, searchType, sort } = state;

    let url = `/stories?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
 
    dispatch({ type: GET_STORIES_BEGIN });
    try {
      const { data } = await authFetch(url,{userId});
      const { logs } = data;
      dispatch({
        type: GET_LOGS_SUCCESS,
        payload: {
          logs,
        },
      });
    } catch (error) {
      logoutUser();
    }
  };

  const getReplies = async () => {
    let url = `/stories`;

    dispatch({ type: GET_STORIES_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { replies } = data;
      
      dispatch({
        type: GET_REPLIES_SUCCESS,
        payload: {
          replies,
        },
      });
    } catch (error) {
      logoutUser();
    }
    // clearAlert();
  };

  const getSaves = async () => {
    let url = `/stories/getSave`;
    const createdBy = localStorage
      .getItem("user")
      .split(",")[0]
      .replace('{"_id":', "")
      .replace(/['"]+/g, "");

    dispatch({ type: GET_STORIES_BEGIN });
    try {
      const { data } = await authFetch.post(url, {createdBy});
      const { saves } = data;

      dispatch({
        type: GET_SAVES_SUCCESS,
        payload: {
          saves,
        },
      });
    } catch (error) {
      logoutUser();
    }
    // clearAlert();
  };

  const getSubReplies = async () => {
    let url = `/stories`;
    const { subreplyIds } = state;
    

    dispatch({ type: GET_STORIES_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { subreplies } = data;
      
      subreplyIds.length=0
      subreplies?.map((subreply,index)=>{
        subreplyIds.push(subreply["replyId"])
      })

      dispatch({
        type: GET_SUBREPLIES_SUCCESS,
        payload: {
          subreplies,
          subreplyIds
        },
      });
    } catch (error) {
      logoutUser();
    }
    // clearAlert();
  };

  const getUsers = async (userId) => {
    const { page, search, searchStatus, searchType, sort } = state;

    let url = `/stories?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}&id=${userId}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_STORIES_BEGIN });
    try {
      const { data } = await authFetch(url);

      const { users } = data;
      dispatch({
        type: GET_USERS_SUCCESS,
        payload: {
          users,
        },
      });
    } catch (error) {
      logoutUser();
    }
  };

  const findResource = async (prompt) => {
    try {
      const { data } = await axios.post(
        `/find-resource`,
        {prompt}
      );
      console.log(prompt)
    } catch (error) {
      // logoutUser();
    }
  };
  const setEditJob = (id) => {
    dispatch({ type: SET_EDIT_STORY, payload: { id } });
  };

  const setEditLog = (id) => {
  
    dispatch({ type: SET_EDIT_LOG, payload: { id } });
  };
  const editJob = async () => {
    dispatch({ type: EDIT_STORY_BEGIN });
    
    try {
      const { title, story } = state;
      await authFetch.patch(`/stories/${state.editStoryId}`, {
        story,
        title,
      });
      dispatch({ type: EDIT_STORY_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_STORY_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const editLog = async () => {
    dispatch({ type: EDIT_STORY_BEGIN });
    try {
      const { day, log } = state;
      await authFetch.patch(`/stories/log/${state.editLogId}`, {
        day,
        log,
      });
      dispatch({ type: EDIT_LOG_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_STORY_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const deleteJob = async (jobId) => {
    dispatch({ type: DELETE_STORY_BEGIN });
    try {
      await authFetch.delete(`/stories/${jobId}`);
      // deleteReplybyStory(jobId)
      getStories();
    } catch (error) {
      // logoutUser();
    }

    
  };

  const deleteSave = async (id) => {
    dispatch({ type: DELETE_STORY_BEGIN });
    try {
      await authFetch.delete(`/stories/save/${id}`);
      getSaves();
    } catch (error) {
      // logoutUser();
    }

    
  };

  const deleteLog = async (logId) => {
    dispatch({ type: DELETE_STORY_BEGIN });
    try {
      await authFetch.delete(`/stories/log/${logId}`);
      // deleteReplybyStory(jobId)
      getLogs();
    } catch (error) {
      // logoutUser();
    }
  };

  const deleteReply = async (replyId) => {
    dispatch({ type: DELETE_STORY_BEGIN });
    try {
      await authFetch.delete(`/reply/${replyId}`);
      getReplies();
    } catch (error) {}
  };

  const deleteSubReply = async (replyId) => {
    dispatch({ type: DELETE_STORY_BEGIN });
    try {
      await authFetch.delete(`/reply/sub/${replyId}`);
      getSubReplies();
    } catch (error) {}
  };
  const deleteReplybyStory = async (storyId) => {
    dispatch({ type: DELETE_STORY_BEGIN });
    try {
      await authFetch.delete(`/reply/${storyId}`);
    } catch (error) {
    }
  };
  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authFetch("/stories/stats");
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };
  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createStory,
        getStories,
        setEditJob,
        deleteJob,
        editJob,
        showStats,
        clearFilters,
        changePage,
        maxAlert,
        getUsers,
        createReply,
        getReplies,
        deleteReply,
        deleteReplybyStory,
        createSubReply,
        getSubReplies,
        deleteSubReply,
        createLog,
        getLogs,
        editLog,
        setEditLog,
        deleteLog,
        addSave,
        getSaves,
        deleteSave,
        findResource
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
