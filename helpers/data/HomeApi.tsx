import React, { createContext, useContext, useState, useEffect } from "react";

const ApiDataContext = createContext({});

export const ApiDataProvider = ({ children }) => {
  const [homeApiData, setApiData] = useState(() => {
    // Try to retrieve cached data from localStorage
    // Try to retrieve cached data from localStorage if running in a browser
    if (typeof window !== "undefined") {
      const cachedData = localStorage.getItem("apiDataCache");
      return cachedData ? JSON.parse(cachedData) : null;
    }
    return null; // Return null or a default value for server-side rendering
  });

  useEffect(() => {
    const fetchAndCacheData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/home_page_all`
        );
        if (response.ok) {
          const data = await response.json();

          // Set the fetched data in state
          setApiData(data);

          // Cache the fetched data in localStorage
          localStorage.setItem("apiDataCache", JSON.stringify(data));
        } else {
          console.error("Error fetching API data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching API data:", error);
      }
    };

    // Fetch and cache data on component mount
    fetchAndCacheData();
  }, [ApiDataContext]);

  return (
    <ApiDataContext.Provider value={homeApiData}>
      {children}
    </ApiDataContext.Provider>
  );
};

export const useHomeApiData = () => useContext(ApiDataContext);
