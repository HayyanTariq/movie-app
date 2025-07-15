import MovieCard from '../components/MovieCard'
import { startTransition } from 'react';
import { useState, useEffect } from 'react';
import {searchMovies, getPopularMovies} from "../services/api"
import '../css/Home.css';

function Home (){
  const [searchQuery, setSearchQuery] = useState(''); 
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(()=>{
     const loadPopularMovies = async()=>{
      try{
        const popularMovies = await getPopularMovies()
        setMovies(popularMovies);
      }catch(err){
        console.log(err);
        setError('Failed to load popular movies....');
      }
      finally {
        setLoading(false);
      }
     }
     loadPopularMovies();
  },[searchQuery])

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return; // Prevent multiple searches while loading
    setLoading(true);
    setError(null);

    try {
      const results = await searchMovies(searchQuery);
      setMovies(results);
    } catch (err) {
      console.log(err);
      setError('Failed to search movies...');
    } finally {
      setLoading(false);
    }
  }
    return (
        <div className="home-page">
          <form onSubmit={handleSearch} className="search-form">
            <input 
            type="text" 
            placeholder="Search for a movie..."
            className="search-input" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">Search</button>
            </form>
   
            {error && <div className="error">{error}</div>}
            {loading ? (<div className="loading">Loading...</div>) :   <div className='movies-grid'>
           {movies.map((movie) => 
            (
             <MovieCard movie={movie} key={movie.id}  />
            ))} 
         </div> }
         
        </div>
    );
}
export default Home;