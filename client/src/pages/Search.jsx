import React from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import { useDataContext } from "../contexts/Data.context";

const Search = () => {
  const { name } = useParams();
  const { product } = useDataContext();

  return (
    <div className="search">
      <div className="container">
        <div className="search_top">
          <p>No items found for "{name}"</p>
          <div className="sort_by">
            <label htmlFor="sort_by">Sort By:</label>
            <select name="sort_by" id="sort_by">
              <option value="best">Best Match</option>
              <option value="top">Top sales</option>
            </select>
          </div>
        </div>

        <div className="search_body">
          {product
            .filter((value) => value.product_name.toLowerCase().includes(name))
            .map((product) => (
              <Card key={product._id} {...product} />
            ))}
          {product.length > 0 &&
            product.filter((value) =>
              value.product_name.toLowerCase().includes(name)
            ).length === 0 && (
              <div className="not_found">
                <i className="fa-solid fa-magnifying-glass"></i>
                <span>No Item Found</span>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Search;
