Creo que después de ver el curso de React, puedo compartir algo adicional, sobre todo para los que crean aplicaciones grandes que tiene muchas rutas y componentes.
React implementa una opción de cargado en partes, o "chunks". Esto lo podemos aprovechar mediante su función lazy. Les mostraré primero un componente de ejemplo, que simplemente llama a una URL para obtener películas y luego listarlas.

```
import React from 'react';
import './App.css';

import Listado from './Listado';

class App extends React.Component {
	state = {
		data: null
	};
	loadMovies = () => {
		fetch('https://yts.am/api/v2/list_movies.json')
			.then(response => response.json())
			.then(responseJson => {
				this.setState({ data: responseJson.data.movies });
			})
			.catch(error => {
				console.error(error);
			});
	};
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h3>Hola mundo</h3>
					<button onClick={this.loadMovies}>Cargar Películas</button>
					{this.state.data ? (
						<Listado data={this.state.data} />
					) : (
						<p>Haga click para cargar las peliculas</p>
					)}
				</header>
			</div>
		);
	}
}

export default App;
```

El problema es que aunque no se haya cargado el componente, nuestro archivo minificado ya lo tiene incluido. Esto puede incrementar en mucho el peso de nuestros archivos Javascript cuando al inicio del uso del sistema el usuario solamente está utilizando lo necesario.
Por ejemplo, ahora mi consola de red luce así:
![https://raw.githubusercontent.com/fnaquira/react-lazy-example/master/react-sin-lazy.PNG](url)
Lo ideal sería que conforme vaya cargando las demás vistas y características de nuestra aplicación, se vayan cargando esos componentes al navegador, mejorando así la experiencia de una buena carga inicial.
Para esto, haremos unas modificaciones al código.
Primero, importaremos **lazy** y **Suspense** de React.

```
import React, { lazy, Suspense } from 'react';
```

Segundo, modificamos la importación del componente Listado, que ahora será realizada a través de lazy

```
//import Listado from './Listado';
const Listado = lazy(() => import('./Listado'));
```

Finalmente, modificaremos en el método render la invocación de nuestro componente, envolviéndolo en **Suspense** al mismo tiempo que le pasamos el parámetro fallback (el componente que renderizará mientras carga el nuestro)

```
{this.state.data ? (
						<Suspense fallback={<p>Cargando...</p>}>
							<Listado data={this.state.data} />
						</Suspense>
					) : (
						<p>Haga click para cargar las peliculas</p>
					)}
```

Veamos ahora como se comporta nuestra consola cuando hacemos click en cargar:
![https://raw.githubusercontent.com/fnaquira/react-lazy-example/master/platzi-react-lazy](url)
Solamente cuando se hace la petición, se carga asíncronamente el archivo **2.chunk.js**. Este es un truco muy bueno para no cargar desde el inicio por ejemplo, nuestro componente de la vista de perfil, o componentes pesados como estadísticas o cualquier cosa que se nos ocurra que no ve necesariamente el usuario desde el inicio.
Les dejo el repositorio del ejemplo aquí:
[https://github.com/fnaquira/react-lazy-example](url)
Espero les ayude, como me ayudó a mi el nuevo curso de React de este año.
