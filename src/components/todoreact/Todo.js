import React  from 'react';
import "./style.css";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { useState } from 'react';
import { useEffect } from 'react';


const Todo = () => {
    

    const  getLocalData=()=>{
        const lists=localStorage.getItem("myTodoList");
        if (lists){
            return JSON.parse(lists);
        }else{
            return [];
        }
    };

    const [inputdata,setinputData]=useState("");
    const [items,setItems]=useState(getLocalData());
    const [isEditItem,setIsEditItem]=useState("");
    const [toggleBtn,setToggleBtn]=useState(false);
   

    const addItem=()=>{
        if (!inputdata){
            alert("fill data");
        }else if(inputdata && toggleBtn){
            setItems(
                items.map((currElem)=>{
                    if(currElem.id===isEditItem){
                        return {...currElem, name : inputdata};
                       }
                    return currElem;
                    })
            );
            setinputData("");
            setIsEditItem(null);
            setToggleBtn(false);
        } else{
            const myNewInputData={
                id:new Date().getTime().toString(),
                 name: inputdata,
            };
            setItems([...items,myNewInputData]);
            setinputData("");
        }
    };
    const deleteItem=(index)=>{
        const updateItem=items.filter((currElem)=>{
            return currElem.id !== index;
        });
        setItems(updateItem);
    };
    const removeAll=()=>{
        setItems([]);
    };
    useEffect(()=>{
        localStorage.setItem("myTodoList",JSON.stringify(items));
    },[items]);
    const editItem=(index)=>{
        const itemToDoEdited=items.find((currElem)=>{
            return currElem.id === index;
        });
        setinputData(itemToDoEdited.name);
        setIsEditItem(index);
        setToggleBtn(true);
    };


    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe0eA575w3hMNXL9QL1cq4F5BHAJnYkVblGQ&usqp=CAU" 
                        alt="todo-logo"
                        />
                        <figcaption>add ur list here ✌</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" 
                        placeholder="✍ Add items" 
                        className="form-control"
                        value={inputdata}
                        onChange={(event)=>{setinputData(event.target.value)}}
                        />
                        { toggleBtn ?   <EditIcon className="edit-btn  fa" onClick={addItem} />  :  <AddIcon className="add-btn  fa" onClick={addItem}/>
                        }
                       
                    </div>
                     {/* show items which u add */}
                     <div className="showItems">
                             {items.map((currElem )=>{
                                return (
                                   
                                    <div className="eachItem" key={currElem.id}>
                                         <h3>{currElem.name}</h3>
                                         <div className="todo-btn">
                                             <EditIcon 
                                                 className="edit-btn  fa"
                                                 onClick={()=>{editItem(currElem.id)}}
                                             />
                                             <DeleteForeverIcon 
                                                 className="delete-btn  fa" 
                                                 onClick={()=>{deleteItem(currElem.id)}} 
                                                 />
                                         </div>   
                                     </div>                                 
                                  
                                );
                            })}
                     </div>
                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="REMOVE ALL" onClick={removeAll}><span>CHECK LIST</span></button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Todo;
