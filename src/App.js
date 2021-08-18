import React, { useState, useEffect } from "react";
import fire from "./firebase";
import { fetchBinanceApi, fetchParibuApi } from "./api/index";
import { compare } from "./helpers/helperCoins";
import Login from "./components/Login";
import Container from "./components/Container";
import Info from "./components/Info";
import Coin from "./components/Coin";

const App = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [coinsParibu, setCoinsParibu] = useState([]);
  const [coinsBinance, setCoinsBinance] = useState([]);

  let trade = [];
  let firstTime = false;

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleLogin = () => {
    clearErrors();

    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  const handleLogout = () => {
    fire.auth().signOut();
    firstTime = false;
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      clearInputs();
      if (user) {
        setUser(user);
        firstTime = true;
      } else {
        setUser("");
        firstTime = false;
      }
    });
  };

  const handleCoins = () => {
    trade = compare(coinsBinance, coinsParibu);
  };

  useEffect(() => {
    authListener();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (firstTime) {
        fetchParibuApi().then((res) => {
          setCoinsParibu(res.data);
        });
        fetchBinanceApi().then((res) => {
          setCoinsBinance(res.data);
        });
      }
    }, 3000);
    return () => interval;
  }, []);

  return (
    <Container>
      {user ? (
        <>
          <Info handleLogout={handleLogout} />
          {handleCoins()}
          {trade.map((coin) => {
            let erc = false;
            if (
              coin.coinName === "HOT" ||
              coin.coinName === "CHZ" ||
              coin.coinName === "REEF" ||
              coin.coinName === "BAT" ||
              coin.coinName === "OMG" ||
              coin.coinName === "LINK" ||
              coin.coinName === "AAVE" ||
              coin.coinName === "LRC" ||
              coin.coinName === "BAND" ||
              coin.coinName === "UNI" ||
              coin.coinName === "BAL" ||
              coin.coinName === "ENJ"
            ) {
              erc = true;
            }
            return (
              <Coin
                key={coin.key}
                erc={erc}
                name={coin.coinName}
                puan={coin.puan}
                buy={coin.buy}
                sell={coin.sell}
                buyPrice={coin.buyPrice}
                sellPrice={coin.sellPrice}
              />
            );
          })}
        </>
      ) : (
        <Login
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          emailError={emailError}
          passwordError={passwordError}
        />
      )}
    </Container>
  );
};

export default App;
