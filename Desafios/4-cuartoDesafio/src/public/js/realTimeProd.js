const socket = io();

const tbodyProducts = document.getElementById(`tbodyProducts`);

socket.on(`allProducts`, data => {
    console.log(data);

    Object.values(data).forEach(product => {
        product = `
            <tr>
                <th scope="row">
                    ${product.id}
                </th>
                <td>
                    ${product.title}
                </td>
                <td>
                    ${product.price} 
                </td>
                <td>
                    ${product.stock} 
                </td>
            </tr>
        `;
        tbodyProducts.innerHTML += product;
    });
});