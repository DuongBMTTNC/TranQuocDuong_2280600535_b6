// 🟢 1. Lấy danh sách sản phẩm
async function fetchProducts() {
    try {
        let response = await fetch('/api/products');
        let products = await response.json();

        let tableBody = document.getElementById('productTable');
        tableBody.innerHTML = ''; // Xóa dữ liệu cũ

        products.forEach(product => {
            let row = `<tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price} VND</td>
                <td>
                    <button onclick="editProduct(${product.id})">Sửa</button>
                    <button onclick="deleteProduct(${product.id})">Xóa</button>
                    <button onclick="fetchProductDetails(${product.id})">Xem</button>
                </td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error('Lỗi:', error);
    }
}

async function fetchProductDetails(id) {
    try {
        let response = await fetch(`/api/products/${id}`);
        let product = await response.json();

        document.getElementById('productDetailId').textContent = product.id;
        document.getElementById('productDetailName').textContent = product.name;
        document.getElementById('productDetailPrice').textContent = product.price;

        let modal = new bootstrap.Modal(document.getElementById('productDetailModal'));
        modal.show();
    } catch (error) {
        console.error('Lỗi:', error);
    }
}

function closeModal() {
    document.getElementById('productDetailModal').style.display = 'none';
}

// 🟢 2. Thêm sản phẩm mới
async function addProduct() {
    const product = {
        name: document.getElementById('productName').value,
        price: parseFloat(document.getElementById('productPrice').value)
    };

    let response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    });

    if (response.ok) {
        alert('Thêm sản phẩm thành công!');
        fetchProducts();
    } else {
        alert('Lỗi khi thêm sản phẩm.');
    }
}

// 🟢 3. Xóa sản phẩm
async function deleteProduct(id) {
    if (!confirm('Bạn có chắc muốn xóa?')) return;

    let response = await fetch(`/api/products/${id}`, { method: 'DELETE' });

    if (response.ok) {
        alert('Xóa thành công!');
        fetchProducts();
    } else {
        alert('Lỗi khi xóa sản phẩm.');
    }
}

// 🟢 4. Sửa sản phẩm (lấy thông tin cũ)
async function editProduct(id) {
    let response = await fetch(`/api/products/${id}`);
    let product = await response.json();

    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
}

// 🟢 5. Cập nhật sản phẩm
async function updateProduct() {
    const id = document.getElementById('productId').value;
    const product = {
        id: id,
        name: document.getElementById('productName').value,
        price: parseFloat(document.getElementById('productPrice').value)
    };

    let response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    });

    if (response.ok) {
        alert('Cập nhật thành công!');
        fetchProducts();
    } else {
        alert('Lỗi khi cập nhật sản phẩm.');
    }
}

// 🟢 Khi tải trang, tự động tải danh sách sản phẩm
window.onload = fetchProducts;
