// Librairies - CSS
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import routes from './Config/routes'
import './App.css';

// Composants
import Layout from './Components/Layout/Layout';
import Singup from './Components/Auth/Singup/Singup';
import Login from './Components/Auth/Login/Login';
import ShowPosts from './Components/Messages/ShowPosts/ShowPosts';
import AddPost from './Components/Messages/AddPost/AddPost';
import Profil from './Components/Profil/Profil';


export default function App() 
{
	return (
		<div className="App">
			<Layout>
				<Switch>
					<Redirect exact from="/" to={routes.SINGUP} />
					<Route exact path={routes.SINGUP} component={Singup}/>
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