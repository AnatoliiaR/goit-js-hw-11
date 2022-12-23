// const axios = require('axios').default;
import axios from 'axios';

// export default class NewsApi {
//     constructor() {
//         this.searchQuery = '';
//         this.page = 1;
//     }

//     async fetchSearch() {

//     const url = 'https://pixabay.com/api/';

// const key = '32280189-3a9b4ba3d5619692d67338181';

// const parameters = `?key=${key}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
    
//         const response = await axios.get(`${url}${parameters}`);
//         const data = await response.data;
//         console.log(response);
//             this.page += 1;
// //  console.log(data.hits);
//         return data;
       
//     };
    

//      resetPage() {
//         this.page = 1; 
//     }
    
//     get query() {
//         return this.searchQuery;
//     }

//     set query(newQuery) {
        
//         this.searchQuery = newQuery;
        
//     }
// }

   
    

    
    export async function fetchApi(searchQuery, page, per_page) {
    const API_KEY = '32280189-3a9b4ba3d5619692d67338181';
    const BASE_URL = 'https://pixabay.com/api/';

    return await axios.get(
        `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`)
        .then(res => res.data);
};

