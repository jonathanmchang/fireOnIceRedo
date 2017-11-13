import axios from 'axios';

// Action type
const GET_GAME_INFO = 'GET_GAME_INFO'

// Action Creator
const getGameInfo = (game) => ({ type: GET_GAME_INFO, game })

// THUNK

export const fetchGame = (id) => (dispatch) => {
  axios.get(`/api/getAllShots/${id}`)
  .then(gameInfo => {
    dispatch(getGameInfo(gameInfo.data))
  })
  .catch(error => console.error(error))
}

// Reducer

export default function (state = {}, action) {
  switch (action.type) {
    case GET_GAME_INFO:
      return action.game
    default:
      return state;
  }
}