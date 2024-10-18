import { createSlice, configureStore } from '@reduxjs/toolkit';

const chatActive = createSlice({
  name: 'chatActive',
  initialState: {
    isActive: false,
    email: '',
  },
  reducers: {
    setChatActive: (state, action) => {
      state.isActive = action.payload;
    },
    setChatActiveEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

const registerUserInfo = createSlice({
  name: 'registerUserInfo',
  initialState: {
    eventCode: '',
    email: '',
    emailCert: false,
    password: '',
    gender: '',
    name: '',
    birth: null,
    univ: '',
    department: '',
    nickname: '',
    mbti: '',
    height: 0,
    drinkLimit: 0,
    smoking: false,
    army: false,
    hobby: null,
    datingType: null,
    univCert: false,
    introduction: '',
    profileImg: '',
    studentIDImg: '',
    chatroomID: '',
    religion: '',
    role: 'normal',
  },
  reducers: {
    setStoreEventCode: (state, action) => {
      state.eventCode = action.payload;
    },
    setStoreReligion: (state, action) => {
      state.religion = action.payload;
    },
    setStoreGender: (state, action) => {
      state.gender = action.payload;
    },
    setStoreName: (state, action) => {
      state.name = action.payload;
    },
    setStoreBirth: (state, action) => {
      state.birth = action.payload;
    },
    setStoreUniv: (state, action) => {
      state.univ = action.payload;
    },
    setStoreDepartment: (state, action) => {
      state.department = action.payload;
    },
    setStoreEmail: (state, action) => {
      state.email = action.payload;
    },
    setStoreEmailCert: (state, action) => {
      state.emailCert = action.payload;
    },
    setStoreNickname: (state, action) => {
      state.nickname = action.payload;
    },
    setStorePassword: (state, action) => {
      state.password = action.payload;
    },
    setStoreMbti: (state, action) => {
      state.mbti = action.payload;
    },
    setStoreHeight: (state, action) => {
      state.height = action.payload;
    },
    setStoreDrinkLimit: (state, action) => {
      state.drinkLimit = action.payload;
    },
    setStoreSmoking: (state, action) => {
      state.smoking = action.payload;
    },
    setStoreArmy: (state, action) => {
      state.army = action.payload;
    },
    setStoreHobby: (state, action) => {
      state.hobby = action.payload;
    },
    setStoreDatingType: (state, action) => {
      state.datingType = action.payload;
    },
    setStoreProfileImg: (state, action) => {
      state.profileImg = action.payload;
    },
    setStoreStudentIDImg: (state, action) => {
      state.studentIDImg = action.payload;
    },
    setStoreIntroduction: (state, action) => {
      state.introduction = action.payload;
    },
    setStoreChatroomID: (state, action) => {
      state.chatroomID = action.payload;
    },
    setStoreInitialize: (state, action) => {
      if (typeof action.payload === 'boolean' && action.payload) {
        state.eventCode = '';
        state.email = '';
        state.emailCert = false;
        state.password = '';
        state.gender = '';
        state.name = '';
        state.birth = null;
        state.univ = '';
        state.department = '';
        state.nickname = '';
        state.mbti = '';
        state.height = 0;
        state.drinkLimit = 0;
        state.smoking = false;
        state.army = false;
        state.hobby = null;
        state.datingType = null;
        state.univCert = false;
        state.introduction = '';
        state.profileImg = '';
        state.studentIDImg = '';
        state.chatroomID = '';
        state.religion = '';
        state.role = 'normal';
      }
    },
  },
});

export const {
  setStoreEventCode,
  setStoreGender,
  setStoreName,
  setStoreBirth,
  setStoreUniv,
  setStoreDepartment,
  setStoreEmail,
  setStoreEmailCert,
  setStoreNickname,
  setStorePassword,
  setStoreMbti,
  setStoreHeight,
  setStoreDrinkLimit,
  setStoreSmoking,
  setStoreArmy,
  setStoreHobby,
  setStoreDatingType,
  setStoreProfileImg,
  setStoreStudentIDImg,
  setStoreIntroduction,
  setStoreChatroomID,
  setStoreReligion,
  setStoreInitialize,
} = registerUserInfo.actions;

export const { setChatActive, setChatActiveEmail } = chatActive.actions;

export default configureStore({
  reducer: {
    registerUserInfo: registerUserInfo.reducer,
    chatActive: chatActive.reducer,
  },
});
