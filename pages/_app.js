import React from "react";
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/style.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
