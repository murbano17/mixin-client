import React from "react";
import auth from "./AuthService"; // Importamos funciones para llamadas axios a la API
const { Consumer, Provider } = React.createContext();

const withAuth = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      return (
        <Consumer>
          {({
            login,
            loginGoogle,
            signup,
            user,
            logout,
            isLoggedin,
            cart,
            userCart,
            message,
          }) => {
            return (
              <WrappedComponent
                login={login}
                loginGoogle={loginGoogle}
                signup={signup}
                user={user}
                logout={logout}
                userCart={userCart}
                cart={cart}
                isLoggedin={isLoggedin}
                message={message}
                {...this.props}
              />
            );
          }}
        </Consumer>
      );
    }
  };
};

// Provider
class AuthProvider extends React.Component {
  state = {
    isLoggedin: false,
    user: null,
    isLoading: true,
    cart: [],
    message: null,
  };

  componentDidMount() {
    auth
      .me()
      .then((user) =>
        this.setState({ isLoggedin: true, user: user, isLoading: false })
      )
      .catch((err) =>
        this.setState({ isLoggedin: false, user: null, isLoading: false })
      );
  }

  signup = (user) => {
    const { username, email, password } = user;
    const request = auth.signup({ username, email, password });
    request
      .then((user) => this.setState({ isLoggedin: true, user, message: null }))
      .catch((error) =>
        this.setState({ message: error.response.data.message })
      );

    return request;
  };

  login = (user) => {
    const { email, password } = user;
    const request = auth.login({ email, password });
    request
      .then((user) => this.setState({ isLoggedin: true, user, message: null }))
      .catch((error) =>
        this.setState({ message: error.response.data.message })
      );

    return request;
  };

  loginGoogle = async ({ tokenId }) => {
    try {
      const user = await auth.loginGoogle({ tokenId });
      this.setState({ isLoggedin: true, user });
    } catch (error) {
      console.log(error);
    }
  };

  logout = async () => {
    try {
      await auth.logout();
      this.setState({ isLoggedin: false, user: null });
    } catch (error) {
      console.log(error);
    }
  };

  userCart = async () => {
    try {
      const userCart = await auth.cart();
      this.setState({ cart: userCart.products });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { isLoading, isLoggedin, user, cart, message } = this.state;
    const { login, logout, signup, loginGoogle, userCart } = this;

    return isLoading ? (
      <div>Loading</div>
    ) : (
      <Provider
        value={{
          isLoggedin,
          user,
          cart,
          message,
          login,
          logout,
          signup,
          loginGoogle,
          userCart,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { Consumer, withAuth };

export default AuthProvider;
