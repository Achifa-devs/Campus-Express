// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';
import '../styles/Buyer/xx-large-screen.css'
import '../styles/Buyer/x-large-screen.css'
import '../styles/Buyer/medium-screen.css'
import '../styles/Buyer/small-screen.css'
import '../styles/Buyer/large-screen.css'
import store from '~/redux/store';
import { Provider } from 'react-redux';

const MyApp = ({ Component, pageProps }) => {
    return (
      <Html>
        <Head>
          {/* Stylesheets */}
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
            integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
            crossorigin="anonymous"
          />
          
          {/* Scripts */}
          <script
            src="https://cdn.tailwindcss.com"
            async
          />
          <script
            src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
            integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
            crossorigin="anonymous"
            async
          />
          <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
            integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+"
            crossorigin="anonymous"
            async
          />
          <script
            src="https://js.pusher.com/7.2/pusher.min.js"
            async
          />
          <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
            crossorigin="anonymous"
            async
          />
          <script
            src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js"
            integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB"
            crossorigin="anonymous"
            async
          />
          <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js"
            integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13"
            crossorigin="anonymous"
            async
          />
        </Head>
        <body>
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
        </body>
      </Html>
    );
  }


export default MyApp;
