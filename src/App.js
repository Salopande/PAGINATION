import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${page *10 -10}`);
    const data = await res.json();
    if (data && data.products) {
      setProducts(data.products);
      setTotalPages(data.total/10)
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const selectPageHandler = (selectedPage) => {
    if(selectedPage>=1 && selectedPage <=  totalPages && selectedPage!==page){
    setPage(selectedPage)
    }
  };

  return (
    <div className="App">  
      <h1>Pagination</h1>
      {products.length > 0 ? (
        <div className="products">
          {products.map((product) => {
            return (
              <span className="products__single" key={product.id}>
                <img src={product.thumbnail} alt={product.title} />
                <span>{product.title}</span>
              </span>
            );
          })}
        </div>
      ):<h1>Loading......</h1>}
      {products.length && (
        <div className="pagination">
          <span className={page > 1 ? "" : "pagination__disable"} onClick={()=>selectPageHandler(page-1)}>◀</span>
          {[...Array(totalPages)].map((_, i) => {
            return (
              <span
                key={i}
                className={page === i + 1 ? "pagination__selected" : ""}
                onClick={() => selectPageHandler(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}
          <span className={page < totalPages  ? "" : "pagination__disable"} onClick={()=>selectPageHandler(page+1)}>▶</span>
        </div>
      )}
    </div>
  );
}

export default App;
