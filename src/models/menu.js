import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import { formatMessage } from 'umi-plugin-react/locale';
import Authorized from '@/utils/Authorized';
import { hasPriv } from '@/utils/privilege';
import { menu } from '../defaultSettings';

const { check } = Authorized;

// Conversion router to menu.
function formatter( data, parentPrivs = [], parentName ) {
	if ( !data ) {
		return undefined;
	}
	return data
		.map( item => {
			if ( !item.name || !item.path || item.hidden ) {
				return null;
			}

			let locale = 'menu';
			if ( parentName && parentName !== '/' ) {
				locale = `${parentName}.${item.name}`;
			} else {
				locale = `menu.${item.name}`;
			}
			// if enableMenuLocale use item.name,
			// close menu international
			const name = menu.disableLocal
				? item.name
				: formatMessage( { id: locale, defaultMessage: item.name } );
			const result = {
				...item,
				name,
				locale,
				privs: item.privs,//( item.privs || [] ).concat( parentPrivs ),
			};
			if ( item.routes ) {
				const children = formatter( item.routes, result.privs, locale );
				// Reduce memory usage
				result.children = children;
			}
			delete result.routes;
			return result;
		} )
		.filter( item => item );
}

const memoizeOneFormatter = memoizeOne( formatter, isEqual );

/**
 * get SubMenu or Item
 */
const getSubMenu = item => {
	// doc: add hideChildrenInMenu
	if ( item.children && !item.hideChildrenInMenu && item.children.some( child => child.name ) ) {
		return {
			...item,
			children: filterMenuData( item.children ), // eslint-disable-line
		};
	}
	return item;
};

/**
 * filter menuData
 */
const filterMenuData = menuData => {
	if ( !menuData ) {
		return [];
	}
	return menuData
		.filter( item => item.name && !item.hideInMenu )
		// .map( item => check( item.privs, getSubMenu( item ) ) )
		.map( item => {
			const subMenu = getSubMenu( item );
			return hasPriv( subMenu.privs, '&' ) && subMenu;
		} )
		.filter( item => item );
};
/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 */
const getBreadcrumbNameMap = menuData => {
	if ( !menuData ) {
		return {};
	}
	const routerMap = {};

	const flattenMenuData = data => {
		data.forEach( menuItem => {
			if ( menuItem.children ) {
				flattenMenuData( menuItem.children );
			}
			// Reduce memory usage
			routerMap[ menuItem.path ] = menuItem;
		} );
	};
	flattenMenuData( menuData );
	return routerMap;
};

const memoizeOneGetBreadcrumbNameMap = memoizeOne( getBreadcrumbNameMap, isEqual );

export default {
	namespace: 'menu',

	state: {
		menuData: [],
		routerData: [],
		breadcrumbNameMap: {},
	},

	effects: {
		* getMenuData( { payload }, { put } ) {
			const { routes, privs, path } = payload;
			const originalMenuData = memoizeOneFormatter( routes, privs, path );
			const menuData = filterMenuData( originalMenuData );
			const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap( originalMenuData );
			yield put( {
				type: 'save',
				payload: { menuData, breadcrumbNameMap, routerData: routes },
			} );
		},
	},

	reducers: {
		save( state, action ) {
			return {
				...state,
				...action.payload,
			};
		},
	},
};