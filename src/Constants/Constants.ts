export const AccuWeatherAPIKey = 'AqYB3lVwL5ayzsCZDcKszPO4gfE7uGmm';

export const URLS = {
    LOCATION_AUTO_COMPLETE:
        'https://dataservice.accuweather.com/locations/v1/cities/autocomplete',
    CURRENT_WEATHER: 'https://dataservice.accuweather.com/currentconditions/v1',
    FIVE_DAY_FORECAST:
        'https://dataservice.accuweather.com/forecasts/v1/daily/5day',
};

export const HTTP_RESPONSE_CODE = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NO_PERMISSION: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
};
