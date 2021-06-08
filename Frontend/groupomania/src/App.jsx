// Librairies - CSS
import React, { useState, useEffect } from 'react';
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
	return (
		<div className="App">
			
			<Layout>

				<Switch>
					<Redirect exact from="/" to={routes.SIGNUP} />
					<Route exact path={routes.SIGNUP} component={Signup}/>
					<Route exact path={routes.LOGIN} component={Login}/>
					<Route exact path={routes.CHANGEPASSWORD} render={() => <h1>mot de passe</h1>}/>
					<Route exact path={routes.SHOWALLPOST} component={ShowPosts}/>
					<Route exact path={routes.ADDPOST} component={AddPost}/>
					{/* <Route exact path={routes.ADDPOST + ":id"} render={() => <h1>Modif poste</h1>}/> */}
					<Route exact path={routes.PROFIL} component={Profil}/>
					<Route render={() => <h1>Page introuvable</h1>} />
				</Switch>

			</Layout>
			
		</div>
	);
}