import * as axios from 'axios';
import {url, firebaseKey} from './config.js';

export const instance = axios.create({
  baseURL: url, //ngrok tunel IP for testing
});

const headers = {
  'Content-Type': 'application/json',
};

export const loginUser = async (phone_number, p) => {
  let data = JSON.stringify({
    phone_number,
    password: p,
  });

  return instance.post('/api/users/login/', data, {headers: headers});
};

export const checkSignUp = async (e) => {
  let data = JSON.stringify({
    email: e,
  });

  return instance.post('/api/users/check_signup/', data, {headers: headers});
};

export const checkSignUpPhone = async (phone_number) => {
let data = JSON.stringify({
    phone_number
  });

  return instance.post('api/users/send_verification_code', data, {headers: headers});
};

export const verifyCodePhone = async (phone_number, verification_code) => {
  let data = JSON.stringify({
    phone_number,
    verification_code,
  });

  return instance.post('api/users/verify_code', data, {headers: headers});
};

export const registerUser = async (e, p, phone, firstname, refferal_code) => {
  let data = JSON.stringify({
    email: e,
    password: p,
    phone_number: phone,
    firstname,
    refferal_code,
  });

  return instance.post('/api/users/signup/', data, {headers: headers});
};

export const confirmRegisterUser = async (e, token) => {
  let data = JSON.stringify({
    email: e,
  });

  return instance.post('/api/users/confirm_email_registration/', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const sendCode = async (e) => {
  let data = JSON.stringify({
    phone_number: e,
  });

  return instance.post('/api/users/send_password_reset_code/', data, {headers: headers});
};

export const checkCode = async (c) => {
  let data = JSON.stringify({
    restore_password_code: c,
  });

  return instance.post('/api/users/check_code/', data, {headers: headers});
};

export const resetPassword = async (e, p, restore_password_code) => {
  let data = JSON.stringify({
    phone_number: e,
    password: p,
    restore_password_code,
  });

  return instance.put('/api/users/reset_password/', data, {headers: headers});
};

export const dataAboutUser = async (token) => {
  return instance.get('/api/users/profile/create_update/', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const dataAboutUserUpdate = async (
  firstname,
  loc,
  gen,
  eth,
  polit,
  pers,
  body,
  relig,
  age,
  height,
  employment_status,
  education,
  smoking,
  alcohol,
  kids,
  token,
) => {
  
  const data = new FormData();
  data.append('firstname', firstname);
  data.append('location', loc);
  data.append('gender', gen);
  data.append('ethnicity', eth);
  data.append('politics', polit);
  data.append('personality', pers);
  data.append('body_type', body);
  data.append('religion', relig);
  data.append('age', age);
  data.append('height', height);
  data.append('employment_status', employment_status);
  data.append('education', education)
  data.append('smoking', smoking)
  data.append('alcohol', alcohol)
  data.append('kids', kids)

  return instance.patch('/api/users/profile/create_update/', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const userInterest = async (
  gender,
  maxAge,
  minAge,
  maxHeight,
  minHeight,
  kids,
  ethnicity,
  personality,
  education,
  notFound,
  token
) => {
  const data = new FormData();
  data.append('interest_gender', gender);
  data.append('interest_max_age', maxAge);
  data.append('interest_min_age', minAge);
  data.append('interest_max_height', maxHeight);
  data.append('interest_min_height',  minHeight);
  data.append('interest_kids', kids);
  data.append('interest_ethnicity', ethnicity);
  data.append('interest_personality', personality);
  data.append('interest_education', education);

  if(notFound) {
    return instance.post('/api/users/user_interest/', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return instance.put('/api/users/user_interest/', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createRegisterationTokenforAPNToken = async (apnToken) => {
  const axios = require('axios')
  var data = JSON.stringify({
    "application": "com.setmeup",
    "sandbox":true,
    "apns_tokens":[apnToken]
  });
  
  var config = {
    method: 'post',
    url: 'https://iid.googleapis.com/iid/v1:batchImport',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `key=${firebaseKey}` 
    },
    data : data
  };

  return axios(config);
};

export const sendFCMToken = async (params, token) => {
  const axios = require('axios')
  var data = JSON.stringify({
    registration_id: params.token,
    type: params.os
  });
  
  var config = {
    method: 'post',
    url: `${url}/api/devices`,
    headers: { 
      'Authorization': `Bearer ${token}`, 
      'Content-Type': 'application/json',
    },
    data : data
  };

  return axios(config);
};


export const getUserInterest = async (
  token
) => {

  return instance.get('/api/users/user_interest/', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getQuestions = async (token) => {
  return instance.get('/api/users/profile/questions/', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTerms = async (token) => {
  return instance.get('/api/users/termsandconditions/');
};

export const setAnswers = async (data, token) => {
  return instance.post('/api/users/profile/questions/', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateAnswers = async (data, token) => {
  return instance.put('/api/users/profile/update_answers/', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const setPhoto = async (url, token) => {
  const data = new FormData();
  data.append('user_avatar', `data:image/png;base64,${url}`);

  return instance.put('/api/users/profile/upload_avatar/', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const PaymentPlan = async (token) => {
  return instance.get('/api/users/plan_list/', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const FAQ = async (token) => {
  return instance.get('/api/users/faq_list/', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const savePaymentPlan = async (planId, stripeToken, token) => {
  let data = JSON.stringify({
    plan_id: planId,
    card_token: stripeToken,
  });
  return instance.post('/api/users/plan_payment/', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserProfile = async (token) => {
  return instance.get('/api/users/profile/', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changePassword = async (oldpas, newpas, token) => {
  let data = JSON.stringify({
    old_password: oldpas,
    new_password: newpas,
  });

  return instance.put('/api/users/change_password/', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeGeo = async (loc, token) => {
  const data = new FormData();
  data.append('location', loc);

  return instance.patch('/api/users/profile/create_update/', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteUser = async (pass, token) => {
  return instance.delete('/api/users/delete/', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: {
      password: pass,
    },
  });
};

export const getMatchUser = async (token) => {
  return instance.get('/api/users/search_by_interest/', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getMatchDate = async (token) => {
  return instance.get('/api/matches/crud_date/', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const setFreeDate = async (data, token) => {
  return instance.put('/api/matches/crud_period/', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const declineMatch = async (id, token) => {
  let data = JSON.stringify({
    user_decline: id,
  });
  return instance.post('/api/users/user_decline/', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getMyFreeDate = async (token) => {
  return instance.get('/api/matches/crud_period_settings/', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserFreeDate = async (id, token) => {
  let data = JSON.stringify({
    id: id,
  });
  return instance.get(`/api/matches/common_date/?matched_user_id=${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const setMatchDateWithUser = async (data, token) => {
  return instance.put('/api/matches/crud_date/', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getMatchPlaces = async (token) => {
  return instance.get('/api/matches/establishment_list/', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getChatList = async (token) => {
  return instance.get('/api/matches/conversation/', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createChatRoom = async (my_id, guest_id, token) => {
  let data = JSON.stringify({
    user_invite: my_id,
    user_guest: guest_id,
  });
  return instance.post('/api/matches/create_conversation/', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getChatRoomMessages = async (roomId, token) => {
  return instance.get(`/api/matches/user_conversation/${roomId}/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const sendMessage = async (
  chatId,
  my_id,
  guest_id,
  message,
  token,
  event = 'false',
) => {
  let data = JSON.stringify({
    conversation: chatId,
    user_send: my_id,
    user_receive: guest_id,
    message: message,
    event: event,
  });
  return instance.post('/api/matches/crud_message/', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const reservePlace = async (dateId, placeId, token) => {
  let data = JSON.stringify({
    reserve_date_id: dateId,
    date_establishment: placeId,
  });
  return instance.put('/api/matches/establishment_reserve/', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getMyAnswers = async (token) => {
  return instance.get(`/api/users/profile/answers/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getMathcHistory = async (token) => {
  return instance.get(`/api/matches/match_history/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getRatingComments = async (token) => {
  return instance.get(`/api/matches/match_rate_text/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const sendMatchRate = async (id, user_id, rate, quality, text, token) => {
  let data = JSON.stringify({
    rate,
    user_id,
    quality,
    text,
  });
  return instance.post(`/api/matches/match_date_list/${id}/`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const sendReport = async (report, user, user_complained, token) => {
  let data = JSON.stringify({
    report,
    user,
    user_complained,
  });
  return instance.post('/api/users/user_report/', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const sendBlock = async (user, user_blocked, token) => {
  let data = JSON.stringify({
    user,
    user_blocked,
  });
  return instance.post('/api/users/user_blocked/', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const marketStores = async (subscription_plan, token) => {
  let data = JSON.stringify({
    subscription_plan,
  });
  return instance.post(`/api/users/user_subscription/`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const agreeMatch = async (date_id, date_agree_guest, token) => {
  let data = JSON.stringify({
    date_agree_guest,
  });
  return instance.put(`/api/matches/date_agree_check/${date_id}/`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addOneDate = async (token) => {
  let data = JSON.stringify({
    date_count: '1',
  });
  return instance.put(`/api/matches/date_update_num/`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const checkProfileComplete = async (token) => {
  return instance.get(`/api/users/check_profile_completion/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getSubscriptionList = async (token) => {
  return instance.get(`/api/users/list-subscription/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getProfileMatchHistory = async (token) => {
  return instance.get(`/api/matches/match_date_list/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserStatistic = async (token) => {
  return instance.get(`/api/users/date_stats/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const sendGhost = async (roomId, token) => {
  return instance.put(`/api/matches/ghost_conversation/${roomId}/`, null, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};


export const topPicks = async (token) => {
  return instance.get(`/api/matches/top_pick/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const secondChance = async (token) => {
  return instance.get(`/api/users/user_decline/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteFromDeclineList = async (user_decline_id, token) => {
  return instance.delete('/api/users/user_decline/', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: {
      user_decline_id: user_decline_id,
    },
  });
};


export const businessList = async (token) => {
  return instance.get(`/partners/list-business/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getBio = async (token) => {
  return instance.get(`/api/users/user_caption/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};


export const updateBio = async (caption, token) => {
  let data = JSON.stringify({
    caption,
  });
  return instance.put(`/api/users/user_caption/`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};


export const sendRefferalCode = async (phone_number, token) => {
  let data = JSON.stringify({
    phone_number
  });
  return instance.post('/api/users/send_referral_code/', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};
