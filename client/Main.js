import React, { Component } from 'react';
import axios from 'axios';
import { fetchGame } from './store'
import { connect } from 'react-redux';
import Rink from './Rink';

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selection: 0,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    const gameId = evt.target.value
    console.log('messageeeeeee', gameId)
    this.setState({ selection: evt.target.value })
  }
  
  handleSubmit(evt) {
    evt.preventDefault()
    const gameId = this.state.selection
    console.log('second gameID', gameId)
    this.props.getGameData(this.state.selection)
  }

  componentDidMount() {
    this.props.getGameData()
  }

  render() {
    return (
      <div>
        <h1>Fire on Ice</h1>
        <form onSubmit={this.handleSubmit} >
          <select onChange={this.handleChange} value={this.state.selection}>
            {
              schedule.map(game => {
                return (
                  <option value={game.id} key={game.id}>
                    {game.a} vs. {game.h}
                  </option>
                )
              })
            }
          </select>
          <input type='submit' value='Go!' />
        </form>
        {
          this.props.game.gameData
            ?
            <div>
              {this.props.game.gameData.home.name} vs. {this.props.game.gameData.away.name}
              <Rink />
            </div>
            : <h3>Loading...</h3>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.game
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getGameData: function (id) {
      dispatch(fetchGame(id))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);


const schedule = [
  {
    "id": 2017020001,
    "est": "20171004 19:00:00",
    "a": "TOR",
    "h": "WPG"
  },
  {
    "id": 2017020002,
    "est": "20171004 20:00:00",
    "a": "STL",
    "h": "PIT"
  },
  {
    "id": 2017020003,
    "est": "20171004 22:00:00",
    "a": "CGY",
    "h": "EDM"
  },
  {
    "id": 2017020004,
    "est": "20171004 22:30:00",
    "a": "PHI",
    "h": "SJS"
  },
  {
    "id": 2017020005,
    "est": "20171005 19:00:00",
    "a": "NSH",
    "h": "BOS"
  },
  {
    "id": 2017020006,
    "est": "20171005 19:00:00",
    "a": "MTL",
    "h": "BUF"
  },
  {
    "id": 2017020007,
    "est": "20171005 19:00:00",
    "a": "COL",
    "h": "NYR"
  },
  {
    "id": 2017020008,
    "est": "20171005 19:30:00",
    "a": "WSH",
    "h": "OTT"
  },
  {
    "id": 2017020009,
    "est": "20171005 19:30:00",
    "a": "MIN",
    "h": "DET"
  },
  {
    "id": 2017020010,
    "est": "20171005 20:30:00",
    "a": "PIT",
    "h": "CHI"
  },
  {
    "id": 2017020011,
    "est": "20171005 22:00:00",
    "a": "ARI",
    "h": "ANA"
  },
  {
    "id": 2017020012,
    "est": "20171005 22:00:00",
    "a": "PHI",
    "h": "LAK"
  },
  {
    "id": 2017020013,
    "est": "20171006 19:00:00",
    "a": "NYI",
    "h": "CBJ"
  },
  {
    "id": 2017020014,
    "est": "20171006 19:30:00",
    "a": "FLA",
    "h": "TBL"
  },
  {
    "id": 2017020015,
    "est": "20171006 20:30:00",
    "a": "VGK",
    "h": "DAL"
  },
  {
    "id": 2017020016,
    "est": "20171007 19:00:00",
    "a": "NYR",
    "h": "TOR"
  },
  {
    "id": 2017020017,
    "est": "20171007 19:00:00",
    "a": "DET",
    "h": "OTT"
  },
  {
    "id": 2017020018,
    "est": "20171007 19:00:00",
    "a": "TBL",
    "h": "FLA"
  },
  {
    "id": 2017020019,
    "est": "20171007 14:00:00",
    "a": "COL",
    "h": "NJD"
  },
  {
    "id": 2017020020,
    "est": "20171007 19:00:00",
    "a": "BUF",
    "h": "NYI"
  }]