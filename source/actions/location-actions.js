var alt = require('../alt');
// var LocationsFetcher = require('../utils/location-fetcher');

class LocationActions {
  // these prototype methods become the actions
  updateLocations(locations) {
    // dispatch your payload through the Dispatcher and onto the stores
    this.dispatch(locations);
  }
  // fetch the locations and update the store when it completes
  fetchLocations() {
    console.log('fetchLocations');
    // dispatch an event so we can have a 'loading' state
    this.dispatch();

    /*LocationsFetcher.fetch()
      .then((locations) => {
        this.actions.updateLocations(errorMessage);
      })
      .catch((errorMessage) => {
        this.actions.locationsFailed(errorMessage);
      });*/
  }
  // deal with locations not being available
  locationsFailed(errorMessage) {
    this.dispatch(errorMessage);
  }
}

module.exports = alt.createActions(LocationActions);
