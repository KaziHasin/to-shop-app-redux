import React, {useState,useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux';
import '../css/style.css'
import AddArticle from './AddArticle';
import {deleteArticle} from "../actions/index";





function ArticleList() {
   
  const [AddShop, setAddShop] = useState(false);
  const [eidtShop, setEditShop] = useState([]);
  const [checkselected , setCheckSelected] = useState({});
  const [selectedId, setSelectedId] = useState([]);
  const [isMultiDel, setisMultiDel] = useState(false);


  

  const ariticles = useSelector(state => state.ariticles);
  



  const dispatch = useDispatch();
 

  useEffect(() => {
    const initialChecks = {};
    ariticles.forEach(article => {
      initialChecks[article.id] = false;
    });
    setCheckSelected(initialChecks);
    setisMultiDel(false);
    
  }, [ariticles]);

  const handleAddClick = () => {
    
    
    setAddShop(true);
  };

  const closeAddBox = () => {
    setAddShop(false);
  }

  const handleEdit = (id) =>{
     
     
    const editArticle = ariticles.find(el => el.id === id);
     setEditShop(editArticle);
     
    
    setAddShop(true); 
   }

   const handleDelete = (id) =>{

    
   if(window.confirm("Are you sure delete this item ?")){

     dispatch(deleteArticle(id));
   }
  
 }


 const handleAllCheckboxChange = (event) => {
  const newCheckedItems = {};
 

  ariticles.forEach((article) => {
    newCheckedItems[article.id] = event.target.checked;

  });

  setCheckSelected(newCheckedItems);
  setSelectedId(ariticles.map((article) => article.id));
  
  

  const isAllSelected = Object.values(newCheckedItems).every((value) => value);
  setisMultiDel(isAllSelected);
};


const handleCheck = (event, id) => {
  const isChecked = event.target.checked;
  const newCheckSelected = { ...checkselected };
  newCheckSelected[id] = isChecked;
  setCheckSelected(newCheckSelected);

  if (isChecked) {
    setSelectedId([...selectedId, id]);
  } else {
    setSelectedId(selectedId.filter((selectedId) => selectedId !== id));
  }

  

  setisMultiDel(Object.values(newCheckSelected).some((value) => value));
}

const handleDeleteMultiple = () => {
  if(window.confirm("Are you sure delete this item ?")){

    dispatch(deleteArticle(selectedId));
  }
}

    return <>
    <div className="listContainer bg-white shadow-lg">
      <h3 className='text-end mb-2'>
        <button onClick={handleAddClick} className='bg-green-600 text-white p-4 py-2 font-bold cursor-pointer'  >+ Add</button>
      </h3>
 <h2 className="bg-indigo-400 font-bold text-2xl text-white relative"> {isMultiDel && <span className='text-white font-bold d-inline-block ml-3 text-2xl cursor-pointer absolute left-1 top-6' onClick={handleDeleteMultiple}>X</span> }Shopping Articles </h2>
 <table className="table-auto">
           <thead>
          <tr className="">
         <th className='text-start pl-3'> {ariticles.length > 0 ?<input type="checkbox"  onClick={handleAllCheckboxChange} className="mr-2"/> : ''}Shop</th>
                <th className='text-start'>Price</th>
                <th className='text-end pr-6'>Action</th>
              </tr>
              </thead>

              <tbody>
            { ariticles.length !== 0 ? ariticles.map(el =>(
              <tr key={el.id} className="border-2">
                <td  className='p-3'><input type="checkbox" checked={checkselected[el.id]} onChange={(event) => {handleCheck(event, el.id)}} />&nbsp;&nbsp;{el.shop}</td> 
                 <td>{el.price}</td>
                 <td className='text-end pr-6'>
                 
                 
                  <span className='text-yellow-600 font-bold d-inline-block ml-3 text-2xl cursor-pointer' onClick={()=> handleEdit(el.id)}>🖉</span>
                  <span className='text-red-600 font-bold d-inline-block ml-3 text-2xl cursor-pointer' onClick={()=>handleDelete(el.id)}>X</span>
                 </td>
              
              </tr>  
            )) : <tr className=''><td className="text-right p-3"><strong>Data not found</strong></td></tr>} 

             </tbody>

         </table>
         </div>

         <AddArticle isOpen={AddShop} closeAddBox={closeAddBox} eidtShop = {eidtShop}/>
  
    
    </>
  }
  
  
  export default ArticleList;
