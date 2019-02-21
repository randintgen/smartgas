'use strict';

module.exports = function(app) {

	const url = '/observatory/api'
	const cusr = require('../controller/User/cusrController.js');
	const gusr = require('../controller/User/getProfController.js');
	const dusr = require('../controller/User/dusrController.js');
	const updusr = require('../controller/User/updgeneralController.js');
	const updpassusr = require('../controller/User/updpassController.js');
	const updnameusr = require('../controller/User/updnameController.js');
	const loginusr = require('../controller/User/loginController.js');
	const logoutusr = require('../controller/User/logoutController.js');
	const get_the_products = require('../controller/Products/getProductsController.js');
	const get_the_pid = require('../controller/Products/getidController.js');
	const cproduct = require('../controller/Products/createProductController.js');
	const delete_a_product = require('../controller/Products/delproductController.js');
	const put_a_product = require('../controller/Products/putProductController.js');
	const patch_a_product = require('../controller/Products/patchProductController.js');
	
	const get_the_shops = require('../controller/Shops/getShopsController.js');
	const create_shop = require('../controller/Shops/createShopController.js');
	const get_the_shopid = require('../controller/Shops/getShopidController.js');
	const put_the_shopid = require('../controller/Shops/putShopidController.js');
    const patch_the_shopid = require('../controller/Shops/patchShopidController.js');
	// todoList Routes

	app.route(url+'/users/signup')
		.post(cusr.create_a_user);
   
	app.route(url+'/users/login')
		.post(loginusr.login_as_user);

	app.route(url+'/users/:username/delete')
		.delete(dusr.delete_a_user);

	app.route(url+'/users/:username/newinfo')
		.put(updusr.update_gen_user)

	app.route(url+'/users/:username/newpass')
		.put(updpassusr.update_pass_user)

	app.route(url+'/users/:username/newname')
		.put(updnameusr.update_name_user)

	app.route(url+'/users/:username')
		.get(gusr.get_profile)

	app.route(url+'/users/logout')
		.post(logoutusr.logout_profile)

	app.route(url+'/products')
		.get(get_the_products.view_products)

	app.route(url+'/products/:id')
		.get(get_the_pid.view_pid)

	app.route(url+'/products')
		.post(cproduct.create_a_product);

	app.route(url+'/products/:id')
		.delete(delete_a_product.delete_products)

	app.route(url+'/products/:id')
		.put(put_a_product.update_a_product)

	app.route(url+'/products/:id')
		.patch(patch_a_product.patch_a_product)
		
	app.route(url+'/shops')
        .get(get_the_shops.view_shops)

	app.route(url+'/shops')
		.post(create_shop.create_a_shop)

	app.route(url+'/shops/:id')
		.get(get_the_shopid.view_shopid)

	app.route(url+'/shops/:id')
		.put(put_the_shopid.update_a_shop)

	app.route(url+'/shops/:id')
		.patch(patch_the_shopid.patch_a_shop)
};
