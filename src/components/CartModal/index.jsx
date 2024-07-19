import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";
import { closeModalKeydown } from "../../hooks/closeModalKeydown";
import { closeModalClick } from "../../hooks/closeModalClick";
import style from "../CartModal/style.module.scss";
import { CartItemCard } from "./CartItemCard";

export const CartModal = ({
  cartList,
  setCartList,
  setOpenModal,
  addItem,
  removeItem,
  removeItem2,
  removesAllItens,
}) => {
  const total = cartList.reduce((prevValue, product) => {
    return prevValue + product.price * product.quantity;
  }, 0);

  const modalRef = closeModalClick(() => {
    setOpenModal(false);
  });

  const buttonRef = closeModalKeydown("Escape", () => {
    setOpenModal(false);
  });

  const handleRemoveItem = (productId) => {
    setCartList((prevCartList) => {
      return prevCartList.filter((item) => item.id !== productId);
    });
  };

  return (
    <div className={style.modalOverlay} role="dialog">
      <div className={style.modalBox} ref={modalRef}>
        <div className={style.headerModal}>
          <h2 className={style.h2}>Carrinho de compras</h2>
          <button
            className={style.btnClose}
            ref={buttonRef}
            onClick={() => setOpenModal(false)}
            aria-label="close"
            title="Fechar"
          >
            <MdClose size={21} />
          </button>
        </div>
        <div className={style.overFlow}>
          <ul>
            {total === 0 ? (
              <h1 className={style.h1}>Lista vazia</h1>
            ) : (
              cartList.map((product) => (
                <CartItemCard
                  key={product.id}
                  product={product}
                  addItem={addItem}
                  removeItem={removeItem}
                  removeItem2={removeItem2}
                  handleRemoveItem={handleRemoveItem}
                />
              ))
            )}
          </ul>
        </div>
        <div>
          <div className={style.total}>
            <span className="title1">Total</span>
            <span className="subTitle">
              {total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
          <div className={style.divBtn}>
            <button
              className={style.btnRemoveAll}
              onClick={() => {
                removesAllItens();
                toast.success("Lista do carrinho apagada!");
              }}
            >
              Remover todos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
