'use strict';

module.exports = function(app) {

	const url = '/observatory/api'
	// Users
	const cusr = require('../controller/User/cusrController.js');
	const gusr = require('../controller/User/getProfController.js');
	const dusr = require('../controller/User/dusrController.js');
	const updusr = require('../controller/User/updgeneralController.js');
	const updpassusr = require('../controller/User/updpassController.js');
	const updnameusr = require('../controller/User/updnameController.js');
	const loginusr = require('../controller/User/loginController.js');
	const logoutusr = require('../controller/User/logoutController.js');
	const verifyusr = require('../controller/User/verifyController.js');
	// Products
	const get_the_products = require('../controller/Products/getProductsController.js');
	const get_the_pid = require('../controller/Products/getidController.js');
	const cproduct = require('../controller/Products/createProductController.js');
	const delete_a_product = require('../controller/Products/delproductController.js');
	const put_a_product = require('../controller/Products/putProductController.js');
	const patch_a_product = require('../controller/Products/patchProductController.js');
	// Shops 
	const get_the_shops = require('../controller/Shops/getShopsController.js');
	const create_shop = require('../controller/Shops/createShopController.js');
	const get_the_shopid = require('../controller/Shops/getShopidController.js');
	const put_the_shopid = require('../controller/Shops/putShopidController.js');
    	const patch_the_shopid = require('../controller/Shops/patchShopidController.js');
    	const delete_the_shopid = require('../controller/Shops/deleteShopidController.js');
	// Posts
    	const newpost = require('../controller/Posts/createPostController.js');
    	const delete_my_old_post = require('../controller/Posts/deletePostController.js');
    	const upd_old_post = require('../controller/Posts/updatePostController.js');
    	const post_search = require('../controller/Posts/getPostController.js');
      const my_posts = require('../controller/Posts/getMyPostController.js');

	// todoList Routes

	// Users
	app.route(url+'/users/signup')
		.post(cusr.create_a_user);
   
	app.route(url+'/login')
		.post(loginusr.login_as_user);

	app.route(url+'/users/myprofile')
		.delete(dusr.delete_a_user);

	app.route(url+'/users/newinfo')
		.put(updusr.update_gen_user)

	app.route(url+'/users/newpass')
		.put(updpassusr.update_pass_user)

	app.route(url+'/users/newname')
		.put(updnameusr.update_name_user)

	app.route(url+'/users/myprofile')
		.get(gusr.get_profile)

	app.route(url+'/logout')
		.post(logoutusr.logout_profile)
	app.route(url+'/verify')
		.get(verifyusr.verify_user)

	// Products
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

	// Shops
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
		
	app.route(url+'/shops/:id')
		.delete(delete_the_shopid.delete_a_shop)
	
	// Posts
	app.route(url+'/prices')
      .post(newpost.create_post)
  
  app.route(url+'/prices')
      .get(post_search.my_post_list);

  app.route(url+'/prices/:id')
      .delete(delete_my_old_post.delete_post)
  
  app.route(url+'/prices/:id')
      .put(upd_old_post.update_post);
  
  app.route(url+'/prices/myposts')
      .get(my_posts.my_own_posts);
};
