import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import Layouts from "../views/layouts/layout1";
import CollectionBanner from "../views/layouts/layout1/collection-banner";
import TabProduct from "../views/layouts/widgets/Tab-Product/TabProduct";
import CollectionBannerTwo from "../views/layouts/layout1/collection-banner-two";
import RatioSquare from "../views/layouts/widgets/ratio-square";
import CollectionBannerThree from "../views/layouts/layout1/collection-banner-three";
import ContactBanner from "../views/layouts/widgets/contact-us";
import Brands from "../views/layouts/widgets/roundedCategory";
import Suplier from "views/layouts/layout2/suplierCategory";
import ShortDisplay from "views/layouts/layout2/ShortDisplay";
import AllProducts from "../views/layouts/widgets/AllProducts/allProducts";
import Menu from "views/layouts/layout1/menu";
import TopCategory from "views/layouts/widgets/topCategory";
import type { InferGetStaticPropsType, GetStaticProps } from "next";

interface CategoriesData {
  category1: string;
  category2: string;
  category3: string;
  category4: string;
  f_s_banner_1: string;
  f_s_banner_2: string;
  f_s_banner_3: string;
  e_s_banner_1: string;
  e_s_banner_2: string;
  e_s_banner_3: string;
  center_image1: string;
}

interface ApiData {
  Homesetting: CategoriesData;
  menus: [];
  brands: any;
}

const Home: NextPage = ({
  repo,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [error, setError] = useState<string | null>(null);
  const [categoriesData, setCategoriesData] = useState<CategoriesData>({
    category1: "",
    category2: "",
    category3: "",
    category4: "",
    f_s_banner_1: "",
    f_s_banner_2: "",
    f_s_banner_3: "",
    e_s_banner_1: "",
    e_s_banner_2: "",
    e_s_banner_3: "",
    center_image1: "",
  });
  const apiData = repo && (repo as ApiData);

  useEffect(() => {
    try {
      if (apiData.Homesetting) {
        setCategoriesData(apiData.Homesetting);
      }
    } catch (err) {
      console.error("Failed to fetch API data:", err);
      setError("Failed to fetch data. Please try again later.");
    }
  }, [apiData]);
  return (
    <>
      <Layouts>
        <div className="bg-light">
          <Menu meneData={apiData} />
          <div className="my-4">
            <TopCategory menus={apiData?.menus} />
          </div>
          <CollectionBanner
            banner1={categoriesData.f_s_banner_1}
            banner2={categoriesData.f_s_banner_2}
            banner3={categoriesData.f_s_banner_3}
          />
          <TabProduct
            catId={categoriesData.category1}
            menus={apiData.menus}
            effect="icon-inline"
          />
          <TabProduct
            catId={categoriesData.category2}
            effect="icon-inline"
            menus={apiData.menus}
          />
          <CollectionBannerTwo banner={categoriesData.center_image1} />
          <TabProduct
            catId={categoriesData.category3}
            effect="icon-inline"
            menus={apiData?.menus}
          />
          {/* <ShortDisplay data={apiData} /> */}
          <section className="my-5 custom-container">
            <Brands />
          </section>
          <TabProduct
            catId={categoriesData.category4}
            effect="icon-inline"
            menus={apiData.menus}
          />
          <RatioSquare />
          <CollectionBannerThree
            ban1={categoriesData.e_s_banner_1}
            ban2={categoriesData.e_s_banner_2}
            ban3={categoriesData.e_s_banner_3}
          />
          <section className="mt-5 custom-container">
            <Suplier />
          </section>
          <AllProducts />
          <ContactBanner />
        </div>
      </Layouts>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/home_page_all`
    );
    const repo = await res.json();
    return { props: { repo } };
  } catch (error) {
    console.error("Failed to fetch API data during build:", error);
    return { props: { repo: null } };
  }
};

export default Home;
