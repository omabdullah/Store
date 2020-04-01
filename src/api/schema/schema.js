
import { 
	GraphQLID,
	GraphQLInt,
	GraphQLBoolean,
	GraphQLFloat,
	GraphQLString,
	GraphQLObjectType, 
	GraphQLSchema,
	GraphQLNonNull,
	GraphQLList,
} from 'graphql';

import {
	fromGlobalId,
	globalIdField,
	nodeDefinitions,
	connectionArgs,
	connectionDefinitions,
	connectionFromArray,
	connectionFromPromisedArray,
	mutationWithClientMutationId,
} from 'graphql-relay';

import {
	GraphQLDateTime,
} from 'graphql-iso-date';

import { getCategory, getCategoryList } from '../database/queries/category';
import { getProduct, getProductList, getProductsByCategoryId, getProductsByCategoryName } from '../database/queries/product';
import { getUser, searchUsers } from '../database/queries/user';
import { getEmployee, getAllEmployees } from '../database/queries/employee';
import { getCart, getCartItems } from '../database/queries/cart';
import { getAllInventoryOrders } from '../database/queries/inventory';

import { updateRole } from '../database/mutations/user';
import { signUp, login } from '../database/mutations/auth';
import { deleteEmployee } from '../database/mutations/employee';
import { addCategory, deleteCategory } from '../database/mutations/category';
import { addProduct, deleteProduct } from '../database/mutations/product';
import { deleteInventoryOrder } from '../database/mutations/inventory';

import GraphQLCategory from './types/category';
import GraphQLUser, { UserConnection } from './types/user';
import GraphQLProduct, { ProductConnection } from './types/product';
import GraphQLInventoryOrder, { InventoryOrderConnection } from './types/inventory_order';

import {
	ViewerQuery,
	CategoriesQuery,

	UserSearchQuery,
	EmployeeQuery,
	CategoryQuery,
	CategoryListQuery,
	ProductQuery,
	ProductListQuery,
	InventoryOrderQuery,
} from './queries/queries';

import {
	SignUpMutation,
	LoginMutation,
	UpdateRoleMutation,
	AddCategoryMutation,
	AddProductMutation,
	DeleteEmployeeMutation,
	DeleteCategoryMutation,
	DeleteProductMutation,
	DeleteInventoryOrderMutation,
} from './mutations/mutations';


const Query = new GraphQLObjectType({
	name: 'Query',
	fields: {
		// node: nodeField,
		viewer: ViewerQuery,
		categories: CategoriesQuery,

		user_search: UserSearchQuery,
		employee_list: EmployeeQuery,
		category_list: CategoryListQuery,
		product: ProductQuery,
		product_list: ProductListQuery,
		inventory_order_list: InventoryOrderQuery,
	},
}); 


const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		signUp: SignUpMutation,
		login: LoginMutation,
		updateRole: UpdateRoleMutation,
		addCategory: AddCategoryMutation,
		addProduct: AddProductMutation,
		deleteEmployee: DeleteEmployeeMutation,
		deleteCategory: DeleteCategoryMutation,
		deleteProduct: DeleteProductMutation,
		deleteInventoryOrder: DeleteInventoryOrderMutation,
	},
});

export default new GraphQLSchema({
	query: Query,
	mutation: Mutation,
});