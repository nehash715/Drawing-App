const canvas=document.querySelector("canvas")
toolBtns=document.querySelectorAll(".tool")
fillColor=document.querySelector("#fill-color")
sizeSlider=document.querySelector("#fill-slider")
colorBtn=document.querySelectorAll(".colors .option")
ctx=canvas.getContext("2d");
let prevMouseX,prevMouseY,snapshot,
isDrawing=false
brushWidth=3
selectedTool="brush"
window.addEventListener("load",()=>{
    canvas.width=canvas.offsetWidth;
    canvas.height=canvas.offsetHeight
})

const startDraw=(e)=>{
    isDrawing=true
    prevMouseX=e.offsetX;
    prevMouseY=e.offsetY
    ctx.beginPath() //creating new path to drwa
    ctx.lineWidth=brushWidth; //passing brushwidth as line width
    snapshot=ctx.getImageData(0,0,canvas.width,canvas.height)
}

const drawRect=(e)=>{
    if(!fillColor.checked){
        return ctx.strokeRect(e.offsetX,e.offsetY,prevMouseX-e.offsetX,prevMouseY-e.offsetY)
    }
    ctx.fillRect(e.offsetX,e.offsetY,prevMouseX-e.offsetX,prevMouseY-e.offsetY)
}
const drawCircle=(e)=>{
    ctx.beginPath()
    let radius=Math.sqrt(Math.pow((prevMouseX-e.offsetX),2)+Math.pow((prevMouseY-e.offsetY),2))
    ctx.arc(prevMouseX,prevMouseY,radius,0,2*Math.PI)//creating circle acc to the mouse pointer
    fillColor.checked?ctx.fill():  ctx.stroke() //if fillcolor is checked fill circle else draw border circle
}
const drawTraingle=(e)=>{
    ctx.beginPath()
    ctx.moveTo(prevMouseX,prevMouseY) //moving triangle to the mouse pointer
    ctx.lineTo(e.offsetX,e.offsetY) //creating first acc to the mouse pointer
    ctx.lineTo(prevMouseX*2 -e.offsetX,e.offsetY) //creating bottom line of triangle
    ctx.closePath() //closing path of triangle so the third draw automatically
    fillColor.checked?ctx.fill():  ctx.stroke() 
}
const drawing=(e)=>{
    if(!isDrawing) return;//if isDrawing is false return from here
   ctx.putImageData(snapshot,0,0) //adding copied data onto this canvas
    if(selectedTool=== "brush"){
    ctx.lineTo(e.offsetX,e.offsetY);//create line acc to mouse pointer
    ctx.stroke()//drawing/filling line with color
    }
    else if(selectedTool==="rectangle"){
  drawRect(e)
    }
    else if(selectedTool==="circle"){
        drawCircle(e)
          }
else{
    drawTraingle(e)
}
}

sizeSlider.addEventListener("change",()=>brushWidth=sizeSlider.value)

canvas.addEventListener("mousedown",startDraw)
canvas.addEventListener("mousemove",drawing)
canvas.addEventListener("mouseup",()=>{
    isDrawing=false
})
toolBtns.forEach(btn => {
    btn.addEventListener("click",()=>{
        document.querySelector(".options .active").classList.remove("active")
        btn.classList.add("active");
        selectedTool=btn.id
        console.log(selectedTool)
    })
});

colorBtn.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        document.querySelector(".options .selected").classList.remove("selected")
        btn.classList.add("selected");
        console.log(window.getComputedStyle(btn).getPropertyValue("background"))
    })
})




