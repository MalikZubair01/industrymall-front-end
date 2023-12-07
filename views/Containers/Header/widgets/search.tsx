import React, { useEffect, useRef, useState } from "react";
import Router from "next/router";
import { NextPage } from "next";
import { Input, InputGroup } from "reactstrap";
import { useRouter } from "next/router";
import Link from "next/link";

interface Props {
  products: any[];
}

function useDebounce(value: any, delay: any) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const Search: NextPage<Props> = ({ products }) => {
  const router = useRouter();

  const inputEl = useRef(null);
  const [isSearch, setIsSearch] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [resultItems, setResultItems] = useState(null);
  const [loading, setLoading] = useState(false);

  const debouncedSearchTerm = useDebounce(keyword, 300); // 300 milliseconds debounce time

  useEffect(() => {
    if (debouncedSearchTerm && debouncedSearchTerm !== "") {
      setLoading(true);

      // Simulating a fetch request with a filter based on the keyword
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );

      setResultItems(filteredProducts);
      setLoading(false);
      setIsSearch(true);
    } else {
      setIsSearch(false);
      setKeyword("");
      setLoading(false);
    }
  }, [debouncedSearchTerm, products]);

  // ... (rest of the code)

  return (
    <div className="input-block mb-3">
      <div className="input-box">
        <div className="ps-form__input d-flex">
          <input
            className="form-control"
            ref={inputEl}
            type="text"
            value={keyword}
            placeholder="I'm shopping for..."
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            className="btn btn-normal"
            onClick={() => {
              setKeyword("");
            }}
          >
            Clear
          </button>
        </div>

        {/* Product List */}
        {debouncedSearchTerm ? (
          resultItems && resultItems.length > 0 ? (
            <ul
              className="ps-form__input d-flex rounded-3 form-control"
              style={{
                listStyle: "none",
                padding: 0,
                marginTop: "100px",
                display: "flex",
                flexDirection: "column",
                position: "absolute",
                top: "50px",
                zIndex: 999,
                maxHeight: "400px",
                overflowY: "auto",
                width: "calc(90% - 58%)",
                boxSizing: "border-box",
              }}
            >
              {resultItems.slice(0, 10).map((product) => (
                <Link href={`/product-details/${product.id}`} key={product.id}>
                  <li
                    style={{
                      padding: "5px",
                      marginLeft: "15px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={product.url}
                      alt={product.name}
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "contain",
                        marginRight: "10px",
                      }}
                    />
                    <div>
                      <div>{product.name}</div>
                      <div>
                        <span
                          style={{
                            textDecoration: "line-through",
                            marginRight: "5px",
                          }}
                        >
                          ${product.new_price}
                        </span>
                        <span>${product.new_sale_price}</span>
                      </div>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          ) : (
            <p>No product found.</p>
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Search;
