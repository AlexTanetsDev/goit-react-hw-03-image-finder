import { Modal } from "components/Modal/Modal"
import { Component } from "react"
import { GalleryItem } from "./ImageGalleryItem.styled"
import PropTypes, { shape } from "prop-types"

export class ImageGalleryItem extends Component{

    state = {
        selectedImg: null,
    }

    hendleClick = (e) => {
        this.setState({selectedImg: e.target.src })
    
    }

    hendleModalClose = () => {
        this.setState({selectedImg: null})
    } 


    render() {
        const { image } = this.props;
        const { selectedImg } = this.state;
   return (
        <GalleryItem onClick={this.hendleClick}>
           <img src={image.smallImage} alt={image.tags} />
           {selectedImg && <Modal image={selectedImg} onClose={this.hendleModalClose} />}
        </GalleryItem>
    )
}
 
}

ImageGalleryItem.propTypes = {
    image: shape({
        smallImage: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,

    })
}
