const tienda = document.getElementById("tiendacont");
const mostrar = document.getElementById("carritologo");
const modalCon = document.getElementById("modalcont");
const carritocant = document.getElementById("carritocan");


//ARTICULOS/
let carrito = JSON.parse(localStorage.getItem("fullcarrito")) || [];

const getArtic = async () =>{
const respons = await fetch ("main.json");
const datos = await respons.json();
datos.forEach((articulos)=>{
    let car = document.createElement("div");
    car.className = "articles";
    car.innerHTML = `
    <img src="${articulos.img}">
    <h3>${articulos.nombre}</h3>
    <p class="precio">${articulos.precio} $ </p>
    `;

    tienda.append(car);

    let shop = document.createElement("Button")
    shop.innerText = "Agregar al carrito";
    shop.className="boton";

    car.append(shop);

    shop.addEventListener("click", () =>{
        const repeticion = carrito.some((articuloRepetido)=> articuloRepetido.id === articulos.id);
        if(repeticion){
            carrito.map((arti)=>{
                if(arti.id === articulos.id){
                    arti.cantidad++;
                }
            })
        }else{
        carrito.push({
            id : articulos.id,
            img: articulos.img,
            nombre: articulos.nombre,
            precio: articulos.precio,
            cantidad: articulos.cantidad,
        });
        console.log(carrito);
        carritoCantidad();
        local();
    }
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto agregado al carrito',
        showConfirmButton: false,
        timer: 1500
      })
      
        
    });
});
};  

getArtic();

    
const local = () =>{
localStorage.setItem("fullcarrito", JSON.stringify(carrito));
};

JSON.parse(localStorage.getItem("fullcarrito"));

//CARRITO//

    const circulocarrito = () =>{
    modalCon.innerHTML="";
    modalCon.style.display= "flex";
    const modalH = document.createElement("div");
    modalH.className = "modalhead";
    modalH.innerHTML = `
        <h1 class="modalht">Carrito</h1>
      `;
    modalCon.append(modalH);

    const modalbt = document.createElement("h1");
    modalbt.innerText = "X";
    modalbt.className = "modalhbt";
    modalH.append(modalbt);

    modalbt.addEventListener("click", () =>{
        modalCon.style.display ="none";
    });

    carrito.forEach((articulos)=>{
        let carritocon = document.createElement("div")
        carritocon.className ="modcont"
        carritocon.innerHTML =`
        <img src ="${articulos.img}">
        <h3>${articulos.nombre}</h3>
        <p>${articulos.precio}$</p>
        <p>Cantidad: ${articulos.cantidad}</p>
        <p>Total por producto: ${articulos.cantidad * articulos.precio}</p>
        `;
        modalCon.append(carritocon);
        
        let deletepro = document.createElement("span");
        deletepro.innerText = "X";
        deletepro.classList = "dtp";
        carritocon.append(deletepro);

        deletepro.addEventListener("click", eliminarProd);
    });



    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
    const totalcomp = document.createElement("div")
    totalcomp.className = "totcont"
    totalcomp.innerHTML = `Tu total es: ${total}$`;
    modalCon.append(totalcomp);
};


mostrar.addEventListener("click", circulocarrito);

//ELIMINAR PRODUCTO//
const eliminarProd = () => {
    const ecoID = carrito.find((element) => element.id);
  
  
    carrito = carrito.filter((carriId) => {
      return carriId !== ecoID;
    });
    carritoCantidad();
    local();
    circulocarrito();
};
//CANTIDAD CARRITO//
const carritoCantidad = () => {
    carritocan.style.display = "block";
    const carritoLen = carrito.length;
    localStorage.setItem("carritoLen",JSON.stringify(carritoLen))
    carritocan.innerHTML=JSON.parse(localStorage.getItem("carritoLen"));
};

carritoCantidad();

