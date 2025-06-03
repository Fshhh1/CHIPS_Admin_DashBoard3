
import { useState } from 'react';

export default function Marketplace() {
  const [tokenBalance, setTokenBalance] = useState(1000);
  const [cart, setCart] = useState([]);

  const modules = [
    { id: 1, name: 'core.protocol.chipx', price: 100 },
    { id: 2, name: 'marketplace.module.chipx', price: 150 },
    { id: 3, name: 'developer.tools.chipx', price: 200 }
  ];

  const addToCart = (module) => {
    if (tokenBalance >= module.price) {
      setCart([...cart, module]);
      setTokenBalance(tokenBalance - module.price);
      alert(`${module.name} added to cart!`);
    } else {
      alert('Insufficient tokens.');
    }
  };

  const checkout = () => {
    if (cart.length > 0) {
      alert('Purchase successful!');
      setCart([]);
    } else {
      alert('Your cart is empty.');
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-orange-500 to-yellow-600 text-white">
      <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Marketplace</h1>
        <p className="mb-4">Token Balance: {tokenBalance}</p>
        <div className="mb-4">
          {modules.map((module) => (
            <div key={module.id} className="mb-2 flex justify-between items-center">
              <span>{module.name} - {module.price} tokens</span>
              <button
                className="bg-yellow-500 hover:bg-yellow-600 px-2 py-1 rounded"
                onClick={() => addToCart(module)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        <button
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded mt-4"
          onClick={checkout}
        >
          Checkout
        </button>
        <div className="mt-4">
          <h2 className="text-xl font-bold">Cart:</h2>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>{item.name} - {item.price} tokens</li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
