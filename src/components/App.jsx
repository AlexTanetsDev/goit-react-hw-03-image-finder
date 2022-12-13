import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { GlobalStyles } from "./utils/GlobalStyles";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { LoadMoreBtn } from "./Button/Button";
import styled from "styled-components";
import { Oval } from "react-loader-spinner";
import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const KEY = "30743258-d8407cc281d6c3ad648c29387"

export class App extends Component {

  state = {
    images: null,
    searchQuery: null,
    page: 1,
    selectedImage: null,
    error: null,
    status: "idle"
  
  }


  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ status: "pending" })
   
      axios.get(`${BASE_URL}?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`)
        .then(response => {
          if (response.data.hits.length === 0) {
            this.setState({ error: "There are no images matching your request! Try another keyring", status: "rejected" })
          } else {
             this.addImages({
              images: response.data.hits.map(hit => {
                return { id: hit.id, tags: hit.tags, largeImage: hit.largeImageURL, smallImage: hit.webformatURL }
              })
            })  
          }
        }).catch(error => { this.setState({ error: error.message, status: "rejected" }) })
   
    }
  }

  // componentDidMount(){
  // }


  addImages = ({images}) => {

    if (!this.state.images) {
        this.setState({images: images, status: "resolved"})
    } else {
      this.setState(prevState => {
        return { images: [...prevState.images, ...images], status: "resolved" }
      })
    }
 
  }

 
  
  onFormSubmit = ({searchQuery}) => {
    this.setState({
      searchQuery: searchQuery,
      page: 1,
      images: null
    })
  }

  hendleBtnClick = () => {
    this.setState(prevState => { return { page: prevState.page + 1 } })
  }

  render() {
    
    const { images, status, error } = this.state;
      return (
        <>
          <SApp>
            <Searchbar onFormSubmit={this.onFormSubmit} />
            {status === "rejected" && <p>Ooooppss!! : { error }</p>}  
          {images &&  <ImageGallery images={images} />}
          {status === "pending" && <Oval
                                      height={80}
                                      width={80}
                                      color="#4fa94d"
                                      wrapperStyle={{
                                         marginLeft: "auto",
                                         marginRight: "auto"}}
                                      visible={this.state.loaderVisible}
                                      ariaLabel='oval-loading'
                                      secondaryColor="#4fa94d"
                                      strokeWidth={2}
                                      strokeWidthSecondary={2}
            />}
             {status === "resolved" && <LoadMoreBtn onBtnClick={ this.hendleBtnClick} />}
            <GlobalStyles />  
            </SApp>
    </>
  );
  }

};



export const SApp = styled.div`
    display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`