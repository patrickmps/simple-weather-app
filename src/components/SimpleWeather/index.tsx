import { useEffect, useRef, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { Loading } from "../Loading";
import "./style.scss";

export const SimpleWeather = ({
  city,
  openWeatherID,
  units = "metric",
  lang = "pt_br",
}: SimpleWeatherProps) => {
  const { data: openWeather, status: statusCode } = useApi<OpenWeatherProps>(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherID}c&units=${units}&lang=${lang}`
  );
  const statusCodeMsg = {
    400: "Insira o nome de um local.",
    404: "Local não encontrado.",
  };

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);

  function ChangeMainBackground() {
    if (statusCode === 200) {
      const mainBackgroundColor = {
        "01d": "#E82D00",
        "02d": "#ac4228",
        "03d": "#8f594b",
        "04d": "#6b4f49",
        "09d": "#2351b4",
        "10d": "#124bc7",
        "11d": "#1b19b1",
        "13d": "#03b1dd",
        "50d": "#495064",
        "01n": "#3e00e8",
        "02n": "#3c28ac",
        "03n": "#504b8f",
        "04n": "#50496b",
        "09n": "#2523b4",
        "10n": "#121ec7",
        "11n": "#1b19b1",
        "13n": "#004b5e",
        "50n": "#343844",
      };
      containerRef.current!.style.background = `linear-gradient(179.15deg, ${
        mainBackgroundColor[
          openWeather?.weather[0].icon as keyof typeof mainBackgroundColor
        ]
      } 0.73%, #1C1C1C 69.52%)`;
    } else {
      containerRef.current!.style.background = `linear-gradient(179.15deg, #1C1C1C 0.73%, #1C1C1C 69.52%)`;
    }
  }

  
  useEffect(() => {
    setIsLoading(openWeather === null);
    if (!isLoading) {
      ChangeMainBackground();
    }
  }, [openWeather?.weather[0].icon, statusCode]);

  return statusCode === 400 || statusCode === 404 ? (
    <div className="main-container" ref={containerRef}>
      <h1 className="err-msg">{statusCodeMsg[statusCode]}</h1>
    </div>
  ) : isLoading ? (
    <Loading />
  ) : (
    <div className="main-container" ref={containerRef}>
      {}
      <span className="line-city">
        <h1>{openWeather?.name}</h1>
        {openWeather && (
          <img
            src={`https://flagsapi.com/${openWeather?.sys.country.toUpperCase()}/flat/48.png`}
            alt=""
          />
        )}
      </span>
      <div className="weather">
        <div id="wheater-desc">
          <img
            src={`http://openweathermap.org/img/wn/${openWeather?.weather[0].icon}@2x.png`}
            alt=""
          />
          <strong>{openWeather?.weather[0].description}</strong>
        </div>
        <div id="temp">
          <p>{`Sensação de ${
            openWeather && Math.round(openWeather?.main.feels_like)
          }° C`}</p>
          <strong>
            {openWeather && Math.round(openWeather?.main.temp)}° C
          </strong>
        </div>
      </div>
      <span className="line-info">
        <h2>Humidade</h2>
        <strong>{`${openWeather?.main.humidity}%`}</strong>
      </span>
      <span className="line-info">
        <h2>Visibilidade</h2>
        <strong>{openWeather && `${openWeather?.visibility / 1000}km`}</strong>
      </span>
      <span className="line-info">
        <h2>Vento</h2>
        <strong>{`${openWeather?.wind.speed
          .toString()
          .replace(".", ",")}m/s`}</strong>
      </span>
    </div>
  );
};
