import { useState } from "react";
import Logo from "../../assets/Logo.svg";
import { MdSearch, MdShoppingCart } from "react-icons/md";
import style from "../Header/style.module.scss";

export const Header = ({ setOpenModal, contador, setSearch }) => {
  const [value, setValue] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setSearch(value);
    setValue("");
  };

  return (
    <header>
      <div className={style.container}>
        <div className={style.divContainer}>
          <img src={Logo} alt="Logo Kenzie Burguer" />
        </div>
        <div className={style.divContainer}>
          <form onSubmit={submit}>
            <div className={style.divInput}>
              <input
                className={style.input}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Buscar produtos..."
              />
              <button className={style.submit} type="submit">
                <MdSearch size={21} />
              </button>
            </div>
          </form>
        </div>
        <div className={style.divContainer}>
          <button
            className={
              contador === 0
                ? style.shoppingCartDesactived
                : style.shoppingCartActivated
            }
            onClick={() => setOpenModal(true)}
          >
            <MdShoppingCart size={25} />
            <span className={style.contador}>{contador}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
