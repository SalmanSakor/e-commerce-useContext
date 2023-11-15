import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "./components/loading/loading.component";

const Navigation = lazy(() =>
  import("./routes/navigation/navigation.component")
);
const Authentication = lazy(() =>
  import("./routes/authentication/authentication.component")
);
const Shop = lazy(() => import("./routes/shop/shop.component"));
const Checkout = lazy(() => import("./routes/checkout/checkout.component"));
const Home = lazy(() => import("./routes/home/home.component"));

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route path="/" element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
