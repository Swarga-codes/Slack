import React from "react";
import "./components.css";
import { useNavigate } from "react-router-dom";

const Home = ({ channels, getSearchBar, getSearchResults, searchResults }) => {
  const navigate = useNavigate();

  return (
    <>
      {/*Style this to be similar to render page (right side of "Categories") */}
      <div className="home-search">{getSearchBar()}</div>

      <div style={{ display: "flex" }}>
        <div className="Categories">
          <h1>Categories</h1>
          <div>
            <div className="routeTiles">
              {channels.map((element) => {
                return (
                  <div className="card">
                    <div className="card-body">
                      <div onClick={() => navigate("/" + element.name)}>
                        #{element.name}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/*Style this to be at the right of the categories list and make the categories be like the render message list (height overflow goes to scroll)*/}
      {searchResults ? getSearchResults(navigate) : ""}
    </>
  );
};

export default Home;
