import React from "react";
import "./components.css";
import { useNavigate } from "react-router-dom";

const Home = ({ channels }) => {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex" }}>
      <div className="Categories">
        <h1>Categories</h1>
        <div>
          <div className="routeTiles">
            {channels.map((element) => {
              return (
                <div class="card">
                  <div class="card-body">
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
  );
};

export default Home;
