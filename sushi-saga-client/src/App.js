import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  state = {
    sushis: [],
    currentSushi: [],
    eatenSushi: [],
    money: 100,
    index: 4
  }

  eatSushi = (id) => {
    const possibleDinner = this.state.sushis.find(sushi => sushi.id === id)
    if (possibleDinner.price < this.state.money && possibleDinner.consumed === false) {
      const updatedMoney = this.state.money - possibleDinner.price
      const newSushis = this.state.sushis.map(sushi => {if (sushi.id === id) {
        sushi["consumed"] = true
        return sushi } else {
          return sushi
        }})
        const newCurrentSushis = this.state.currentSushi.map(sushi => {if (sushi.id === id) {
          sushi["consumed"] = true
          return sushi } else {
            return sushi
          }})
          this.setState({
            sushis: newSushis,
            currentSushi: newCurrentSushis,
            money: updatedMoney,
            eatenSushi: [...this.state.eatenSushi, possibleDinner]
          })
      }
  }

  moreSushi = () => {
    let newIndex = this.state.index + 4;
    if (newIndex === 100) {
      let sushis = this.state.sushis.slice(0, 4)
      this.setState({
        currentSushi: sushis,
        index: 0
      })
    } else {
      let sushis = this.state.sushis.slice(this.state.index, newIndex)
      this.setState({
        currentSushi: sushis,
        index: newIndex
      })
    }
  }


  render() {
    console.log(this.state.currentSushi)
    return (
      <div className="app">
        <SushiContainer  sushis={this.state.currentSushi} eatSushi={this.eatSushi} moreSushi={this.moreSushi}/>
        <Table money={this.state.money} eatenSushi={this.state.eatenSushi}/>
      </div>
    );
  }

  componentDidMount() {
    fetch(API)
    .then(data => data.json())
    .then(sushis => sushis.map(sushi => {sushi["consumed"] = false
    return sushi}))
    .then(info => this.setState({
      sushis: info,
      currentSushi: info.slice(0, 4)
    }))
  }
}

export default App;
