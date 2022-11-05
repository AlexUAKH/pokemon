import { FC, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import FullScreenLoader from "./components/FullScreenLoader";
import Header from "./components/Header";

const PokemonDetails = lazy(() => import("./pages/PokemonDetails"));
const PokemonList = lazy(() => import("./pages/PokemonList"));

const App: FC = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="app__main">
          <Suspense fallback={<FullScreenLoader />}>
            <Routes>
              <Route path="/" element={<PokemonList />} />
              <Route path="/pokemon/:id" element={<PokemonDetails />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
