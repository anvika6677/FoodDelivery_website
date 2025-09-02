// import React from 'react';

// const SearchBar = ({ searchTerm, setSearchTerm }) => {
//   return (
//     <div className="search-bar">
//       <input
//         type="text"
//         placeholder="Search"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//     </div>
//   );
// };

// export default SearchBar;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      const fetchImages = async () => {
        try {
          const response = await axios.get(`https://api.unsplash.com/search/photos`, {
            params: {
              query: searchTerm,
              client_id: 'G9AefR9AXrxMlg4jdQEPVZa_T0b6Kgx9BpFwzi_U3Mk', // replace with your Unsplash API key
              per_page: 10, // number of images to fetch
            },
          });
          setImages(response.data.results);
        } catch (error) {
          console.error('Error fetching images:', error);
        }
      };
      fetchImages();
    } else {
      setImages([]);
    }
  }, [searchTerm]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="image-results">
        {images.length > 0 ? (
          images.map((image) => (
            <img key={image.id} src={image.urls.small} alt={image.alt_description} />
          ))
        ) : (
          <p>No images found</p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
