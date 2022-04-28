import "../App.css" ;

function Svg (props) {
    
    let list =  props.edges.map(
        (x,j) => {return  <> <line id={ "line"+j+1 } key = {j+1} className="absolute" strokeWidth="2px" stroke="#ffffff" x1={props.posObj[x[0]-1][0]+24} 
        y1= {props.posObj[x[0]-1][1]+24 } x2={props.posObj[x[2]-1][0]+24} y2 ={props.posObj[x[2]-1][1]+24} ></line> <text key={"text"+(j+1)}className="fill-cyan-400" x={(props.posObj[x[0]-1][0] +props.posObj[x[2]-1][0])/2 +24} y={(props.posObj[x[0]-1][1]+props.posObj[x[2]-1][1])/2 +10} fontSize="22">
       {x[1]}
      </text></>}
    );
    return (
        
           <>{list} </> 
        
    )
}
export default Svg ;