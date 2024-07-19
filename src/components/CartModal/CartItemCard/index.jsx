import { toast } from "react-toastify";
import { MdArrowLeft, MdArrowRight, MdDelete } from "react-icons/md";
import style from "../CartItemCard/style.module.scss";

export const CartItemCard = ({ product, addItem, removeItem, removeItem2 }) => {
  return (
    <li>
      <div className={style.container}>
        <div className={style.container}>
          <img className={style.img} src={product.img} alt={product.name} />
          <div className={style.cardSpace}>
            <h3 className="title1">{product.name}</h3>
            <span className="titleValue">
              {product.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
            <div className={style.divQtd}>
              <button
                className={style.btnQtd}
                onClick={() => removeItem(product.id)}
              >
                <MdArrowLeft size={20} />
              </button>
              <span className={style.span}>{product.quantity}</span>
              <button className={style.btnQtd} onClick={() => addItem(product)}>
                <MdArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
        <button
          className={style.btnDelete}
          aria-label="delete"
          title="Remover item"
          onClick={() => {
            removeItem2(product.id);
            toast.error(`${product.name} removido do carrinho!`);
          }}
        >
          <MdDelete size={21} />
        </button>
      </div>
    </li>
  );
};
