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
  const [edges,setEdges] = useState([]);
  const [strok ,setStroke] = useState([]);
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
      if(Number(document.getElementById("start-vertex").value) <= vertices && Number(document.getElementById("end-vertex").value <= vertices)) {
        edges.push([Number(document.getElementById("start-vertex").value),Number(document.getElementById("edge-distance").value),Number(document.getElementById("end-vertex").value)])        
        setEdges([...edges])      
      }
      else {
        alert("please add some nodes to the graph")
      }
  }
  const createNode = () => {

      posObj[vertices]= [200,200]
      setVertices (vertices+1)
      setPosObj ([...posObj]) ;
  }
  const setColor = (val ) => {
    for (let i = 0  ; i < val.length -1  ; i++ ) {
      strok.push("" + val[i]+ val[i+1]) ;
      setStroke([...strok]);
    }
  }
  const dikstras = (v1,v2) => {
    setStroke([...[]])
    var v1 = Number(document.getElementById("start-dist").value) ;
    var v2 = Number(document.getElementById("end-dist").value );
    var Matrix  = Array(vertices).fill(0)
    for (let i = 0 ; i< vertices ; i ++ ){
      
      Matrix[i] =  Array (vertices).fill(0)  ;
      
    }
     for (let x of edges) {
       Matrix[x[0]-1][x[2]-1] = x[1] ;
       Matrix[x[2]-1][x[0]-1] = x[1] ;
     }
     var path = [v1.toString()] ;
     var pathWay = new Array(vertices).fill("");
     var boarr = Array(vertices).fill(false) ;
     var distance = new Array (vertices) ;
     for (let i = 0 ; i< vertices ; i++ ) {
       distance [i] = [2**1023,0];
     }
     distance [v1-1] = [0,v1]
     boarr[v1-1] = true ;
     pathWay[v1-1] = v1.toString()
    //  console.log(Matrix) ;
     for (let s = 0 ; s< vertices ; s++) {
       let lastVisit = path[path.length -1]  ;
      //  console.log("path",path)
       for (let i = 0 ; i< vertices ; i++) {
         if( Matrix[lastVisit -1][i]!=0 && boarr[i] == false && distance[i][0] > distance [lastVisit -1][0] + Matrix[lastVisit-1][i] ) {
           distance [i][0] = distance [lastVisit -1][0] + Matrix[lastVisit-1][i] ;
           distance [i][1] = lastVisit ;
           let way = pathWay [lastVisit -1] ;
           pathWay [i] =  way.concat((i+1).toString()) ;
          }
        }
        var minn = 2** 1023 ;
        var index1 ;
        var index2 ;
        for (let i = 0 ; i< vertices ; i++) {
          let x = distance[i] ;
          if(minn > x[0] && boarr[x[1] -1] ^ boarr[i] ) {
            minn = x[0] ;
            index1 = i ;
            index2 = x[1] -1 ;
          }
        }
        
        if(boarr[index1]== false) {
          boarr[index1] = true ;
          path.push(index1 +1) ;
        }
        else {
          boarr[index2] = true ;
          path.push(index2 +1)
        }
      }
      // console.log(pathWay) 
      setColor(pathWay[v2-1]);
    }
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  return (
    <div className="App bg-slate-800 h-screen text-cyan-400">
      <header  className="App-header " >
        </header>
        {
          (isMobile) ?  <div className='text-[3rem] text-center flext '>Please use Desktop site</div> : <></>
          
        }
        
      <div className='flex flex-col items-center align-middle  fixed bottom-0 w-full md:w-auto md:mr-10  md:right-0'>
        <div className='mx-auto '>
        <button className='flex-1 rounded-lg mx-2 text-white mb-4 p-2 bg-[#02a0b2]' onClick={createEdge}>Add Edge</button>
      <button className='flex-1 rounded-lg mx-2 text-white mb-4 p-2 bg-[#02a0b2]' onClick={createNode}>Add Node</button> 
        </div>
      <input className="rounded-md mb-2 md:mb-4 p-1 md:p-2 text-center px-3 text-black bg-gray-200" id="start-vertex" type="text"placeholder='start vertex'></input>
      <input className="rounded-md mb-2 md:mb-4 p-1 md:p-2 text-center px-3 text-black bg-gray-200" id="end-vertex"type="text" placeholder='end vertex'></input>
      <input className="rounded-md mb-4 md:mb-8 p-1 md:p-2 text-center px-3 text-black bg-gray-200" id="edge-distance" type="text" placeholder='distance'></input>
      <input className="rounded-md mb-2 md:mb-4 p-1 md:p-2 text-center px-3 text-black bg-gray-200" id="start-dist" type="text" placeholder='path start'></input>
      <input className="rounded-md mb-2 md:mb-4 p-1 md:p-2 text-center px-3 text-black bg-gray-200" id="end-dist" type="text" placeholder='path end'></input>
      <button className='rounded-lg mx-5 text-white mb-4 p-2 bg-[#02a0b2]' onClick={() =>dikstras()}>Find Shortest Path</button> 
      <button className='rounded-lg mx-5 text-white mb-4 p-2 bg-[#b20e02]' onClick={() =>setStroke([])}>Reset Color</button> 
      </div>
       {vertices ? <Node posObj = {posObj} onmousedown={(n)=> beginDrag(n)}></Node>: null }
        
        <svg className="absol w-full h-full text-red-900">
          {noEdges ?  <Svg posObj={posObj} edges={edges} strok={strok}></Svg> : null}
        </svg>
      
    </div>
  );
}

export default App;
