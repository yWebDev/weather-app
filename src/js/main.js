/* globals  requirejs,define */
requirejs.config({
  baseUrl: 'js',
  paths: {
    jquery: 'lib/jquery-1.12.3.min',
    jqueryui: 'lib/jquery-ui.min',
    jqueryPlugins: 'helpers/jquery.plugins',
    jqueryuiTouchPunch: 'lib/jquery.ui.touch-punch.min',
    swiper: 'lib/swiper.jquery.min',
    jqueryscrollbar: 'lib/jquery.scrollbar.min',
    underscore: 'lib/underscore-min',
    maps: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBJLUnfOkoE_9yWnxjrevs7tSErheyTYv0&signed_in=true&'
    + 'language=en&libraries=places',
    backbone: 'lib/backbone',
    customMVC: 'lib/customMVC-0.0.1',
    utils: 'helpers/utils',
    sunModel: 'components/sun/sunModel',
    sunView: 'components/sun/sunView',
    sunController: 'components/sun/sunController',
    sun: 'helpers/sun',
    settingsModel: 'components/settings/settingsModel',
    settingsView: 'components/settings/settingsView',
    settingsController: 'components/settings/settingsController',
    cityModel: 'components/cities/cityModel',
    citiesCollection: 'components/cities/citiesCollection',
    cityGalleryItemView: 'components/gallery/cityGalleryItemView',
    citiesGalleryListView: 'components/gallery/citiesGalleryListView',
    citiesGalleryController: 'components/gallery/citiesGalleryController',
    dailyForecastController: 'components/dailyForecast/dailyForecastController',
    dailyForecastListView: 'components/dailyForecast/dailyForecastListView',
    citiesListView: 'components/citiesList/citiesListView',
    citiesListController: 'components/citiesList/citiesListController',
    searchController: 'components/search/searchController',
    searchView: 'components/search/searchView',
    searchModel: 'components/search/searchModel',
    googleAPI: 'services/googleAPI',
    forecastAPI: 'services/forecastAPI'
  },

  shim: {
    jqueryuiTouchPunch: ['jqueryui', 'jquery']
  }
});

requirejs(['app']);
