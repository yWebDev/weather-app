/**
 * Created by Yurii_Shpakovych on 6/9/2016.
 */
var TEST_REGEXP = /(spec|test)\.js$/i;
var tests = [];

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function (file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
    var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
    tests.push(normalizedTestModule);
  }
});

requirejs.config({
  // Karma serves files from '/base'
  baseUrl: '/base/',

  paths: {
    jquery: 'src/js/lib/jquery-1.12.3.min',
    jqueryui: 'src/js/lib/jquery-ui.min',
    jqueryuiTouchPunch: 'src/js/lib/jquery.ui.touch-punch.min',
    swiper: 'src/js/lib/swiper.jquery.min',
    jqueryscrollbar: 'src/js/lib/jquery.scrollbar.min',
    underscore: 'src/js/lib/underscore-min',
    backbone: 'src/js/lib/backbone',
    customMVC: 'src/js/lib/customMVC-0.0.1',
    utils: 'src/js/helpers/utils',
    sunModel: 'src/js/components/sun/sunModel',
    sunView: 'src/js/components/sun/sunView',
    sunController: 'src/js/components/sun/sunController',
    sun: 'src/js/helpers/sun',
    settingsModel: 'src/js/components/settings/settingsModel',
    settingsView: 'src/js/components/settings/settingsView',
    settingsController: 'src/js/components/settings/settingsController',
    cityModel: 'src/js/components/cities/cityModel',
    citiesCollection: 'src/js/components/cities/citiesCollection',
    cityGalleryItemView: 'src/js/components/gallery/cityGalleryItemView',
    citiesGalleryListView: 'src/js/components/gallery/citiesGalleryListView',
    citiesGalleryController: 'src/js/components/gallery/citiesGalleryController',
    dailyForecastController: 'src/js/components/dailyForecast/dailyForecastController',
    dailyForecastListView: 'src/js/components/dailyForecast/dailyForecastListView',
    citiesListView: 'src/js/components/citiesList/citiesListView',
    citiesListController: 'src/js/components/citiesList/citiesListController',
    searchController: 'src/js/components/search/searchController',
    searchView: 'src/js/components/search/searchView',
    searchModel: 'src/js/components/search/searchModel',
    googleAPI: 'src/js/services/googleAPI',
    forecastAPI: 'src/js/services/forecastAPI',

    // Mocks
    maps: 'tests/mocks/maps',
    forecast: 'tests/mocks/forecast',
    collection: 'tests/mocks/collection'

  },

  // ask Require.js to load these files (all our tests)
  deps: tests,

  // start test run, once Require.js is done
  callback: window.__karma__.start

});
