var React = require('react');
var LocationStore = require('../stores/location-store');
var LocationActions = require('../actions/location-actions');
var AltContainer = require('alt/AltContainer');

var AllLocations = React.createClass({

  render() {
    if (this.props.errorMessage) {
      return (
        <div>{this.props.errorMessage}</div>
      );
    }

    if (LocationStore.isLoading()) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }

    return (
      <ul>
        {this.props.locations.map((location, i) => {

          return (
            <li key={i}>
              {location.name}
            </li>
          );
        })}
      </ul>
    );
  }
});

var Locations = React.createClass({
  componentDidMount() {

    console.log('componentDidMount');
    // we’ll want to listen to changes once the state in the store is updated
    LocationStore.listen(this.onChange);

    LocationActions.fetchLocations();
  },
  componentWillUnmount() {
    LocationStore.unlisten(this.onChange);
  },
  render: function() {
    console.log('locations render');

    return (
      <div>
        <h1>Locations</h1>
        <AltContainer store={LocationStore}>
          <AllLocations />
        </AltContainer>
      </div>
    );
  }
});

module.exports = Locations;
