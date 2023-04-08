const socket = io();

const tbodyProducts = document.getElementById(`tbodyProducts`);

socket.on(`refreshTable`, data => {
    product = `
    {{#each allProducts}}
    <tr>
        <th scope="row">
            {{this.id}}
        </th>
        <td>
            {{this.title}}
        </td>
        <td>
            {{this.price}}
        </td>
        <td>
            {{this.stock}}
        </td>
    </tr>
    {{/each }}
    `;
    tbodyProducts.innerHTML += product;
});

socket.on(`allProducts`, data => {

    data.forEach(product => {
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