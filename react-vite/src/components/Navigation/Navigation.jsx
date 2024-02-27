import {useState,useEffect} from "react"
import { NavLink,useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import CategoriesMenu from "./CategoriesMenu";
import "./Navigation.css";



function Navigation() {
  const navigate = useNavigate();
  const logoImg ="https://cdn.discordapp.com/attachments/1196941900939280534/1199775281888637070/logo-no-background.png?ex=65c3c4cd&is=65b14fcd&hm=f65bd9aa5eadabc00111d0f96b564b8d2d7d34addfcd9625464f9a85ac476dd2&";
  // const [value,setValue] = useState()

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Function to fetch product data from the backend
  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products/all");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      return data.products;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  const handleSearch = async () => {
    try {
      const products = await fetchProducts();
      const sortedProducts = products.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      const results = sortedProducts.filter(product =>
        product.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching products:", error);
      setSearchResults([]);
    }
  };

  
  const clearSearch = () => {
    setSearchQuery('');
  };
  
  useEffect(() => {
    handleSearch();
  }, [searchQuery]);
  
  
  return (
    <div className="nav-main-cont" >
      <div className="logo-main-cont">
        <img src={logoImg} alt="Saved Image" className="logo-img" onClick={() => navigate("/")} />
      </div>
      <div className='nav-cat-comp-cont'>
      <CategoriesMenu />
      </div>
      <div className='nav-search-main-cont'>
      <input
        className='search-bar'
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search..."
      />
             {searchQuery && searchResults.length > 0 && (
          <div className="search-results-container">
            <ul className="search-results-list">
              {searchResults.map(result => (
                <NavLink key={result.id} to={`/products/${result.id}`} className="search-result" onClick={clearSearch} >
                  {/* <img src={result.image} className="result-img" alt={result.name} /> */}
                  <div className="result-details">
                    <h2 className="itemname">{result.name}</h2>
                    {/* <h3 className="proddesc">{result.description}</h3> */}
                    {/* <p className="price">${result.price}</p> */}
                  </div>
                </NavLink>
              ))}
            </ul>
          </div>
        )}


      </div>

      <div>
        <ProfileButton />
      </div>
    </div>
  );
}

export default Navigation;
