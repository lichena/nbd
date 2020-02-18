import React from 'react';
import { nbd } from './nbd';

class EssayForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: 'Copy paste some text you wish to analyze!'
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      this.props.onFormSubmit(this.state.value)
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            <textarea 
              style={{ height: 400, width: 300 }}
              value={this.state.value} 
              onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

  export default EssayForm;