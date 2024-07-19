import { toast } from "react-toastify";
import style from "../ProductCard/style.module.scss";

export const ProductCard = ({ product, addItem }) => {
  return (
    <div className={style.containerBorder}>
      <li className={style.container}>
        <div className="img">
          <img className="img" src={product.img} alt={product.name} />
        </div>
        <div className={style.divContainer}>
          <h3 className="title1">{product.name}</h3>
          <span className="subTitle">{product.category}</span>
          <span className="titleValue">
            {product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
          <button
            className="buttonDefault"
            onClick={() => {
              addItem(product);
              toast.success(`${product.name} adicionado ao carrinho!`);
            }}
          >
            Adicionar
          </button>
        </div>
      </li>
    </div>
  );
};
