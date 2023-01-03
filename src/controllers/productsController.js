const fs = require('fs');
const path = require('path');
const { setTimeout } = require('timers');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const save = (dato) => fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json')
, JSON.stringify(dato, null, 4), 'utf-8');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products',{
			products,
			toThousand
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const id = +req.params.id;
		let product = products.find(product => product.id === id);
		return res.render('detail' , {
			product,
			toThousand
		})

	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
		return res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
		/* return res.send(req.body) */

		let {name, price, discount, category, description} = req.body

		let newProduct = {
			id: products[products.length - 1].id + 1,
			name,
			price,
			discount,
			category,
			description,
			image : 'default-image.png'
		}
		products.push(newProduct)
		save(products)

		res.redirect(`/products/${newProduct.id}`)
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
		const id = +req.params.id;
		let product = products.find(product => product.id === id);
		return res.render('product-edit-form', {
			productToEdit : product
		})
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	/* 	return res.send(req.body) */

		idParams = +req.params.id
		let {name, price, discount, category, description} = req.body

		products.forEach(product => {
			if (product.id === idParams) {
				product.name = name,
				product.price = price,
				product.discount = discount,
				product.category = category,
				product.description = description
			}
		});

		save(products)
		return res.redirect(`/products/${idParams}`)
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
		
		idParams = +req.params.id
		
		let productUpdate = products.filter(product => {
			return product.id !== idParams
		})

		save(productUpdate)

			return res.redirect('/')			

	}
};

module.exports = controller;