import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from './pages/login';
import ProfilePage from './pages/profile';
import Signin from './pages/sign';

const App = (props) => {
  const user = useSelector(e => e.userReducer)

  let jwt

  try {
    const data = JSON.parse(sessionStorage.getItem("strapi"))

    jwt = data.jwt
  } catch (error) {
    console.log(error)
  }

  if (!jwt && !user.id) {
    return (
      <div className="content y-center x-center">
        <Login />
      </div>
    )
  }

  return (
    <div className="content y-center x-center">
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/signin' component={Signin} />
        <Route exact path='/profile' component={ProfilePage} />
        <Redirect to='/profile' />
      </Switch>
    </div>
  );
};

export default App