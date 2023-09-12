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
import shopItems from "./items.json";
import Notificationtray from "./components/items/notificationtray/notificationtray";
import { useLocalStorage } from "./useLocalStorage";
import fetchWithAuth from "./fetch-interceptor";

function App() {
  const [shoppingList, setshoppingList] = useState([]);
  const [token, setToken] = useLocalStorage("token", "");
  const [currentUser, setCurrentUser] = useState({
    userId: "",
    name: "",
    lastName: "",
    email: "",
    gender: "",
    image: "",
  });
  const addToShoppingList = (item) => {
    setshoppingList((prev) => {
      if (!prev.includes(item)) {
        prev.push(item);
      }
      const newList = prev.filter((e) => true);
      return newList;
    });
  };

  const removeFromShoppingList = (item) => {
    if (shoppingList.includes(item)) {
      setshoppingList((prev) => {
        const newList = prev.filter((e) => e.name !== item.name);
        return newList;
      });
    } else console.log("item does not exist!");
  };


  useEffect( () => {
    if(token!=="" && token !== null)
    { fetchWithAuth("https://localhost:7289/Users/get-user", {headers: {
      method: 'GET'
    }})
    .then(res => res.json())
    .then(data => {
      setCurrentUser(data); 
    });
  }
  }, [token]);
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Appnavbar
            shoppingList={shoppingList}
            onItemDeSelect={removeFromShoppingList}
            key={shoppingList}
            useLocalStorage={{ token, setToken }}
            currentUser={currentUser}
          ></Appnavbar>

          <Hero></Hero>
        </div>
      </header>
      <body className="App-body">
        <Popularproduct
          shoppingList={shoppingList}
          products={shopItems.slice(0, 3)}
          onItemSelect={addToShoppingList}
          onItemDeSelect={removeFromShoppingList}
        />
        <Howto />
        <Aboutsection />
        <Menu
          shoppingList={shoppingList}
          products={shopItems.slice(3)}
          onItemSelect={addToShoppingList}
          onItemDeSelect={removeFromShoppingList}
        />
        <Testimonial />
        <Newsteller />
      </body>
    </div>
  );
}

export default App;
