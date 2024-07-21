'use client'

import Image from "next/image";
import styles from "./page.module.css";
import Dashboard from "./dashboard/page";
import { Provider } from "react-redux";
import store from "~/redux/store";
// import Product from "~/components/Buyer/Product/Product";

export default function Home() {
  return ( 
    <>
      <Dashboard />
    </>
  );
}
 