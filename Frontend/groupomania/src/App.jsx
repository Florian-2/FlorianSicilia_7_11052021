// Librairies - CSS
import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import routes from './Config/routes'
import './App.css';

// Composants
import Layout from './Components/Layout/Layout';
import Signup from './Components/Auth/Signup/Signup';
import Login from './Components/Auth/Login/Login';
import ShowPosts from './Components/Messages/ShowPosts/ContainerPosts';
import AddPost from './Components/Messages/AddPost/AddPost';
import Profil from './Components/Profil/Profil';

export default function App() 
{
	const [connected, setConnected] = useState();

	useEffect(() =>
	{
		if (sessionStorage.getItem('dataUser'))
			setConnected(true);
		else
			setConnected(false);
	}, [])

	return (
		<div className="App">
			
			<Layout>

				<Switch>
					<Redirect exact from="/" to={routes.SIGNUP} />
					<Route exact path={routes.SIGNUP} component={Signup}/>
					<Route exact path={routes.LOGIN} component={Login}/>
					{connected ? <Route exact path={routes.SHOWALLPOST} component={ShowPosts}/> : <Route exact path={routes.SHOWALLPOST} render={() => <h1>Vous devez être connecté pour voir les publications</h1>}/>}
					{connected ? <Route exact path={routes.ADDPOST} component={AddPost}/> : <Route exact path={routes.ADDPOST} render={() => <h1>Vous devez être connecté pour ajouter une publication</h1>}/>}
					{/* <Route exact path={routes.ADDPOST + ":id"} render={() => <h1>Modif post</h1>}/> */}
					{connected ? <Route exact path={routes.PROFIL} component={Profil}/> : <Route exact path={routes.PROFIL} render={() => <h1>Vous devez être connecté pour accéder à votre profil</h1>}/>}
					<Route render={() => <h1>Page introuvable</h1>} />
				</Switch>

			</Layout>
			
		</div>
	);
}