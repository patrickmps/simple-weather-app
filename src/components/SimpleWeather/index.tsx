import { useApi } from "../../hooks/useApi";
import "./style.scss";



export const SimpleWeather = ({}) => {
  const { data } = useApi<OpenWeatherProps>(
    "https://api.openweathermap.org/data/2.5/weather?q=jequie&appid=02a090af1201f342e9b2df360e1d954c&units=metric&lang=pt_br"
  );
  console.log(data);

  return (
    <div>

    </div>
  )
}
