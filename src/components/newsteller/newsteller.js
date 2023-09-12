import React from "react";
import "./newsteller.css";
import { Container } from "reactstrap";
export default function Newsteller() {
  return (
    <Container className="news-teller-container my-auto">

        <div className="news-teller-image">
          <div className="news-teller-content ">
            <div className="news-teller-header">Subscribe to get 50% discount price</div>
            <div className="news-teller-search-box">
              <input className="news-teller-input" placeholder="Email address"></input>
              <a href="#" className="news-teller-button">
                Order now
              </a>
            </div>
          </div>
        </div>

    </Container>
  );
}
