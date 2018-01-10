import React, { Component } from 'react';

class Search extends Component {

  constructor() {
    super();
    this.state={profiles: {}, filtered: []};
    this.searchProfiles = this.searchProfiles.bind(this);
  }

  componentDidMount() {
    fetch('profiles.json')
    .then(data => data.json())
    .then(data => {
      this.setState({profiles: data.data});
    });
  }

  searchProfiles(e) {
    let query = (e.target.value);
    let filteredProfiles = [];
    if (query.length > 0) {
      filteredProfiles = this.state.profiles.filter(profile =>
        profile.location.toLowerCase().includes(query.toLowerCase()) ||
        profile.name.toLowerCase().includes(query.toLowerCase()) ||
        profile.position.toLowerCase().includes(query.toLowerCase())
      );
      filteredProfiles.sort((a,b) => {
        let aRelevance =[100];
        let bRelevance =[100];
        if (a.location.indexOf(query) >= 0) {aRelevance.push(a.location.indexOf(query));}
        if (a.name.indexOf(query) >= 0) {aRelevance.push(a.name.indexOf(query));}
        if (a.position.indexOf(query) >= 0) {aRelevance.push(a.position.indexOf(query));}

        if (b.location.indexOf(query) >= 0) {bRelevance.push(b.location.indexOf(query));}
        if (b.name.indexOf(query) >= 0) {bRelevance.push(b.name.indexOf(query));}
        if (b.position.indexOf(query) >= 0) {bRelevance.push(b.position.indexOf(query));}

        return Math.min(...bRelevance) - Math.min(...aRelevance);
      });
    }
    this.setState({filtered: filteredProfiles});
  }



  render() {
    let items;
    if (this.state.filtered.length > 0) {
      items = this.state.filtered.slice(0,20).map(profile =>
      <li className="ProfileCard" key={profile.name + profile.location}>
        <img className="ProfileCard-image" alt="" src={`http://api.adorable.io/avatar/100/${profile.name}`} />
        <h3 className="ProfileCard-name">{profile.name}</h3>
        <em className="ProfileCard-location">{profile.location}</em>
        <p className="ProfileCard-position">{profile.position}</p>
      </li>
      );
    }

    return (
      <div className="App">
        <h1>Slightly Better Searching</h1>
        <input onKeyUp={this.searchProfiles} className="App-searchBar" type="search" />
        <ul className="ProfilesList">
          {items}
        </ul>
      </div>
    );
  }
}

export default Search;
