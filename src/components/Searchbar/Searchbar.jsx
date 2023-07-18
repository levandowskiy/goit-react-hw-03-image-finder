import { Component } from 'react';
import './Searchba.css'
class Searchbar extends Component {
  state = {
    searchValue: '',
  };

  handlerInput = e => {
    this.setState({
      searchValue: e.currentTarget.value,
    });
  };

  handlerForm = e => {
    e.preventDefault();

    if(this.state.searchValue.trim() === ""){
        alert("Поле пошуку порожне")
        return;
    }
    
    this.props.handlerFormSubmit(this.state.searchValue);
    
    this.setState({
      searchValue: '',
    });
  };

  render() {
    return (
      <header className="searchbar">
        <form onSubmit={this.handlerForm} className="form">
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            value={this.state.searchValue}
            placeholder="Search images and photos"
            onChange={this.handlerInput}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
