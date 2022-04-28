import logo from './logo.svg';
import './App.css';
import React,{useState,useEffect} from "react" ;
import Node from "./Components/Node"
import Svg from "./Components/Svg"

function App() {
  
  const [dragNo , setDragNo] = useState(0);
  const [vertices,setVertices] = useState(0);
  const [noEdges,setNoEdges] = useState(0);
  const [posObj, setPosObj] = useState([]);
  const [edges,setEdges] = useState([])
  const dragFun = (event) => {

        let left = event.clientX;
        let top = event.clientY;
        var a = document.getElementById("Node"+dragNo);
        let newArr = posObj[dragNo -1 ]=[left - a.offsetWidth/2,top - a.offsetHeight/2]
        setPosObj([...posObj]) ;
   
  }
  useEffect(()=> {
      if(dragNo != 0)
        window.addEventListener("mousemove", dragFun);
        window.addEventListener("mouseup",()=>{setDragNo(0)})
    return (() =>{ window.removeEventListener("mousemove", dragFun)})
  })
  
  const beginDrag = (number) => {
    setDragNo(number)
    
  }
  const createEdge = ()=> {
      setNoEdges(noEdges+1);
      edges.push([Number(document.getElementById("start-vertex").value),Number(document.getElementById("edge-distance").value),Number(document.getElementById("end-vertex").value)])
      
      setEdges([...edges])      
  }
  const createNode = () => {

      posObj[vertices]= [200,200]
      setVertices (vertices+1)
      setPosObj ([...posObj]) ;
  }
  return (
    <div className="App">
      <header  className="App-header absolute bg-slate-800 w-full h-[100rem] text-cyan-400"> 
      <div className='flex flex-col right-0 mr-10 fixed bottom-0'>
      <input className="flex-1 rounded-md mb-4 p-2 text-center px-7 text-black bg-gray-200" id="start-vertex" type="text"placeholder='start vertex'></input>
      <input className="flex-1 rounded-md mb-4 p-2 text-center px-7 text-black bg-gray-200" id="edge-distance" type="text" placeholder='distance'></input>
      <input className="flex-1 rounded-md mb-4 p-2 text-center px-7 text-black bg-gray-200" id ="end-vertex"type="text" placeholder='end vertex'></input>
      <button className='flex-1 rounded-lg mx-5 text-white mb-4 p-2 bg-[#02a0b2]' onClick={createEdge}>Add Edge</button>
      <button className='flex-1 rounded-lg mx-5 text-white mb-4 p-2 bg-[#02a0b2]' onClick={createNode}>Add Node</button>
      </div>
       {vertices ? <Node posObj = {posObj} onmousedown={(n)=> beginDrag(n)}></Node>: null }
        
        <svg className="absol w-full h-full text-red-900">
          {noEdges ?  <Svg posObj={posObj} edges={edges}></Svg>: null}
        </svg>
      </header>
    </div>
  );
}

export default App;
