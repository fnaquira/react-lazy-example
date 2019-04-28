import React, { lazy, Suspense } from 'react';
import './App.css';

//import Listado from './Listado';
const Listado = lazy(() => import('./Listado'));

class App extends React.Component {
	state = {
		data: null
	};
	loadMovies = () => {
		this.setState({ data: [] });
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
						<Suspense fallback={<p>Cargando...</p>}>
							<Listado data={this.state.data} />
						</Suspense>
					) : (
						<p>Haga click para cargar las peliculas</p>
					)}
				</header>
			</div>
		);
	}
}

export default App;
