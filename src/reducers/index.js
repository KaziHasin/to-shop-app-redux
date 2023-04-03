import {ADD_ARTICLE, UPDATE_ARTICLE, DELETE_ARTICLE} from '../constants/action-types'

const initialSate ={
    ariticles: [],
    
}

function rootReducer(state = initialSate, action ) {

    if(action.type === ADD_ARTICLE) {
      console.log(state.total);
       return{
        ...state,
        ariticles: [...state.ariticles, action.payload],

        
        
       
        
       }

      
    }


    if(action.type === UPDATE_ARTICLE) {
      const {id, shop, price } = action.payload;
      
      const updatedArticles = state.ariticles.map(article => {
        if(article.id === id) {
          return {...article, shop, price}
        }
        return article;
      });

      return {ariticles: updatedArticles};
    }
    
    
    if(action.type === DELETE_ARTICLE) {
   
 
      const updatedArticles = state.ariticles.filter(article => !action.payload.includes(article.id));
      return {ariticles: updatedArticles};
    }

  return state;

}


export default rootReducer