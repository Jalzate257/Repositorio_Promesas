const openMeteoApi = 'https://api.open-meteo.com/v1/forecast?latitude=6.25184&longitude=-75.56359&current_weather=true';
const apiMet = 'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=6.25184&lon=-75.56359';

async function obtenerClimaOpenMeteoApi() {
    try {
        const result = await fetch(openMeteoApi)
        const respuestaJson = await result.json()
        const objetRestul = {
            fuente: 'open meteo API',
            tiempo: respuestaJson.current_weather.time,
            temperatura: respuestaJson.current_weather.temperature,
            velocidad: respuestaJson.current_weather.windspeed
        }
        return objetRestul;
    } catch (error) {
        console.error(`Ha ocurrido un error inesperado!\n${error.message}`);
    }
}

async function obtenerApiMet() {
    

    try {
        const resultApi = await fetch(apiMet);
        const respJson = await resultApi.json()

        const objetRestul = {
            fuente: 'open met API',
            tiempo: respJson.properties.timeseries[0].time,
            temperatura: respJson.properties.timeseries[0].data.instant.details.air_temperature,
            velocidad: respJson.properties.timeseries[0].data.instant.details.wind_speed
        }
        return objetRestul;
    } catch (error) {
        console.error(`Ha ocurrido un error inesperado!\n${error.message}`);
    }

    
}

Promise.race([obtenerClimaOpenMeteoApi(), obtenerApiMet()]).then((solucionMasRapida) => {
    console.log(solucionMasRapida);
}).catch((error) => {
    console.log(error);
})
