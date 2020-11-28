let carts = document.querySelectorAll('.button2');

let products = [
	{
		name:"JBL Pulse 4 - Waterproof Portable Bluetooth Speaker",
		tag:"JBLspeaker",
		price:19.99,
		inCart:0
	},
	{
		name:"Classic Polarized Men Driving Black Pilot Sun Glasses",
		tag:"SunGlasses",
		price:9.99,
		inCart:0
	},
	{
		name:"Alex Mens Shirts Regular Long Sleeve Men Shirt",
		tag:"MenShirt",
		price:15,
		inCart:0
	},
	{
		name:"USB Charger",
		tag:"USBCharger",
		price:3,
		inCart:0
	},
	{
		name:"8MP Drone",
		tag:"Drone",
		price:100,
		inCart:0
	},
	{
		name:"Wifi CCTV Camera",
		tag:"cctvcamera",
		price:23,
		inCart:0
	},
	{
		name:"Color Builb",
		tag:"Builb",
		price:12,
		inCart:0
	},
	{
		name:"Blutooth Headset",
		tag:"Headset",
		price:9.99,
		inCart:0
	},
	{
		name:"Earphone",
		tag:"Earphone",
		price:8,
		inCart:0
	},
	{
		name:"Wireless Mouse",
		tag:"WirelessMouse",
		price:12,
		inCart:0
	},
	{
		name:"Keyboard",
		tag:"Keyboard",
		price:2,
		inCart:0
	},
	{
		name:"USB PenDrive",
		tag:"USBPenDrive",
		price:34,
		inCart:0
	}
]

for (let i=0; i < carts.length; i++) {
	carts[i].addEventListener('click', () => {
		cartNumbers(products[i]);
		totalCost(products[i])
	})
}

function onloadCartNumbers(){
	let productNumbers = localStorage.getItem('cartNumbers');

	if (productNumbers) {
		document.querySelector('.cart span').textContent = productNumbers;
	}
}

function cartNumbers(product){
	
	let productNumbers = localStorage.getItem('cartNumbers');


	productNumbers = parseInt(productNumbers);

	if( productNumbers ){
		localStorage.setItem('cartNumbers', productNumbers +1);	
		document.querySelector('.cart span').textContent = productNumbers + 1;	
	}
	else{
		localStorage.setItem('cartNumbers',1);
		document.querySelector('.cart span').textContent = 1;
	}

	 setItems(product);
}

function setItems(product){
	let cartItems = localStorage.getItem('productsInCart');
	cartItems = JSON.parse(cartItems);


	if (cartItems != null) {

		if (cartItems[product.tag] == undefined) {
			cartItems={
				...cartItems,
				[product.tag]:product
			}
		}
		cartItems[product.tag].inCart += 1;
	}
	else{
		product.inCart = 1;
		cartItems = {
			[product.tag]:product
	}
	}

	localStorage.setItem("productsInCart",JSON.stringify (cartItems));
}

function totalCost(product){
	//console.log("The product price is",product.price);
	let cartCost = localStorage.getItem('totalCost');
	
	console.log("My cartCost is",cartCost);
	console.log(typeof cartCost);

	if (cartCost != null) {
		cartCost=parseInt(cartCost);
		localStorage.setItem("totalCost",cartCost+product.price);
	}
	else{
		localStorage.setItem("totalCost",product.price);
	}
}

function displayCart(){
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	let productContainer = document.querySelector(".products");
	let cartCost = localStorage.getItem('totalCost');
	
	console.log(cartItems);
	if (cartItems && productContainer) {
		productContainer.innerHTML = '';
		Object.values(cartItems).map(item =>{
			productContainer.innerHTML += `
			<div class = "product">
				<ion-icon name="trash-outline"></ion-icon>
				<img src="./img/${item.tag}.jpg">
				<span>${item.name}</span>
			</div>
			<div class = "price">$${item.price}.00</div>
			<div class = "quantity">
				<ion-icon name="caret-back-outline"></ion-icon>
				<span>${item.inCart}</span>
				<ion-icon name="caret-forward-outline"></ion-icon>
				<div class = "total">
				$${item.inCart * item.price}.00
				</div>
			`;
		});

			productContainer.innerHTML += `
			<div class="basketTotalContainer">
				<h4 class="basketTotalTitle">
					Basket total
				</h4>
				<h4 class = "basketTotal">
					$${cartCost}.00
				</h4>
			`

	}


}


onloadCartNumbers();
displayCart();