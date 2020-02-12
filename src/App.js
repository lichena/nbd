import React from 'react';
import logo from './logo.svg';
import './App.css';

import EssayForm from './EssayForm'

import {nbd} from './nbd'
import Histogram from './Histogram';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  onFormSubmit = (data) => {
    let result = nbd(data, 'frequency');
    if (result) {
      this.setState({r: result.r, alpha: result.alpha, data: result.data, t: result.t, word_count: result.word_count})
    }
  }

  renderHist = () => {
    if (this.state.data && this.state.r && this.state.alpha && this.state.word_count && this.state.t) {
      return <Histogram data={this.state.data} r={this.state.r} alpha={this.state.alpha} t={this.state.t} word_count={this.state.word_count}/>
    }
  }
  render()  { 
    return (
      <div className="App">
        <EssayForm onFormSubmit={this.onFormSubmit}/>
        {this.renderHist()}
        <p>{this.state.r ? 'r is '+ this.state.r.toFixed(3) : ''}</p>
        <p>{this.state.alpha ? 'alpha is ' + this.state.alpha.toFixed(3) : ''}</p>
        <p>{this.state.t ? 't is ' + this.state.t : ''}</p>
        <p>{this.state.ll ? 'Log-Likelihood is ' + this.state.ll : ''}</p>
        <p>{this.state.data ? 'number of unique words is ' + this.state.data.length : ''}</p>
        <p>{this.state.word_count ? 'number of total words is ' + this.state.word_count : ''}</p>
      </div>
    );
  }
}
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <EssayForm/>
//       </header>
//     </div>
//   );
// }

export default App;
