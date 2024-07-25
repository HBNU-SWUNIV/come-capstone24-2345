const { createSlice, configureStore } = require('@reduxjs/toolkit');

const registerUserInfo = createSlice({
  name: 'registerUserInfo',
  initialState: {
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
    height: '',
    drinkLimit: '',
    smoking: '',
    army: null,
    hobby: null,
    datingType: null,
    waitMatching: false,
    univCert: false,
    introduction: '',
    profileImg: '',
    IDCardImg: '',
    role: 'normal',
  },
  reducers: {
    setGlobalGender: (state, action) => {
      state.gender = action.payload;
    },
    setGlobalName: (state, action) => {
      state.name = action.payload;
    },
    setGlobalBirth: (state, action) => {
      state.birth = action.payload;
    },
    setGlobalUniv: (state, action) => {
      state.univ = action.payload;
    },
    setGlobalDepartment: (state, action) => {
      state.department = action.payload;
    },
    setGlobalEmail: (state, action) => {
      state.email = action.payload;
    },
    setGlobalEmailCert: (state, action) => {
      state.emailCert = action.payload;
    },
    setGlobalNickname: (state, action) => {
      state.nickname = action.payload;
    },
    setGlobalPassword: (state, action) => {
      state.password = action.payload;
    },
    setGlobalMbti: (state, action) => {
      state.mbti = action.payload;
    },
    setGlobalHeight: (state, action) => {
      state.height = action.payload;
    },
    setGlobalDrinkLimit: (state, action) => {
      state.drinkLimit = action.payload;
    },
    setGlobalSmoking: (state, action) => {
      state.smoking = action.payload;
    },
    setGlobalArmy: (state, action) => {
      state.army = action.payload;
    },
    setGlobalHobby: (state, action) => {
      state.hobby = action.payload;
    },
    setGlobalDatingType: (state, action) => {
      state.datingType = action.payload;
    },
    setGlobalProfileImg: (state, action) => {
      state.profileImg = action.payload;
    },
    setGlobalIDCardImg: (state, action) => {
      state.IDCardImg = action.payload;
    },
    setGlobalIntroduction: (state, action) => {
      state.introduction = action.payload;
    },
  },
});

export const {
  setGlobalGender,
  setGlobalName,
  setGlobalBirth,
  setGlobalUniv,
  setGlobalDepartment,
  setGlobalEmail,
  setGlobalEmailCert,
  setGlobalNickname,
  setGlobalPassword,
  setGlobalMbti,
  setGlobalHeight,
  setGlobalDrinkLimit,
  setGlobalSmoking,
  setGlobalArmy,
  setGlobalHobby,
  setGlobalDatingType,
  setGlobalProfileImg,
  setGlobalIDCardImg,
  setGlobalIntroduction,
} = registerUserInfo.actions;

export default configureStore({
  reducer: {
    registerUserInfo: registerUserInfo.reducer,
  },
});
