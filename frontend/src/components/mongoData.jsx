import { useEffect, useState } from "react";
import axios from "axios";

function MongoData() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/products")
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">MongoDB Data</h1>
      <div className="space-y-2">
        {products.map(item => (
          <div key={item._id} className="p-2 border rounded">
            <p className="font-semibold">{item.name}</p>
            <p className="text-sm text-gray-600">{item.shortDescription}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MongoData;