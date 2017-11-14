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
    this.setState({ selection: evt.target.value })
  }
  
  handleSubmit(evt) {
    evt.preventDefault()
    const gameId = this.state.selection
    this.props.getGameData(this.state.selection)
  }

  componentDidMount() {
    this.props.getGameData()
  }

  render() {
    console.log(this.props.game.gameData);
    return (
      <div className='text-center'>
        <h1>Fire on Ice</h1>
        <form onSubmit={this.handleSubmit} >

          <select onChange={this.handleChange} value={this.state.selection}><option></option>
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
          <button type='submit' className='btn btn-sm btn-danger pull-right' style={{margin:10}}>Feel the Heat</button>
        </form>
        {
          this.props.game.gameData
            ?
            <div>
              {this.props.game.gameData.home.name} vs. {this.props.game.gameData.away.name}
              <Rink />
            </div>
            : <h3>Choose a Game!</h3>
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
    "id": 2017020012,
    "est": "20171005 22:00:00",
    "a": "PHI",
    "h": "LAK"
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
  }]