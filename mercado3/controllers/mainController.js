const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	root: (req, res, next) => {
		let ofertas = products.filter(function(product){
			return product.category == "in-sale";
		})
		let visitados = products.filter(function(product){
			return product.category == "visited";
		})
		res.render('index',{
			title: 'Mercado Liebre Argentina',
			visitados: visitados,
			ofertas: ofertas,
			aMiles: toThousand
		})
	},
	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;
