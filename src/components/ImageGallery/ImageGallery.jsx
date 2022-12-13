import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem"
import { Gallery } from "./ImageGallery.styled"

export const ImageGallery = ({ images }) => {
    
    return (
        <Gallery>
            {images.map(image => {
               return <ImageGalleryItem image={image} key={image.id}/>
            })}

        </Gallery>
    )
    
}



  