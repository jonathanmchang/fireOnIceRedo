import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchGame } from './store'

const makeRinkWithD3 = require('../utils').makeRinkWithD3;

class Rink extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    const home = this.props.game.shotDataHome;
    const away = this.props.game.shotDataAway;
    return(
      <div>

        {makeRinkWithD3(home, away)}
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
    getGameData: function() {
      dispatch(fetchGame())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Rink);
