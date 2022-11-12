import React,{useState,useEffect} from 'react'
import './Style.css'
import img1 from './assets/img1.jfif'
const getlocalData = () =>{
  const List = localStorage.getItem('mytodolist')
  if(List){
       return JSON.parse(List)
  }else{
    return []
  }
}
const Todo = () => {
  const [inputData,setInputData] = useState('')
  const [items,setItems] = useState(getlocalData())
  const [iseditItem,setIseditItem]  = useState()
  const [toggleButton,setToggleButton] = useState(false)
  const addItems = () =>{
    if(!inputData){
      alert('please enter Items')
    }else if(inputData && toggleButton){
        setItems(
          items.map((curele)=>{
            if(curele.id === iseditItem){
              return{...curele,name:inputData}
            }
            return curele
          })
        )
        setInputData([])
        setIseditItem(null)
        setToggleButton(false)
    }
    else{
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name:inputData,
      }
      setItems([...items, myNewInputData ])
      setInputData('')
    }
  }   

      const deleteItems = (index) =>{
        const updatedItem = items.filter((curele)=>{
          return curele.id !== index
        })
        setItems(updatedItem)
      }

      const removeall = () =>{
        setItems([])
      }

      useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items));
      }, [items]);
      
      const editItem =(index) =>{
        const item_toto_edited = items.find((curele)=>{
          return curele.id === index
        })
        setInputData(item_toto_edited.name)
        setIseditItem(index)
        setToggleButton(true)
      }
  return (
    <> 
       <div className='main-div'>
        <div className='child-div'>
          <figure>  
           <img src={img1} alt="todologo"/>
            <figcaption>
             Add Your Item Here 👌
            </figcaption>
          </figure>
          <div className='additems'>
            <input type='text' value={inputData} onChange={(event)=>setInputData(event.target.value)} placeholder='Add items ✍️ '></input>
             {toggleButton ?(<i class="fa fa-edit" onClick={addItems}></i>)
              :(<i class="fa fa-plus add-btn" onClick={addItems}></i>)
             }
          </div>
          <div className='showItems'>
            {items.map((curele,index)=>{
              return(
                <div className='eachItems' key={curele.id}>
                  <h3>{curele.name}</h3>
                 <div className='icon'>
                 <i class="fa fa-trash" onClick={()=>deleteItems(curele.id)}></i>
                 <i class="fa fa-edit" onClick={()=>editItem(curele.id)}></i>
                 </div>
                </div>
              )
            })}
          </div>
          <div className='showitems'>
            <button className='effect04' data-sm-link-text='REMOVE ALL'
            onClick={removeall}>
                <span>CHECK LIST</span>
            </button>
          </div>
        </div>
       </div>
    </>
  )
}

export default Todo