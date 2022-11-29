const $contenedorClima = document.querySelector("#contenedor-clima");

const $ciudad = document.querySelector("#ciudad");
const $pais = document.querySelector("#pais");
const $temperatura = document.querySelector("#temperatura");
const $humedad = document.querySelector("#humedad");
const $imagenClima = document.querySelector("#img-clima");

const funcionInit = () => {
	if (!"geolocation" in navigator) {
		return alert("Tu navegador no soporta el acceso a la ubicación. Intenta con otro");
	}

	const onUbicacionConcedida = async ubicacion => {
		console.log("Tengo la ubicación: ", ubicacion);
        let latitud = ubicacion.coords.latitude;
        let longitud = ubicacion.coords.longitude;
        const API_KEY = "8de63731038b1b85c8249dd01f507838";
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${API_KEY}&units=metric`;

        const response = await fetch(API_URL);
        const data = await response.json();
        let iconoURL = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        console.log(data);

        $imagenClima.src = iconoURL;
        $ciudad.textContent = `${data.name}`;
        $pais.textContent = `${data.sys.country}`;
        $temperatura.textContent = `${Math.round(data.main.temp)}°C`;
        $humedad.textContent = `${data.main.humidity}%`;
	}
  
	const onErrorDeUbicacion = err => {
		console.log("Error obteniendo ubicación: ", err);
        
        $contenedorClima.innerHTML = `<div class="flex flex-col bg-slate-600 rounded-xl p-5 gap-8">
                                        <div class="self-center"><i class="fas fa-info-circle text-[36px]"></i></div>
                                        <p class="text-white text-center">Permita acceso a su ubicación para obtener información sobre el clima.</p>
                                      </div>`;
	}

	const opcionesDeSolicitud = {
		enableHighAccuracy: true, // Alta precisión
		maximumAge: 0, // No queremos caché
		timeout: 5000 // Esperar solo 5 segundos
	};
	// Solicitar
	navigator.geolocation.getCurrentPosition(onUbicacionConcedida, onErrorDeUbicacion, opcionesDeSolicitud);

};

document.addEventListener("DOMContentLoaded", funcionInit);



// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
