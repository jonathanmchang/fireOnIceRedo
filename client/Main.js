import React, { Component } from 'react';
import axios from 'axios';

export default class Main extends Component {
  constructor() {
    super()
    this.state = {
      data: null
    }
  }

  componentDidMount() {
    return axios.get('/api/getAllShots')
      .then(res => {
        console.log('res', res)
        this.setState({data: res.data})
      })
  }

  render() {
    return (
      <div>
        {
          this.state.data
          ? 
          <div>
            {this.state.data.gameData.away.name} <h1>VS</h1> {this.state.data.gameData.home.name}
          </div>
          : <h1>nothing here yet</h1>
        }
      </div>
    )
  }
}

// let shotData = {
//   gameData: {
//     away: {
//       id: null,
//       name: '',
//     },
//     home: {
//       id: null,
//       name: ''
//     }
//   },
//   shotDataAway: [],
//   shotDataHome: []