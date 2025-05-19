import "./App.css";
import AllSpecies from "./components/AllSpecies";
import Banner from "./components/Banner";
import EndangeredList from "./components/EndangeredList";
import AppLayout from "./components/Header";

function App() {
  return (
    <div>
      <AppLayout />
      <Banner />
      <AllSpecies />
      <EndangeredList />
    </div>
  );
}

export default App;
