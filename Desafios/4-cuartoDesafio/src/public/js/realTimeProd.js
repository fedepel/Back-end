const socket = io();

const tbodyProducts = document.getElementById(`tbodyProducts`);

socket.on(`allProducts`, data => {
    console.log(data);


});