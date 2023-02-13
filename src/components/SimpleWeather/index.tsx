import { useApi } from "../../hooks/useApi";
import "./style.scss";

export const SimpleWeather = ({}) => {
  const { data } = useApi<OpenWeatherProps>(
    "https://api.openweathermap.org/data/2.5/weather?q=jequie&appid=02a090af1201f342e9b2df360e1d954c&units=metric&lang=pt_br"
  );

  return (
    <div className="main-container">
      <span className="line-city">
        <h1>{data?.name}</h1>
        {data && <img crossOrigin="anonymous" src={`https://countryflagsapi.com/png/${data?.sys.country.toLowerCase()}`} alt="" />}
      </span>
      <div className="weather">
        <div id="wheater-desc">
          <img src={`http://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`} alt="" />
          <strong>{data?.weather[0].description}</strong>
        </div>
        <div id="temp">
          <p>{`Sensação de ${data?.main.feels_like}° C`}</p>
          <strong>{data && Math.round(data?.main.temp)}° C</strong>
        </div>
      </div>
      <span className="line-info">
        <h2>Humidade</h2>
        <strong>{data?.main.humidity}</strong>
      </span>
      <span className="line-info">
        <h2>Visibilidade</h2>
        <strong>{data && `${(data?.visibility)/1000}km`}</strong>
      </span>
      <span className="line-info">
        <h2>Vento</h2>
        <strong>{`${data?.wind.speed}m/s`}</strong>
      </span>
    </div>
  );
};
