import React from 'react';

const Listado = props => {
	console.log(props);
	return (
		<ul>
			{props.data.map(item => (
				<li key={item.id}>{item.title}</li>
			))}
		</ul>
	);
};

export default Listado;
