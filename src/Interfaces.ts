// interface for the autocomplete endpoint
export interface ILocation {
    Version: number;
    Key: string;
    Type: string;
    Rank: number;
    LocalizedName: string;
    Country: {
        ID: string;
        LocalizedName: string;
    };
    AdministrativeArea: {
        ID: string;
        LocalizedName: string;
    };
}

// interfaces for the current weather endpoint
export interface ICurrentWeather {
    LocalObservationDateTime: string;
    EpochTime: number;
    WeatherText: string;
    WeatherIcon: number;
    HasPrecipitation: boolean;
    PrecipitationType: string | null;
    IsDayTime: boolean;
    Temperature: {
        Metric: {
            Value: number;
            Unit: string;
            UnitType: number;
        };
        Imperial: {
            Value: number;
            Unit: string;
            UnitType: number;
        };
    };
    MobileLink: string;
    Link: string;
}

// interfaces for the five day forecast endpoint
interface Headline {
    EffectiveDate: string;
    EffectiveEpochDate: number;
    Severity: number;
    Text: string;
    Category: string;
    EndDate: string;
    EndEpochDate: number;
    MobileLink: string;
    Link: string;
}

interface DayNightForecast {
    Icon: number;
    IconPhrase: string;
    HasPrecipitation: boolean;
    PrecipitationType?: string;
    PrecipitationIntensity?: string;
}

export interface DailyForecast {
    Date: string;
    EpochDate: number;
    Temperature: {
        Minimum: {
            Value: number;
            Unit: string;
            UnitType: number;
        };
        Maximum: {
            Value: number;
            Unit: string;
            UnitType: number;
        };
    };
    Day: DayNightForecast;
    Night: DayNightForecast;
    Sources: string[];
    MobileLink: string;
    Link: string;
}

export interface IForecast {
    Headline: Headline;
    DailyForecasts: DailyForecast[];
}
