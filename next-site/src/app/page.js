"use client"

import Image from "next/image";
import styles from "./page.module.css";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { Router } from "react-router-dom/dist";
import App from "@/App";

export default function Home() {
  return (
    <main className={styles.main}>
      <Provider store={store}>
          <Router>
            <App /> 
          </Router>
      </Provider>
    </main>
  );
}
