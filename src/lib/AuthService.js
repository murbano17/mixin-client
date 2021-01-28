import axios from "axios";

class Auth {
  constructor() {
    this.services = axios.create({
      baseURL: "http://localhost:4000",
      withCredentials: true,
    });
  }

  signup({ username, email, password }) {
    const request = this.services.post("/api/auth/signup", {
      username,
      email,
      password,
    });
    request.then(({ data }) => data).catch((error) => error);
    return request;
  }

  login({ email, password }) {
    const request = this.services.post("/api/auth/login", { email, password });
    request.then(({ data }) => data).catch(({ error }) => error);
    console.log(request);
    return request;
  }
  
  loginGoogle = async ({ tokenId }) => {
    const user = await this.services.post("/api/auth/googlelogin", { tokenId });
    return user.data;
  };
  logout = async () => {
    const logout = await this.services.post("/api/auth/logout", {});
    return logout.data;
  };

  me = async () => {
    const me = await this.services.get("/api/auth/me");
    return me.data;
  };
  user = async () => {
    const user = this.services.get("/api/auth/user");
    return user.data;
  };

  products = async () => {
    const products = await this.services.get("/api/products");
    return products.data;
  };

  cart = async () => {
    const userCart = await this.services.get("/api/products/cart");
    return userCart.data;
  };

  addproduct = async (id) => {
    const productAdd = await this.services.post(
      `api/products/addproduct/${id}`
    );
    return productAdd.data;
  };
  delete = async (_id) => {
    const deleteProduct = await this.services.post(
      `api/products/deleteproduct`,
      { _id }
    );
    return deleteProduct.data;
  };

  addquantity = async (_id, quantity) => {
    const productQuantity = await this.services.post(
      `api/products/addquantity`,
      { _id, quantity }
    );
    return productQuantity.data;
  };

  payment = async (id, amount) => {
    const payment = await this.services.post(`/api/products/payment`, {
      id,
      amount,
    });
    return payment.data;
  };
}
const axiosRequestFunctions = new Auth();

export default axiosRequestFunctions;
