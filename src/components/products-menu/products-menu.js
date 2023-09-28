import React, { useState } from "react";
import "./products-menu.css";
import { Button, Container, Input, Label } from "reactstrap";
import Popularproductcard from "../popularproductcard";

export default function ProductsMenu(props) {
  const [searchFilter, setSearchFilter] = useState("");
  const [orderFilter, setOrderFilter] = useState("");
  const [paginationIndex, setPaginationIndex] = useState(0);
const [pageCount, setPageCount] = useState(props.products.length);

  const handleSearchFilterChange = (event) => {
    setPageCount(props.products
        .filter((product) => filterProducts(product)).length);
    setSearchFilter(event.target.value);
  };

  const handleOrderFilterChange = (event) => {
    setOrderFilter(event.target.value);
  };

  const filterProducts = (product) => {
    return (
      product.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      product.description.toLowerCase().includes(searchFilter.toLowerCase())
    );
  };

  const sortProducts = (a, b) => {
    if (orderFilter === "popular") {
      return a.numberSold - b.numberSold;
    } else if (orderFilter === "price-ascending") {
      return a.price - b.price;
    } else if (orderFilter === "price-descending") {
      return b.price - a.price;
    } else if (orderFilter === "rating-ascending") {
      return a.rating - b.rating;
    } else if (orderFilter === "rating-descending") {
      return b.rating - a.rating;
    }
  };
  const checkInclusion = (item) => {
    return (
      props.shoppingList.filter(
        (product) => product.productId === item.productId
      ).length > 0
    );
  };
  return (
    <div className="products-menu-page">
      <Container className="products-menu-container">
        <div className="products-menu-box">
          <div className="products-menu-header">
            <h1>Our products</h1>
          </div>

          <div className="products-menu-body">
            <div className="products-menu-filter-box">
              <div className="products-menu-filter-inputs">
                <Label>Search</Label>
                <Input
                  type="text"
                  placeholder="Search"
                  className="products-menu-filter-search-input"
                  value={searchFilter}
                  onChange={handleSearchFilterChange}
                />
                <Label >Sort</Label>
                <Input
                  type="select"
                  placeholder="Sort"
                  className="products-menu-filter-sort-input"
                  value={orderFilter}
                  onChange={handleOrderFilterChange}
                >
                  <option>Order by:</option>
                  <option value={"popular"}>Most popular</option>
                  <option value={"price-ascending"}>Price ascending</option>
                  <option value={"price-descending"}>Price descending</option>
                  <option value={"rating-ascending"}>Rating ascending</option>
                  <option value={"rating-descending"}>Rating descending</option>
                </Input>
              </div>
              <div className="products-menu-filter-button-container">
              </div>
            </div>
            <div className="products-menu-products-box">
              {props.products
                .filter((product) => filterProducts(product))
                .sort((a, b) => sortProducts(a, b))
                .map((product) => (
                  <Popularproductcard
                    updateCartItem={(temperature, quantity) => {
                      const ci = props.shoppingList.filter(
                        (p) => p.productId === product.productId
                      )[0];
                      ci.temperature = temperature;
                      ci.quantity = quantity;
                      props.updateCartItem(ci);
                    }}
                    temperature={() => {
                      if (checkInclusion(product)) {
                        return props.shoppingList.filter(
                          (p) => p.productId === product.productId
                        )[0].temperature;
                      } else {
                        return undefined;
                      }
                    }}
                    quantity={() => {
                      if (checkInclusion(product)) {
                        console.log(
                          product.name +
                            props.shoppingList.filter(
                              (p) => p.productId === product.productId
                            )[0].quantity
                        );
                        return props.shoppingList.filter(
                          (p) => p.productId === product.productId
                        )[0].quantity;
                      } else {
                        return undefined;
                      }
                    }}
                    product={product}
                    onItemSelect={props.onItemSelect}
                    onItemDeSelect={(item) => {
                      props.onItemDeSelect(
                        props.shoppingList.filter(
                          (product) => product.productId === item.productId
                        )[0]
                      );
                    }}
                    checkInclusion={() => checkInclusion(product)}
                  ></Popularproductcard>
                ))}
            </div>
            <div className="products-menu-pagination">
                    <div className="products-menu-pagination-arrow-left"></div>
                    <div className="products-menu-pagination-index"></div>
                    <div className="products-menu-pagination-arrow-right"></div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
