import { ToastContainer, toast } from "react-toastify";
import { api } from "../../Services/api";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { CartModal } from "../../components/CartModal";
import { Header } from "../../components/Header";
import { ProductList } from "../../components/ProductList";

export const HomePage = () => {
  const [search, setSearch] = useState("");
  const [productList, setProductList] = useState([]);
  const [cartList, setCartList] = useState(() => {
    const savedCart = localStorage.getItem("cartList");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [openModal, setOpenModal] = useState(false);
  const [contador, setContador] = useState(() => {
    const savedContador = localStorage.getItem("contador");
    return savedContador ? JSON.parse(savedContador) : 0;
  });

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await api.get("products");
        setProductList(data);
      } catch (error) {
        console.error("Erro ao buscar produtos", error);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartList));
    localStorage.setItem("contador", JSON.stringify(contador));
  }, [cartList, contador]);

  const addItem = (product) => {
    setCartList((prevCartList) => {
      const existingProductIndex = prevCartList.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex > -1) {
        const updatedCartList = [...prevCartList];
        updatedCartList[existingProductIndex] = {
          ...updatedCartList[existingProductIndex],
          quantity: updatedCartList[existingProductIndex].quantity + 1,
        };
        console.log(product);
        return updatedCartList;
      } else {
        return [...prevCartList, { ...product, quantity: 1 }];
      }
    });

    setContador((prevContador) => {
      return prevContador + 1;
    });
  };

  const removeItem2 = (itemId) => {
    const productToRemove = cartList.find((item) => item.id === itemId);

    if (!productToRemove) {
      return;
    }

    const newCartList = cartList.filter(({ id }) => id !== itemId);
    setCartList(newCartList);

    setContador((prevContador) => prevContador - productToRemove.quantity);
  };

  const removesAllItens = () => {
    setCartList([]);

    setContador(0);
  };

  const removeItem = (productId) => {
    setCartList((prevCartList) => {
      const updatedCartList = prevCartList
        .map((item) => {
          if (item.id === productId) {
            setContador(contador > 0 ? contador - 1 : 0);
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);

      const itemToRemove = prevCartList.find(
        (item) => item.id === productId && item.quantity === 1
      );
      if (itemToRemove) {
        setContador(contador > 0 ? contador - 1 : 0);
      }

      return updatedCartList;
    });
  };

  return (
    <>
      <Header
        contador={contador}
        setSearch={setSearch}
        setOpenModal={setOpenModal}
      />
      <main>
        <ProductList
          addItem={addItem}
          search={search}
          setSearch={setSearch}
          productList={productList}
        />
        {openModal && (
          <CartModal
            setOpenModal={setOpenModal}
            cartList={cartList}
            addItem={addItem}
            removeItem={removeItem}
            removeItem2={removeItem2}
            removesAllItens={removesAllItens}
          />
        )}
      </main>
      <ToastContainer />
    </>
  );
};
