import "../App.css" ;


function Node (props) {
   // console.log(props.posObj, Object.keys(props.posObj), Object.entries(props.posObj))
    const list = props.posObj.map(
        (x,j) => { return   <button key={ j+1 } id={"Node"+(j+1)} onMouseDown={()=>props.onmousedown(j+1)}   className ='bg-cyan-300  rounded-full font-semibold text-black hover:cursor-grabbing absolute  py-3 px-5 ' style={{left:x[0],top:x[1]}}>
        { j+1} 
    </button>}
    );
    return (
        <>
            {list}
        </>
    )
}

export default Node ;