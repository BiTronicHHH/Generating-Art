import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/app.sass";
import Page from "./components/Page";
import Home from "./screens/Home";
import LayerList from "./screens/LayerList";
import UploadVariants from "./screens/UploadVariants";
import UploadDetails from "./screens/UploadDetails";
import ConnectWallet from "./screens/ConnectWallet";
import Faq from "./screens/Faq";
import Activity from "./screens/Activity";
import Search01 from "./screens/Search01";
import Search02 from "./screens/Search02";
import Profile from "./screens/Profile";
import ProfileEdit from "./screens/ProfileEdit";
import Item from "./screens/Item";
import PageList from "./screens/PageList";
import { useState, useEffect } from "react";
import Web3 from "web3";
import Marketplace from "./abis/Marketplace.json";

function App() {
  const [account, setaccount] = useState("");
  const [productCount, setproductCount] = useState(0);
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(true);
  const [address, setaddress] = useState("");
  const [marketplace, setmarketplace] = useState(null);
  const [flag, setflag] = useState(false);

  // useEffect(async ()=>{
  //   console.log("assdfasdfasdf");
  //   await loadWeb3();
  //   await loadBlockchainData();
  // })
  useEffect(async () => {
    if (flag == false) {
      loadWeb3();
      loadBlockchainData();
      setflag(true);
    }
  });

  const loadWeb3 = async () => {
    //console.log("web3adsfasdf");
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    setaccount(accounts[0]);
    const networkId = await web3.eth.net.getId();
    const networkData = Marketplace.networks[networkId];
    if (networkData) {
      const marketplace = web3.eth.Contract(
        Marketplace.abi,
        networkData.address
      );
      console.log("ogc" + networkData.address);
      //console.log(marketplace);
      //if(marketplace == marketplace1)
      setmarketplace(marketplace);
      setaddress(marketplace.address);

      const productCount = await marketplace.methods.productCount().call();
      setproductCount(productCount);
      console.log("ogc" + productCount);
      // Load products

      for (var i = 1; i <= productCount; i++) {
        const product = await marketplace.methods.products(i).call();
        setproducts([...products, product]);
      }
      setloading(false);
    } else {
      // window.alert("Marketplace contract not deployed to detected network.");
    }
  };

  const createProduct = (name, image, price) => {
    console.log(`craetproduct${name},${image},${price},${marketplace.address}`);
    setloading(true);
    marketplace.methods
      .createProduct(name, image, price, marketplace.address)
      .send({ from: account })
      .once("transactionHash", (transactionHash) => {
        setloading(false);
        window.location.reload();
      });
  };

  const purchaseProduct = (id, price) => {
    setloading(true);
    marketplace.methods
      .purchaseProduct(id, marketplace.address)
      .send({ from: account, value: price })
      .once("transactionHash", (transactionHash) => {
        setloading(false);
        window.location.reload();
      });
  };

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Page account={account} address={address}>
              <Home products={products} purchaseProduct={purchaseProduct} />
            </Page>
          )}
        />
        <Route
          exact
          path="/upload-variants"
          render={() => (
            <Page>
              <UploadVariants />
            </Page>
          )}
        />
        <Route
          exact
          path="/layer-list"
          render={() => (
            <Page>
              <LayerList />
            </Page>
          )}
        />
        <Route
          exact
          path="/upload-details"
          render={() => (
            <Page>
              <UploadDetails
                products={products}
                createProduct={createProduct}
              />
            </Page>
          )}
        />
        <Route
          exact
          path="/connect-wallet"
          render={() => (
            <Page>
              <ConnectWallet />
            </Page>
          )}
        />
        <Route
          exact
          path="/faq"
          render={() => (
            <Page>
              <Faq />
            </Page>
          )}
        />
        <Route
          exact
          path="/activity"
          render={() => (
            <Page>
              <Activity />
            </Page>
          )}
        />
        <Route
          exact
          path="/search01"
          render={() => (
            <Page>
              <Search01 />
            </Page>
          )}
        />
        <Route
          exact
          path="/search02"
          render={() => (
            <Page>
              <Search02 />
            </Page>
          )}
        />
        <Route
          exact
          path="/profile"
          render={() => (
            <Page>
              <Profile />
            </Page>
          )}
        />
        <Route
          exact
          path="/profile-edit"
          render={() => (
            <Page>
              <ProfileEdit />
            </Page>
          )}
        />
        <Route
          exact
          path="/item"
          render={() => (
            <Page>
              <Item />
            </Page>
          )}
        />
        <Route
          exact
          path="/pagelist"
          render={() => (
            <Page>
              <PageList />
            </Page>
          )}
        />
      </Switch>
    </Router>
  );
}

export default App;
