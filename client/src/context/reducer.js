import {
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
  SET_EDIT_STORY,
  DELETE_STORY_BEGIN,
  EDIT_STORY_BEGIN,
  EDIT_STORY_SUCCESS,
  EDIT_LOG_SUCCESS,
  EDIT_STORY_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  GET_USERS_SUCCESS,
  GET_REPLIES_SUCCESS,
  GET_SUBREPLIES_SUCCESS,
  CREATE_LOG_SUCCESS,
  GET_LOGS_SUCCESS,
  SET_EDIT_LOG,
} from "./actions";

import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values!",
    };
  }
  if (action.type === MAX_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "The title must be below 50 characters!",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }

  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: true,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.alertText,
    };
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
    };
  }
  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: "success",
      alertText: "User Profile Updated!",
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === HANDLE_CHANGE) {
    console.log([action.payload.name], action.payload.value);
    return {
      ...state,
      page: 1,
      [action.payload.name]: action.payload.value,
    };
  }
  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      editStoryId: "",
      title: "",
      story: "",
      log: "",
      day: "",
    };

    return {
      ...state,
      ...initialState,
    };
  }
  if (action.type === CREATE_STORY_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === CREATE_STORY_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New Story Created!",
    };
  }

  if (action.type === CREATE_LOG_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New Dear Sobriety Created!",
    };
  }

  if (action.type === CREATE_STORY_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === GET_STORIES_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_STORIES_SUCCESS) {
    console.log(action.payload.stories);
    return {
      ...state,
      isLoading: false,
      stories: action.payload.stories,
      totalStories: action.payload.totalStories,
      numOfPages: action.payload.numOfPages,
    };
  }
  if (action.type === GET_SAVES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      saves: action.payload.saves,
    };
  }

  if (action.type === GET_LOGS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      logs: action.payload.logs,
    };
  }
  if (action.type === GET_USERS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      users: action.payload.users,
      totalStories: action.payload.totalStories,
      numOfPages: action.payload.numOfPages,
    };
  }
  if (action.type === GET_REPLIES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      replies: action.payload.replies,
    };
  }
  if (action.type === GET_SUBREPLIES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      subreplies: action.payload.subreplies,
    };
  }
  if (action.type === SET_EDIT_STORY) {
    const story_info = state.stories.find(
      (job) => job._id === action.payload.id
    );
    const { title, story, _id } = story_info;
    return {
      ...state,
      isEditing: true,
      editStoryId: _id,
      title,
      story,
    };
  }
  if (action.type === SET_EDIT_LOG) {
    const story_info = state.logs.find((log) => log._id === action.payload.id);
    console.log(story_info);
    const { day, log, _id } = story_info;
    return {
      ...state,
      isEditing: true,
      editLogId: _id,
      day,
      log,
    };
  }
  if (action.type === DELETE_STORY_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_STORY_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === EDIT_STORY_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Story Updated!",
      msg: "/",
    };
  }
  if (action.type === EDIT_LOG_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Dear Sobriety Updated!",
      msg: "/",
    };
  }
  if (action.type === EDIT_STORY_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === SHOW_STATS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }
  if (action.type === SHOW_STATS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      stats: action.payload.stats,
      monthlyApplications: action.payload.monthlyApplications,
    };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      search: "",
      searchStatus: "all",
      searchType: "all",
      sort: "latest",
    };
  }
  if (action.type === CHANGE_PAGE) {
    return { ...state, page: action.payload.page };
  }
  throw new Error(`no such action : ${action.type}`);
};

export default reducer;

