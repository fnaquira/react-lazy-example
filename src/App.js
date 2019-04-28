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
