const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname,'../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	
	// Root - Show all products
	root: (req, res, next) => {
		res.render('products',{
			title: 'Mercado Liebre Argentina',
			aMiles: toThousand,
			products: products
			
		});

	},

	// Detail - Detail from one product
	detail: (req, res) => {
		var product = products.find(elemento =>{
			return elemento.id = req.params.productId;
		});

		res.render ('detail',{
			title: product.name,
			aMiles: toThousand,
			product: product
		});
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
		let ultimoProduct = products[products.length -1];
		let nuevoProduct ={}
				nuevoProduct.id = ultimoProduct.id+1,
				nuevoProduct.name=req.body.name,
				nuevoProduct.price = req.body.price,
				nuevoProduct.discount = req.body.discount,
				nuevoProduct.category = req.body.category,
				nuevoProduct.description = req.body.description

				products.push(nuevoProduct)
				
				let productosNuevosJSON = JSON.stringify(products)
				fs.writeFileSync(productsFilePath, productosNuevosJSON)
				res.send(products)
	},

	// Update - Form to edit
	edit: (req, res) => {
		let product = products.find(function(elemento){
			return elemento.id == req.params.productId
		})
		res.render ('product-edit-form',{
		aMiles: toThousand,
		productToEdit: product
	});
	},
	// Update - Method to update
	update: (req, res, next) => {
		
		products.forEach(product => {
			if (product.id == req.params.productId){
				product.name = req.body.name,
				product.price = req.body.price,
				product.discount = req.body.discount,
				product.category = req.body.category,
				product.description = req.body.description
				return productUpdate = product
			}
		});
		let productosModificadosJSON = JSON.stringify(products)
		fs.writeFileSync(productsFilePath, productosModificadosJSON)
		

	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		var productosEnStock = products.filter(element =>{
			return element.id!=req.params.productId
		});
		let productosModificadosJSON = JSON.stringify(products)
		fs.writeFileSync(productsFilePath, productosModificadosJSON)	
		
	}
};

module.exports = controller;