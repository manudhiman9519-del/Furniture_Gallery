// import { useEffect, useState } from "react";
// import "./App.css";

// function App() {
//   const [images, setImages] = useState([]);

//   useEffect(() => {

//     async function getImages() {
//       const response = await fetch(
//         // "https://dummyjson.com/products?limit=30"
//        "https://dummyjson.com/products/category/furniture"
//       );

//       const data = await response.json();

//       console.log(data);

//       setImages(data.products);
//     }

//     getImages();

//   }, []);

//   return (
//     <div>
//       <h1>Image Gallery</h1>

//       <div className="gallery">
//         {images.map((item) => (
//           <div className="card" key={item.id}>
//             <img src={item.thumbnail} alt={item.title} />
//             <h3>{item.title}</h3>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;



import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [furniture, setFurniture] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    async function getFurniture() {
      try {
        const response = await fetch(
          "https://dummyjson.com/products/category/furniture"
        //  "https://dummyjson.com/products/search?q=bed"
        );

        const data = await response.json();

        setFurniture(data.products);
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setLoading(false);
      }
    }

    getFurniture();
  }, []);

  // Search filter
  const filteredFurniture = furniture.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">

      <h1>Furniture Gallery</h1>

      <p className="subtitle">
        Explore Our Furniture Collection
      </p>

      {/* Search */}

      <div className="search-box">
        <input
          type="text"
          placeholder="Search furniture..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <h2 className="loading">
          Loading Furniture...
        </h2>
      ) : (
        <div className="gallery">

          {filteredFurniture.length > 0 ? (
            filteredFurniture.map((item) => (
              <div className="card" key={item.id}>

                <img
                  src={item.thumbnail}
                  alt={item.title}
                />

                <div className="card-content">

                  <h2>{item.title}</h2>

                  <p className="description">
                    {item.description}
                  </p>

                  <h3>${item.price}</h3>

                  <button
                    onClick={() => setSelectedItem(item)}
                  >
                    View Details
                  </button>

                </div>

              </div>
            ))
          ) : (
            <h2 className="no-result">
              No Furniture Found 😔
            </h2>
          )}

        </div>
      )}

      {/* Modal */}

      {selectedItem && (
        <div className="modal-overlay">

          <div className="modal">

            <button
              className="close-btn"
              onClick={() => setSelectedItem(null)}
            >
              ×
            </button>

            <img
              src={selectedItem.thumbnail}
              alt={selectedItem.title}
            />

            <div className="modal-content">

              <h2>{selectedItem.title}</h2>

              <p>
                {selectedItem.description}
              </p>

              <h3>
                Price: ${selectedItem.price}
              </h3>

              <p>
                Rating: ⭐ {selectedItem.rating}
              </p>

              <p>
                Stock: {selectedItem.stock}
              </p>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default App;