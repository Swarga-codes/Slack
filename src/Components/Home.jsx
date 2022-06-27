import React from "react";
import "./components.css";
import { useNavigate } from "react-router-dom";

const Home = ({ channels, getSearchBar, getSearchResults, searchResults }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="home-search">{getSearchBar()}</div>

      {searchResults ? (
        <div
          style={{ marginTop: "50px", marginLeft: "30px", marginRight: "30px" }}
        >
          {getSearchResults(navigate)}
        </div>
      ) : (
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
      )}
    </>
  );
};

export default Home;
