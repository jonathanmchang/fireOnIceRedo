const router = require('express').Router();
const axios = require('axios');
const rp = require('request-promise')
const { convertCoordinates } = require('../../utils');
module.exports = router;

router.get('/:id', (request, response, next) => {
  const options = {
    uri: `http://statsapi.web.nhl.com/api/v1/game/${request.params.id}/feed/live`,
    json: true
  }
  let shotData = {
    gameData: {
      away: {
        id: null,
        name: '',
      },
      home: {
        id: null,
        name: ''
      }
    },
    shotDataAway: [],
    shotDataHome: []
  };
  rp(options)
    .then(res => {
      // console.log(res.gameData.teams.home)
      shotData.gameData.away.id = res.gameData.teams.away.id;
      shotData.gameData.away.name = res.gameData.teams.away.name;

      shotData.gameData.home.id = res.gameData.teams.home.id;
      shotData.gameData.home.name = res.gameData.teams.home.name;
      // console.log("game data", shotData.gameData)
      // response.send(shotData)
      return res
    })
    .then(res => {
      // console.log(res)
      let resArr = res.liveData.plays.allPlays
      for (let i = 0; i < resArr.length; i++) {
        if (resArr[i].result.event === 'Shot') {
          let period = resArr[i].about.period
          let periodTime = resArr[i].about.periodTime
          let teamId = resArr[i].team.id
          let team = resArr[i].team.name
          let player = resArr[i].players[0].player.fullName
          let playerId = resArr[i].players[0].player.id
          let coordinates = convertCoordinates(resArr[i].coordinates, resArr[i].about.period)
          if (resArr[i].team.id === shotData.gameData.home.id) {
            shotData.shotDataHome.push({ period, periodTime, teamId, team, player, playerId, coordinates })
          } else {
            shotData.shotDataAway.push({ period, periodTime, teamId, team, player, playerId, coordinates })
          }
        }
      }
    })
    .then(() => {
      // console.log('shotdata*****', shotData.shotDataAway)
      response.json(shotData)
      // return shotData
    })
    .catch(next)
  })