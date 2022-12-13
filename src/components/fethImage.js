import axios from "axios";

export async function fethImg(searchQuery, page, addImages){
try {
        const response = await axios.get(`https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=30743258-d8407cc281d6c3ad648c29387&image_type=photo&orientation=horizontal&per_page=12`);
      
    const images = response.data.hits.map(hit => { return { id: hit.id, smallImage: hit.webformatURL, largeImage: hit.largeImageURL } });
    addImages(images)
} catch (error) {
    console.log(error)
}
}



