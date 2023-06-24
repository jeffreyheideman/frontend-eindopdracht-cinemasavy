import './App.css';
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Home from "./pages/home/Home";
import {Route, Routes} from "react-router-dom";
import MovieOverview from "./pages/movieoverview/MovieOverview";
import ProfilePage from "./pages/profilepage/ProfilePage";
import TrendingPage from "./pages/trendingpage/TrendingPage";
import axios from "axios";
import {useEffect} from "react";

function App() {



    const API_KEY = "?api_key=d003c2ad249ab65c42c387482cebde5b"
    const API_ENDPOINT = "https://api.themoviedb.org/3/search/movie"
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(`${API_ENDPOINT}${API_KEY}`);
                // console.log(result.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        void fetchData();
    }, []);





  return (
      <>
    <NavigationBar/>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/movieoverview" element={<MovieOverview/>} />
              <Route path="/profile" element={<ProfilePage/>} />
              <Route path="/trending" element={<TrendingPage/>} />
          </Routes>
      </>
  );
}

export default App;
