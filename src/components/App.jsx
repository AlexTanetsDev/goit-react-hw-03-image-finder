import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { GlobalStyles } from "./utils/GlobalStyles";


export class App extends Component {

state = {
  images: null,
  searchQuery: null,
  page: 1,
  selectedImage: null,
  
}

  
  onFormSubmit = ({searchQuery}) => {
    console.log(searchQuery);
    this.setState({ searchQuery:  searchQuery  })
  }

  render() {
      return (
        <>
          <Searchbar onFormSubmit={this.onFormSubmit}/>
        <GlobalStyles />  
    </>
  );
  }

};
