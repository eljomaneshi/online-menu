import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orderItems, setOrderItems] = useState([]);
  const [orderNote, setOrderNote] = useState('');

  const addToOrder = (product) => {
    const exists = orderItems.find(p => p.id === product.id);
    if (exists) {
      setOrderItems(orderItems.map(p =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      ));
    } else {
      setOrderItems([...orderItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromOrder = (id) => {
    setOrderItems(orderItems.filter(p => p.id !== id));
  };

  const changeQuantity = (id, amount) => {
    setOrderItems(orderItems.map(p =>
      p.id === id ? { ...p, quantity: Math.max(1, p.quantity + amount) } : p
    ));
  };

  return (
    <OrderContext.Provider value={{ orderItems, addToOrder, removeFromOrder, changeQuantity, orderNote, setOrderNote }}>
      {children}
    </OrderContext.Provider>
  );
};