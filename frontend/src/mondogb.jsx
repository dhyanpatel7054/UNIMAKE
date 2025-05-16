import axios from "axios";
import { useEffect, useState } from "react";

function MongoData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/data")
      .then(response => setData(response.data))
      .catch(error => console.error("Error:", error));
  }, []);

  return (
    <div>
      <h1>MongoDB Data</h1>
      {data.map(item => <p key={item._id}>{item.name}</p>)}
    </div>
  );
}

export default MongoData;
