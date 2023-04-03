import React, {useEffect, useState} from "react";
import { useDispatch} from "react-redux";
import { addArticle } from "../actions/index";
import { updateArticle } from "../actions/index";
import { motion } from 'framer-motion';

 function AddArticle(props) {

    const [formData, setFormData] = useState({
    id : '',
    shop: '',
    price: ''
  });

  const {isOpen , closeAddBox, eidtShop} = props
  const dispatch = useDispatch();
   
  useEffect(() => {
    
    
    if(eidtShop.length !== 0) {
      const {id, shop, price} = eidtShop;
      
      setFormData({id,shop, price })
    }

 
    
  }, [eidtShop])
  

 

  useEffect(() => {
    if(isOpen === false) {
      setFormData({shop: '', price: ''}); 
    }
  }, [isOpen]);
  
 

  const modalVariants = {
    visible: { y: 0 },
    hidden: { y: '-100vh' },
  };

 
      const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
        
  };


      const handleSubmit = (event) => {
      
        event.preventDefault();

        if (!formData.shop || !formData.price) {
          alert('Please fill in all the fields');
          return;
        }

        
        if(formData.id === undefined) {
          formData.id = new Date().getTime().toString();
         const {id, shop, price } = formData;
         dispatch(addArticle({id, shop, price}));
        
        }else {
          const {id, shop,price } = formData;
          dispatch(updateArticle({id, shop, price}));
         

        }

        setFormData({id:undefined, shop: '',
        price: ''})

      
       
      }


      

    
  return (


    <motion.div
      className={`fixed top-0  w-full h-full bg-gray-800 bg-opacity-50 ${isOpen ? 'flex' : 'hidden'} justify-center items-center column`}
        
      
      animate={{opacity: 1}}
      transition={{ duration: 0.5 }}
      

      >
        
        
        <motion.form onSubmit={handleSubmit} className="shadow-lg bg-white p-3 rounded-lg w-80 relative" variants={modalVariants}>
        <label className="w-8 h-8 bg-red-600 text-white rounded-full text-2xl font-blod float-right flex justify-center items-center absolute -top-6 -right-2 cursor-pointer" onClick={closeAddBox}>X</label>
      <label className="block text-gray-700 font-bold ">Enter Product</label>
      <input type="text" className="border border-gray-400 p-2 w-full outline-0" value={formData.shop} onChange={handleChange} id="shop" /><br/><br/>
      <label className="block text-gray-700 font-bold">Enter Price</label>
      <input type="text" className="border border-gray-400 p-2 w-full outline-0" value={formData.price} onChange={handleChange} id="price" />


      
      <br/><br/>
      
        <input type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right" value="Save"/>
    </motion.form>
    </motion.div>
  )
}

export default AddArticle;
