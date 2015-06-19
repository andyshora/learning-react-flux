var alt = require('../alt');
var LocationActions = require('../actions/location-actions');
var LocationFetcher = require('../utils/location-fetcher');

// This is the single source of truth for a
// particular piece of your application’s state
class LocationStore {
  constructor() {
    // Instance variables defined anywhere
    // in the store will become the state.
    this.locations = [];
    this.errorMessage = null;

    // bind our action handlers to our actions defined below
    this.bindListeners({
      handleUpdateLocations: LocationActions.UPDATE_LOCATIONS,
      handleFetchLocations: LocationActions.FETCH_LOCATIONS,
      handleLocationsFailed: LocationActions.LOCATIONS_FAILED
    });

    this.exportPublicMethods({
      getLocation: this.getLocation
    });

    this.exportAsync(LocationFetcher);
  }

  // action handlers
  handleUpdateLocations(locations) {
    this.locations = locations;
    this.errorMessage = null;
  }

  handleFetchLocations() {
    // reset the array while we're fetching new locations so React can
    // be smart and render a spinner for us since the data is empty.
    this.locations = [];
  }

  handleLocationsFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }

  getLocation(id) {
    var { locations } = this.getState();
    for (var i = 0; i < locations.length; i += 1) {
      if (locations[i].id === id) {
        return locations[i];
      }
    }

    return null;
  }


  // Stores automatically emit a change event when an action is dispatched
  // through the store and the action handler ends. In order to suppress
  // the change event you can return false from the action handler.
}

module.exports = alt.createStore(LocationStore, 'LocationStore');
