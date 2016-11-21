/**
 * Created by Юрий on 15.06.2016.
 */
/* globals define, describe, it */
define(['settingsModel'], function (settingsModel) {
  describe('#settingsModel', function () {
    var defaultForecastSettings = {
      dailyForecast: {
        count: 4
      },
      temperature: {
        type: 'fahrenheit'
      },
      updateForecast: {
        interval: 15
      },
      activeSlide: {
        index: 0
      }
    };

    it('#settingsModel slider #show-weather-for on slide event handler call #settingsModel.setForecastSettings', function () {
      spyOn(settingsModel, 'setForecastSettings');
      settingsModel.data.sliders['#show-weather-for'].slide('event', { value: 5 });
      expect(settingsModel.setForecastSettings).toHaveBeenCalledWith('dailyForecast', { count: 5 });
    });

    it('#settingsModel slider #show-weather-for on slide event handler trigger event "dailyForecastChange"', function () {
      spyOn(settingsModel, 'trigger');
      settingsModel.data.sliders['#show-weather-for'].slide('event', { value: 7 });
      expect(settingsModel.trigger).toHaveBeenCalledWith('dailyForecastChange', 7);
    });

    it('#settingsModel slider #update-weather-every on slide event handler call #settingsModel.setForecastSettings', function () {
      spyOn(settingsModel, 'setForecastSettings');
      settingsModel.data.sliders['#update-weather-every'].slide('event', { value: 3 });
      expect(settingsModel.setForecastSettings).toHaveBeenCalledWith('updateForecast', { interval: 3 });
    });

    it('#settingsModel save should set items to localStorage', function () {
      var forecastSettings = '{"dailyForecast":{"count":5},"temperature":{"type":"celsius"},"updateForecast":{"interval":45},"activeSlide":{"index":2}}';
      spyOn(localStorage, 'setItem');
      settingsModel.data.forecastSettings = JSON.parse(forecastSettings);
      settingsModel.save();
      expect(localStorage.setItem).toHaveBeenCalledWith('wa-settings', forecastSettings);
    });

    it('#settingsModel fetch should get items from localStorage', function () {
      var forecastSettings = '{"dailyForecast":{"count":5},"temperature":{"type":"celsius"},"updateForecast":{"interval":45},"activeSlide":{"index":2}}';
      spyOn(localStorage, 'getItem').and.returnValue(forecastSettings);
      settingsModel.fetch();
      expect(localStorage.getItem).toHaveBeenCalledWith('wa-settings');
    });

    it('#settingsModel fetch should get default settings if localStorage and return null value', function () {
      var forecastSettings = '{"dailyForecast":{"count":5},"temperature":{"type":"celsius"},"updateForecast":{"interval":45},"activeSlide":{"index":2}}';
      spyOn(localStorage, 'getItem').and.returnValue(forecastSettings);
      settingsModel.fetch();
      expect(localStorage.getItem).toHaveBeenCalledWith('wa-settings');
    });

    it('#settingsModel fetch should throw error when get items from localStorage', function () {
      var forecastSettings = 'simple string';
      spyOn(localStorage, 'getItem').and.returnValue(forecastSettings);
      expect(function () {
        settingsModel.fetch();
      }).toThrowError('Error with parsing settings from localStorage');
    });

    it('#settingsModel fetch should set default settings when error occurred when get items from localStorage', function () {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      settingsModel.fetch();
      expect(settingsModel.data.forecastSettings).toEqual(defaultForecastSettings);
    });

    it('#settingsModel fetch should trigger event "fetch"', function () {
      var forecastSettings = '{"dailyForecast":{"count":5},"temperature":{"type":"celsius"},"updateForecast":{"interval":45},"activeSlide":{"index":2}}';
      spyOn(localStorage, 'getItem').and.returnValue(forecastSettings);
      spyOn(settingsModel, 'trigger');
      settingsModel.fetch();
      expect(settingsModel.trigger).toHaveBeenCalledWith('fetch', JSON.parse(forecastSettings));
    });

    it('#settingsModel.setUpSlidersValue should set values to sliders', function () {
      settingsModel.setUpSlidersValue(defaultForecastSettings);
      expect(settingsModel.data.sliders['#show-weather-for'].value).toEqual(defaultForecastSettings.dailyForecast.count);
      expect(settingsModel.data.sliders['#update-weather-every'].value).toEqual(defaultForecastSettings.updateForecast.interval);
    });

    it('#settingsModel.getTemperatureType should return temperature type', function () {
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(defaultForecastSettings));
      settingsModel.fetch();
      expect(settingsModel.getTemperatureType()).toEqual(defaultForecastSettings.temperature.type);
    });

    it('#settingsModel.getDailyForecastCount should return daily forecast count', function () {
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(defaultForecastSettings));
      settingsModel.fetch();
      expect(settingsModel.getDailyForecastCount()).toEqual(defaultForecastSettings.dailyForecast.count);
    });

    it('#settingsModel.getActiveSlideIndex should return active slide index', function () {
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(defaultForecastSettings));
      settingsModel.fetch();
      expect(settingsModel.getActiveSlideIndex()).toEqual(defaultForecastSettings.activeSlide.index);
    });

    it('#settingsModel.getForecastUpdateIntervalInMiliseconds should return forecast update interval in miliseconds', function () {
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(defaultForecastSettings));
      settingsModel.fetch();
      expect(settingsModel.getForecastUpdateIntervalInMiliseconds()).toEqual(defaultForecastSettings.updateForecast.interval * 1000 * 60);
    });

    it('#settingsModel.startUpdateCounter set interval', function () {
      spyOn(window, 'setInterval');
      settingsModel.startUpdateCounter();
      expect(window.setInterval).toHaveBeenCalled();
    });
  });
});
