import { Container } from "reactstrap";
import "./App.css";
import Appnavbar from "./components/appnavbar";
import Hero from "./components/hero";
import "bootstrap/dist/css/bootstrap.min.css";
import Popularproduct from "./components/popularproduct";
import Howto from "./components/howto";
import Aboutsection from "./components/about-section/about-section";
import Menucard from "./components/menu-section/menucard";
import Menu from "./components/menu-section/menu";
import Testimonial from "./components/testimonial/testimonial";
import Newsteller from "./components/newsteller/newsteller";
import { useEffect, useState } from "react";
import Notificationtray from "./components/items/notificationtray/notificationtray";
import { useLocalStorage } from "./useLocalStorage";
import fetchWithAuth from "./fetch-interceptor";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CompleteOder from "./components/complete-order/complete-oder";
import { Toaster } from "react-hot-toast";
import PurchaseHistory from "./components/purchase-history/purchase-history";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ProductsMenu from "./components/products-menu/products-menu";

function App() {
  const [shopItems, setShopItems] = useState([]);
  const [shoppingList, setshoppingList] = useState([]);
  const [isNotificationTray, setIsNotificationTray] = useState(false);
  const [token, setToken] = useLocalStorage(
    "token",
    localStorage.getItem("token")
  );
  const [currentUser, setCurrentUser] = useState({
    userId: "",
    name: "",
    lastName: "",
    email: "",
    gender: "",
    image: "",
  });
  const addToShoppingList = (item, quantity, temperature) => {
    const params = new URLSearchParams();
    params.append("productId", item.productId);
    params.append("userId", currentUser.userId);
    params.append("temperature", temperature);
    params.append("quantity", quantity);

    fetchWithAuth(
      "https://localhost:7289/ShoppingCart/add-to-cart?" + params.toString(),
      {
        method: "POST",
      }
    ).then((res) => {
      if (res.ok) {
        getShoppingList();
      }
    });
  };

  const removeFromShoppingList = (item) => {
    // consume https://localhost:7289/ShoppingCart/remove-from-cart to delete item by cartItemId
    const params = new URLSearchParams();
    params.append("Id", item.cartItemId);
    fetchWithAuth(
      "https://localhost:7289/ShoppingCart/remove-from-cart?" +
        params.toString(),
      {
        method: "DELETE",
      }
    ).then((res) => {
      if (res.ok) {
        getShoppingList();
      }
    });
  };

  const getShoppingList = async () => {
    //consuming https://localhost:7289/ShoppingCart/get-my-cart-items to populate shopping cart
    await fetchWithAuth("https://localhost:7289/ShoppingCart/get-my-cart-items")
      .then((res) => {
        if (res) {
          return res.json();
        } else {
          setToken("");
          //stop the transaction
          return [];
        }
      })
      .then((data) => {
        setshoppingList(() => {
          const items = data.filter((e) => true);
          return items;
        });
      })
      .then(() => {
        getShopItems();
      });
  };

const onLogin = () => {
  getShoppingList();
}

const onLogout = () => {
  setshoppingList([]);
}
  
  const updateCartItem = (item) => {
    //consuming https://localhost:7289/ShoppingCart/update-cart-item to update cart item
    const params = new URLSearchParams();
    params.append("cartItemId", item.cartItemId);
    params.append("quantity", item.quantity);
    params.append("temperature", item.temperature);
    fetchWithAuth(
      "https://localhost:7289/ShoppingCart/update-cart-item?" +
        params.toString(),
      {
        method: "PUT",
      }
    ).then((res) => {
      if (res.ok) {
        getShoppingList();
      }
    });
  };

  const getCurrentUser = async () => {
    if (!token) return [];

    try {
      const res = await fetchWithAuth("https://localhost:7289/Users/get-user", {
        headers: {
          method: "GET",
        },
      });

      if (!res) {
        // response failed entirely
        setToken("");
        throw new Error("No response from fetch");
      }

      if (res && res.ok) {
        const data = await res.json();
        //data.Role is a string, with many roles split by "," example ("Delivery,Admin,User"). 
        //if it contains the role Admin, redirect to "localhost:3001/Auth?jwt="+token

        if( data.claims.split(",").includes("Admin")) {
         // window.location.href = "https://localhost:3001/Auth?jwt="+token;
        }
        setCurrentUser(data);
        return data;
      } else {
        // invalid status, expire token
        setToken("");
        return [];
      }
    } catch (err) {
      // handle error from fetch
      console.error(err);
      return [];
    }
  };

  useEffect(() => {
    
    if (token !== ""){
      getCurrentUser();
      getShoppingList();
    }
    else{
      setCurrentUser({});
      setshoppingList([]);
    }
  }, [token]);

  const getShopItems = async () => {
    await fetchWithAuth("https://localhost:7289/Products/get-all")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          setToken("");
          //stop the transaction
          return [];
        }
      })
      .then((data) => {
        setShopItems((prev) => {
          const items = data.filter((e) => true);
          return items;
        });
      });
  };

  useEffect(() => {
    if (token !== "") {
      getCurrentUser();
      getShoppingList();
    }
  }, []);

  useEffect(() => {
    getShopItems();
  }, [shoppingList]);

  return (
    <div>
      <Toaster />
      <Appnavbar
        isNotificationTray={isNotificationTray}
        setIsNotificationTray={setIsNotificationTray}
        shoppingList={shoppingList}
        onItemDeSelect={removeFromShoppingList}
        key={shoppingList}
        useLocalStorage={{ token, setToken }}
        currentUser={currentUser}
        onLogin={onLogin}
        onLogout={onLogout}
      />
  
    <BrowserRouter>
      
      <Routes>
        <Route
          index
          element={
            <div className="App">
              <header className="App-header">
                <div>
                  <Hero />
                </div>
              </header>
              <body className="App-body">
                <Popularproduct
                  updateCartItem={updateCartItem}
                  shoppingList={shoppingList}
                  products={shopItems.slice(0, 3)}
                  onItemSelect={addToShoppingList}
                  onItemDeSelect={removeFromShoppingList}
                />
                <Howto />
                <Aboutsection />
                <Menu
                  updateCartItem={updateCartItem}
                  shoppingList={shoppingList}
                  products={shopItems.slice(3)}
                  onItemSelect={addToShoppingList}
                  onItemDeSelect={removeFromShoppingList}
                />
                <Testimonial />
                <Newsteller />
              </body>
            </div>
          }
        />
        <Route
          path="/order"
          element={
            
              <CompleteOder
                shoppingList={shoppingList}
                updateCartItem={updateCartItem}
              />
            
          }
        />
        <Route 
        path="/purchase-history"
        element={
          <PurchaseHistory />
        } />
        <Route
          path="/products"
          element={
            <ProductsMenu
            updateCartItem={updateCartItem}
                  shoppingList={shoppingList}
                  products={shopItems}
                  onItemSelect={addToShoppingList}
                  onItemDeSelect={removeFromShoppingList}
              ></ProductsMenu>
          } />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
