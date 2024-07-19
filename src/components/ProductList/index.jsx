import { useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import style from "../ProductList/style.module.scss";
import { MdClear } from "react-icons/md";

export const ProductList = ({ productList, addItem, search, setSearch }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("Todos");

  useEffect(() => {
    let filteredList = productList;

    if (search) {
      filteredList = filteredList.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (categoryFilter !== "Todos") {
      filteredList = filteredList.filter(
        (product) => product.category === categoryFilter
      );
    }

    setFilteredProducts(filteredList);
  }, [productList, search, categoryFilter]);

  const clearSearch = () => {
    setSearch("");
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  return (
    <div>
      <div className={style.divSelect}>
        <select
          className={style.select}
          name="Selector"
          id="Selector"
          onChange={handleCategoryChange}
          value={categoryFilter}
        >
          <option value="Todos">Todos</option>
          <option value="Sanduíches">Sanduíches</option>
          <option value="Bebidas">Bebidas</option>
        </select>
      </div>

      {search && (
        <div className={style.result}>
          <p>
            Resultados de busca para: <strong>{search}</strong>
          </p>
          <button className={style.btnCleanResult} onClick={clearSearch}>
            <MdClear size={21} />
          </button>
        </div>
      )}

      {filteredProducts.length === 0 ? (
        search ? (
          <div className={style.notFound}>
            <h1>Nenhum item encontrado!</h1>
          </div>
        ) : (
          <h1>Carregando produtos...</h1>
        )
      ) : (
        <ul className={style.container}>
          {filteredProducts.map((product) => (
            <ProductCard addItem={addItem} key={product.id} product={product} />
          ))}
        </ul>
      )}
    </div>
  );
};
