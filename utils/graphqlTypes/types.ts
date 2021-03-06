export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type Query = {
   __typename?: 'Query';
  login?: Maybe<AuthBody>;
  refreshToken?: Maybe<AuthBody>;
  passwordCode?: Maybe<Scalars['String']>;
  testLongApi?: Maybe<Scalars['String']>;
  userList?: Maybe<UserPage>;
  oneUser?: Maybe<User>;
  orderList?: Maybe<OrderPage>;
  orderListTotal?: Maybe<Scalars['Float']>;
  orderDetail?: Maybe<OrderInfo>;
  getDataConfig?: Maybe<DataConfig>;
  homeCarouselImgs?: Maybe<DataConfig>;
  getDictTypeList?: Maybe<Array<Maybe<DictTypeFirst>>>;
  getDictList?: Maybe<Array<Maybe<Dict>>>;
  productList?: Maybe<ProductPage>;
  productListByIds?: Maybe<ProductPage>;
  productListOrderByOrder?: Maybe<ProductPage>;
  categoryList?: Maybe<CategoryPage>;
  oneCategory?: Maybe<Category>;
  productsInCategory?: Maybe<ProductPage>;
  categoryLevel?: Maybe<Scalars['Float']>;
  categoryRootParent?: Maybe<Category>;
  promoCodeList?: Maybe<Array<Maybe<PromoCode>>>;
  payCardListOneUser?: Maybe<Array<Maybe<UserPayCard>>>;
  userPayCard?: Maybe<UserPayCard>;
  userAddressListOneUser?: Maybe<Array<Maybe<UserAddress>>>;
  userAddress?: Maybe<UserAddress>;
  shopCartList?: Maybe<Array<Maybe<ShopCart>>>;
  groupQueueList?: Maybe<Array<Maybe<GroupQueue>>>;
};


export type QueryLoginArgs = {
  user?: Maybe<UserItemInput>;
};


export type QueryRefreshTokenArgs = {
  refreshtoken: Scalars['String'];
};


export type QueryPasswordCodeArgs = {
  password?: Maybe<Scalars['String']>;
};


export type QueryUserListArgs = {
  userListInput?: Maybe<UserListInput>;
};


export type QueryOrderListArgs = {
  fromUser?: Maybe<Scalars['Boolean']>;
  orderInput?: Maybe<OrderInput>;
};


export type QueryOrderListTotalArgs = {
  orderInput?: Maybe<OrderInput>;
};


export type QueryOrderDetailArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryGetDataConfigArgs = {
  dataConfigInput?: Maybe<DataConfigItemInput>;
};


export type QueryHomeCarouselImgsArgs = {
  dataConfigInput?: Maybe<DataConfigItemInput>;
};


export type QueryGetDictListArgs = {
  dictInput?: Maybe<DictInput>;
};


export type QueryProductListArgs = {
  orderByInput?: Maybe<OrderByInput>;
  productInput?: Maybe<ProductItemInput>;
};


export type QueryProductListByIdsArgs = {
  ids?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryProductListOrderByOrderArgs = {
  productInput?: Maybe<ProductItemInput>;
  orderByType?: Maybe<Scalars['String']>;
};


export type QueryCategoryListArgs = {
  data?: Maybe<CategoryListInput>;
};


export type QueryOneCategoryArgs = {
  data?: Maybe<CategoryItemInput>;
};


export type QueryProductsInCategoryArgs = {
  orderByAndPageInput?: Maybe<OrderByAndPageInput>;
  productItemInput?: Maybe<ProductItemInput>;
  categoryItemInput?: Maybe<CategoryItemInput>;
};


export type QueryCategoryLevelArgs = {
  categoryItemInput?: Maybe<CategoryItemInput>;
};


export type QueryCategoryRootParentArgs = {
  categoryItemInput?: Maybe<CategoryItemInput>;
};


export type QueryPromoCodeListArgs = {
  promoCodeItemInput?: Maybe<PromoCodeItemInput>;
};


export type QueryUserPayCardArgs = {
  userPayCard?: Maybe<UserPayCardItemInput>;
};


export type QueryUserAddressArgs = {
  userAddress?: Maybe<UserAddressItemInput>;
};


export type QueryGroupQueueListArgs = {
  groupQueueItemInput?: Maybe<GroupQueueItemInput>;
};

export type UserItemInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  password?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['Float']>;
  userInfo?: Maybe<UserInfoItemInput>;
  rOrderUser?: Maybe<Array<ROrderUserItemInput>>;
  orderInfo?: Maybe<Array<OrderInfoItemInput>>;
  userPayCard?: Maybe<Array<Maybe<UserPayCardItemInput>>>;
  userAddress?: Maybe<Array<Maybe<UserAddressItemInput>>>;
  orderCoinNextMonth?: Maybe<Scalars['Float']>;
  orderCoinCurrentMonthCost?: Maybe<Scalars['Float']>;
  orderCoinLastMonthGet?: Maybe<Scalars['Float']>;
  orderCoinCurrentMonth?: Maybe<Scalars['Float']>;
  orderAmountCurrentYear?: Maybe<Scalars['Float']>;
  shopCart?: Maybe<Array<Maybe<ShopCartItemInput>>>;
  groupOrder?: Maybe<GroupOrderItemInput>;
};


export type UserInfoItemInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  userLevel?: Maybe<Scalars['String']>;
  userLevelDict?: Maybe<DictItemInput>;
  user?: Maybe<UserItemInput>;
  pickupAddressId?: Maybe<Scalars['String']>;
};

export type DictItemInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  isDisable?: Maybe<Scalars['Float']>;
  dictTypeCode?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  sort?: Maybe<Scalars['Float']>;
  remark?: Maybe<Scalars['String']>;
  dictTypeFirst?: Maybe<DictTypeFirstItemInput>;
  promoCode?: Maybe<Array<Maybe<PromoCodeItemInput>>>;
};

export type DictTypeFirstItemInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  parentCode?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  sort?: Maybe<Scalars['Float']>;
  remark?: Maybe<Scalars['String']>;
  dict?: Maybe<DictItemInput>;
};

export type PromoCodeItemInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  remark?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  discountType?: Maybe<Scalars['String']>;
  discountAmount?: Maybe<Scalars['Float']>;
  discountCondition?: Maybe<Scalars['String']>;
  discountConditionAmount?: Maybe<Scalars['Float']>;
  productCategory?: Maybe<Scalars['String']>;
  imgUrl?: Maybe<Scalars['String']>;
  effectiveDateStart?: Maybe<Scalars['Timestamp']>;
  effectiveDateEnd?: Maybe<Scalars['Timestamp']>;
  promoCodeType?: Maybe<Scalars['String']>;
  reuseTimes?: Maybe<Scalars['Float']>;
  code?: Maybe<Scalars['String']>;
  isDisable?: Maybe<Scalars['Float']>;
  userLevel?: Maybe<DictItemInput>;
};

export type ROrderUserItemInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
  orderInfo?: Maybe<OrderInfoItemInput>;
  user?: Maybe<UserItemInput>;
};

export type OrderInfoItemInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  number?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['Float']>;
  actuallyPaid?: Maybe<Scalars['Float']>;
  addressId?: Maybe<Scalars['String']>;
  paymentMethodCardId?: Maybe<Scalars['String']>;
  subtotal?: Maybe<Scalars['Float']>;
  couponDiscount?: Maybe<Scalars['Float']>;
  vipDiscount?: Maybe<Scalars['Float']>;
  transportationCosts?: Maybe<Scalars['Float']>;
  saleTax?: Maybe<Scalars['Float']>;
  orderId?: Maybe<Scalars['String']>;
  discountProductTotal?: Maybe<Scalars['Float']>;
  finishTime?: Maybe<Scalars['Timestamp']>;
  rOrderUser?: Maybe<ROrderUserItemInput>;
  user?: Maybe<UserItemInput>;
  rOrderProduct?: Maybe<Array<ROrderProductItemInput>>;
  userAddress?: Maybe<UserAddressItemInput>;
  pickUpTime?: Maybe<Scalars['Timestamp']>;
  pickUpType?: Maybe<Scalars['String']>;
  generateCoin?: Maybe<Scalars['Float']>;
  deductCoin?: Maybe<Scalars['Float']>;
  userPayCard?: Maybe<UserPayCardItemInput>;
  selfAddressId?: Maybe<Scalars['String']>;
  currentUserLevel?: Maybe<Scalars['String']>;
  groupOrder?: Maybe<GroupOrderItemInput>;
};

export type ROrderProductItemInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  orderId?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  count?: Maybe<Scalars['Float']>;
  dealPrice?: Maybe<Scalars['Float']>;
  product?: Maybe<ProductItemInput>;
  orderInfo?: Maybe<OrderInfoItemInput>;
};

export type ProductItemInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  categoryId?: Maybe<Scalars['String']>;
  remark?: Maybe<Scalars['String']>;
  isHot?: Maybe<Scalars['Float']>;
  isNew?: Maybe<Scalars['Float']>;
  shelvesTypes?: Maybe<Scalars['String']>;
  isEnable?: Maybe<Scalars['Float']>;
  sort?: Maybe<Scalars['Float']>;
  stock?: Maybe<Scalars['Float']>;
  packingUnit?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['Float']>;
  priceIn?: Maybe<Scalars['Float']>;
  priceOut?: Maybe<Scalars['Float']>;
  priceMarket?: Maybe<Scalars['Float']>;
  brand?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['Float']>;
  isGroup?: Maybe<Scalars['Float']>;
  groupPrecision?: Maybe<Scalars['Float']>;
  groupAmount?: Maybe<Scalars['Float']>;
  groupRemark?: Maybe<Scalars['String']>;
  groupAmountUnit?: Maybe<Scalars['String']>;
  rOrderProduct?: Maybe<Array<ROrderProductItemInput>>;
  img?: Maybe<Array<Maybe<ProductImgItemInput>>>;
  category?: Maybe<CategoryItemInput>;
  shopCart?: Maybe<Array<Maybe<ShopCartItemInput>>>;
  unitString?: Maybe<Scalars['String']>;
  packingUnitString?: Maybe<Scalars['String']>;
  groupAmountUnitString?: Maybe<Scalars['String']>;
  groupPrecisionString?: Maybe<Scalars['String']>;
  groupQueue?: Maybe<Array<Maybe<GroupQueueItemInput>>>;
  sumOrder?: Maybe<Scalars['Float']>;
};

export type ProductImgItemInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  productId?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['Float']>;
  url?: Maybe<Scalars['String']>;
  product?: Maybe<ProductItemInput>;
};

export type CategoryItemInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  isEnable?: Maybe<Scalars['Float']>;
  remark?: Maybe<Scalars['String']>;
  sort?: Maybe<Scalars['Float']>;
  parentId?: Maybe<Scalars['String']>;
  fullParentId?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['String']>;
  imgUrl?: Maybe<Scalars['String']>;
  parentCategory?: Maybe<CategoryItemInput>;
  childCategories?: Maybe<Array<Maybe<CategoryItemInput>>>;
  product?: Maybe<Array<Maybe<ProductItemInput>>>;
};

export type ShopCartItemInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['Float']>;
  isNext?: Maybe<Scalars['Float']>;
  user?: Maybe<UserItemInput>;
  product?: Maybe<ProductItemInput>;
};

export type GroupQueueItemInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  productId?: Maybe<Scalars['String']>;
  fillAmount?: Maybe<Scalars['Float']>;
  product?: Maybe<ProductItemInput>;
  groupOrder?: Maybe<Array<Maybe<GroupOrderItemInput>>>;
  sumFillAmount?: Maybe<Scalars['Float']>;
};

export type GroupOrderItemInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  groupQueueId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  orderGroupAmount?: Maybe<Scalars['Float']>;
  orderId?: Maybe<Scalars['String']>;
  orderInfo?: Maybe<OrderInfoItemInput>;
  groupQueue?: Maybe<GroupQueueItemInput>;
  user?: Maybe<UserItemInput>;
};

export type UserAddressItemInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  zip?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  isDefault?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['String']>;
  contactInformation?: Maybe<Scalars['String']>;
  contactUserName?: Maybe<Scalars['String']>;
  orderInfo?: Maybe<Array<Maybe<OrderInfoItemInput>>>;
  combineAddress?: Maybe<Scalars['String']>;
  user?: Maybe<UserItemInput>;
};

export type UserPayCardItemInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
  addressDetail?: Maybe<Scalars['String']>;
  zipCode?: Maybe<Scalars['String']>;
  contact?: Maybe<Scalars['String']>;
  isDefault?: Maybe<Scalars['Float']>;
  orderInfo?: Maybe<Array<Maybe<OrderInfoItemInput>>>;
  expirationTime?: Maybe<Scalars['Timestamp']>;
  user?: Maybe<UserItemInput>;
  creditAddressInputType?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
};

export type AuthBody = {
   __typename?: 'AuthBody';
  token?: Maybe<Scalars['String']>;
  refreshtoken?: Maybe<Scalars['String']>;
};

export type UserListInput = {
  rows_per_page?: Maybe<Scalars['Float']>;
  page?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  registerName?: Maybe<Scalars['String']>;
};

export type UserPage = {
   __typename?: 'UserPage';
  total?: Maybe<Scalars['Float']>;
  list?: Maybe<Array<Maybe<User>>>;
};

export type User = {
   __typename?: 'User';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  password?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['Float']>;
  userInfo?: Maybe<UserInfo>;
  rOrderUser?: Maybe<Array<ROrderUser>>;
  orderInfo?: Maybe<Array<OrderInfo>>;
  userPayCard?: Maybe<Array<Maybe<UserPayCard>>>;
  userAddress?: Maybe<Array<Maybe<UserAddress>>>;
  orderCoinNextMonth?: Maybe<Scalars['Float']>;
  orderCoinCurrentMonthCost?: Maybe<Scalars['Float']>;
  orderCoinLastMonthGet?: Maybe<Scalars['Float']>;
  orderCoinCurrentMonth?: Maybe<Scalars['Float']>;
  orderAmountCurrentYear?: Maybe<Scalars['Float']>;
  shopCart?: Maybe<Array<Maybe<ShopCart>>>;
  groupOrder?: Maybe<GroupOrder>;
};

export type UserInfo = {
   __typename?: 'UserInfo';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  userLevel?: Maybe<Scalars['String']>;
  userLevelDict?: Maybe<Dict>;
  user?: Maybe<User>;
  pickupAddressId?: Maybe<Scalars['String']>;
};

export type Dict = {
   __typename?: 'Dict';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  isDisable?: Maybe<Scalars['Float']>;
  dictTypeCode?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  sort?: Maybe<Scalars['Float']>;
  remark?: Maybe<Scalars['String']>;
  dictTypeFirst?: Maybe<DictTypeFirst>;
  promoCode?: Maybe<Array<Maybe<PromoCode>>>;
};

export type DictTypeFirst = {
   __typename?: 'DictTypeFirst';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  parentCode?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  sort?: Maybe<Scalars['Float']>;
  remark?: Maybe<Scalars['String']>;
  dict?: Maybe<Dict>;
};

export type PromoCode = {
   __typename?: 'PromoCode';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  remark?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  discountType?: Maybe<Scalars['String']>;
  discountAmount?: Maybe<Scalars['Float']>;
  discountCondition?: Maybe<Scalars['String']>;
  discountConditionAmount?: Maybe<Scalars['Float']>;
  productCategory?: Maybe<Scalars['String']>;
  imgUrl?: Maybe<Scalars['String']>;
  effectiveDateStart?: Maybe<Scalars['Timestamp']>;
  effectiveDateEnd?: Maybe<Scalars['Timestamp']>;
  promoCodeType?: Maybe<Scalars['String']>;
  reuseTimes?: Maybe<Scalars['Float']>;
  code?: Maybe<Scalars['String']>;
  isDisable?: Maybe<Scalars['Float']>;
  userLevel?: Maybe<Dict>;
};

export type ROrderUser = {
   __typename?: 'ROrderUser';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
  orderInfo?: Maybe<OrderInfo>;
  user?: Maybe<User>;
};

export type OrderInfo = {
   __typename?: 'OrderInfo';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  number?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['Float']>;
  actuallyPaid?: Maybe<Scalars['Float']>;
  addressId?: Maybe<Scalars['String']>;
  paymentMethodCardId?: Maybe<Scalars['String']>;
  subtotal?: Maybe<Scalars['Float']>;
  couponDiscount?: Maybe<Scalars['Float']>;
  vipDiscount?: Maybe<Scalars['Float']>;
  transportationCosts?: Maybe<Scalars['Float']>;
  saleTax?: Maybe<Scalars['Float']>;
  orderId?: Maybe<Scalars['String']>;
  discountProductTotal?: Maybe<Scalars['Float']>;
  finishTime?: Maybe<Scalars['Timestamp']>;
  rOrderUser?: Maybe<ROrderUser>;
  user?: Maybe<User>;
  rOrderProduct?: Maybe<Array<ROrderProduct>>;
  userAddress?: Maybe<UserAddress>;
  pickUpTime?: Maybe<Scalars['Timestamp']>;
  pickUpType?: Maybe<Scalars['String']>;
  generateCoin?: Maybe<Scalars['Float']>;
  deductCoin?: Maybe<Scalars['Float']>;
  userPayCard?: Maybe<UserPayCard>;
  selfAddressId?: Maybe<Scalars['String']>;
  currentUserLevel?: Maybe<Scalars['String']>;
  groupOrder?: Maybe<GroupOrder>;
};

export type ROrderProduct = {
   __typename?: 'ROrderProduct';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  orderId?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  count?: Maybe<Scalars['Float']>;
  dealPrice?: Maybe<Scalars['Float']>;
  product?: Maybe<Product>;
  orderInfo?: Maybe<OrderInfo>;
};

export type Product = {
   __typename?: 'Product';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  categoryId?: Maybe<Scalars['String']>;
  remark?: Maybe<Scalars['String']>;
  isHot?: Maybe<Scalars['Float']>;
  isNew?: Maybe<Scalars['Float']>;
  shelvesTypes?: Maybe<Scalars['String']>;
  isEnable?: Maybe<Scalars['Float']>;
  sort?: Maybe<Scalars['Float']>;
  stock?: Maybe<Scalars['Float']>;
  packingUnit?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['Float']>;
  priceIn?: Maybe<Scalars['Float']>;
  priceOut?: Maybe<Scalars['Float']>;
  priceMarket?: Maybe<Scalars['Float']>;
  brand?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['Float']>;
  isGroup?: Maybe<Scalars['Float']>;
  groupPrecision?: Maybe<Scalars['Float']>;
  groupAmount?: Maybe<Scalars['Float']>;
  groupRemark?: Maybe<Scalars['String']>;
  groupAmountUnit?: Maybe<Scalars['String']>;
  rOrderProduct?: Maybe<Array<ROrderProduct>>;
  img?: Maybe<Array<Maybe<ProductImg>>>;
  category?: Maybe<Category>;
  shopCart?: Maybe<Array<Maybe<ShopCart>>>;
  unitString?: Maybe<Scalars['String']>;
  packingUnitString?: Maybe<Scalars['String']>;
  groupAmountUnitString?: Maybe<Scalars['String']>;
  groupPrecisionString?: Maybe<Scalars['String']>;
  groupQueue?: Maybe<Array<Maybe<GroupQueue>>>;
  sumOrder?: Maybe<Scalars['Float']>;
};

export type ProductImg = {
   __typename?: 'ProductImg';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  productId?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['Float']>;
  url?: Maybe<Scalars['String']>;
  product?: Maybe<Product>;
};

export type Category = {
   __typename?: 'Category';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  isEnable?: Maybe<Scalars['Float']>;
  remark?: Maybe<Scalars['String']>;
  sort?: Maybe<Scalars['Float']>;
  parentId?: Maybe<Scalars['String']>;
  fullParentId?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['String']>;
  imgUrl?: Maybe<Scalars['String']>;
  parentCategory?: Maybe<Category>;
  childCategories?: Maybe<Array<Maybe<Category>>>;
  product?: Maybe<Array<Maybe<Product>>>;
};

export type ShopCart = {
   __typename?: 'ShopCart';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['Float']>;
  isNext?: Maybe<Scalars['Float']>;
  user?: Maybe<User>;
  product?: Maybe<Product>;
};

export type GroupQueue = {
   __typename?: 'GroupQueue';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  productId?: Maybe<Scalars['String']>;
  fillAmount?: Maybe<Scalars['Float']>;
  product?: Maybe<Product>;
  groupOrder?: Maybe<Array<Maybe<GroupOrder>>>;
  sumFillAmount?: Maybe<Scalars['Float']>;
};

export type GroupOrder = {
   __typename?: 'GroupOrder';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  groupQueueId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  orderGroupAmount?: Maybe<Scalars['Float']>;
  orderId?: Maybe<Scalars['String']>;
  orderInfo?: Maybe<OrderInfo>;
  groupQueue?: Maybe<GroupQueue>;
  user?: Maybe<User>;
};

export type UserAddress = {
   __typename?: 'UserAddress';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  zip?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  isDefault?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['String']>;
  contactInformation?: Maybe<Scalars['String']>;
  contactUserName?: Maybe<Scalars['String']>;
  orderInfo?: Maybe<Array<Maybe<OrderInfo>>>;
  combineAddress?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type UserPayCard = {
   __typename?: 'UserPayCard';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
  addressDetail?: Maybe<Scalars['String']>;
  zipCode?: Maybe<Scalars['String']>;
  contact?: Maybe<Scalars['String']>;
  isDefault?: Maybe<Scalars['Float']>;
  orderInfo?: Maybe<Array<Maybe<OrderInfo>>>;
  expirationTime?: Maybe<Scalars['Timestamp']>;
  user?: Maybe<User>;
  creditAddressInputType?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
};

export type OrderInput = {
  rows_per_page?: Maybe<Scalars['Float']>;
  page?: Maybe<Scalars['Float']>;
  startTime?: Maybe<Scalars['Timestamp']>;
  endTime?: Maybe<Scalars['Timestamp']>;
  number?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['Float']>;
  userName?: Maybe<Scalars['String']>;
  registerName?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  pickUpTime?: Maybe<Scalars['Timestamp']>;
  pickUpType?: Maybe<Scalars['String']>;
  isGroup?: Maybe<Scalars['Float']>;
};

export type OrderPage = {
   __typename?: 'OrderPage';
  total?: Maybe<Scalars['Float']>;
  list?: Maybe<Array<Maybe<OrderInfo>>>;
};

export type DataConfigItemInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  type?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['JSON']>;
  remark?: Maybe<Scalars['String']>;
};


export type DataConfig = {
   __typename?: 'DataConfig';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  type?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['JSON']>;
  remark?: Maybe<Scalars['String']>;
};

export type DictInput = {
  dictTypeCode?: Maybe<Scalars['String']>;
  isDisable?: Maybe<Scalars['Float']>;
};

export type OrderByInput = {
  orderByObject?: Maybe<Array<Maybe<Array<Maybe<Scalars['String']>>>>>;
};

export type ProductPage = {
   __typename?: 'ProductPage';
  total?: Maybe<Scalars['Float']>;
  list?: Maybe<Array<Maybe<Product>>>;
};

export type CategoryListInput = {
  category?: Maybe<CategoryItemInput>;
  pageInput?: Maybe<PageInput>;
  orderByInput?: Maybe<OrderByInput>;
};

export type PageInput = {
  rows_per_page?: Maybe<Scalars['Float']>;
  page?: Maybe<Scalars['Float']>;
};

export type CategoryPage = {
   __typename?: 'CategoryPage';
  total?: Maybe<Scalars['Float']>;
  list?: Maybe<Array<Maybe<Category>>>;
};

export type OrderByAndPageInput = {
  rows_per_page?: Maybe<Scalars['Float']>;
  page?: Maybe<Scalars['Float']>;
  orderByObject?: Maybe<Array<Maybe<Array<Maybe<Scalars['String']>>>>>;
};

export type Mutation = {
   __typename?: 'Mutation';
  saveUserList?: Maybe<Array<Maybe<User>>>;
  registerUser?: Maybe<UserInRegister>;
  updatePassword?: Maybe<UpdatePasswordRes>;
  updateUserInfo?: Maybe<UserInfo>;
  saveOrderList?: Maybe<Array<Maybe<OrderInfo>>>;
  saveOrder?: Maybe<OrderInfo>;
  updateOrder?: Maybe<OrderInfo>;
  saveDataConfig?: Maybe<DataConfig>;
  saveDictTypeFirst?: Maybe<Array<Maybe<DictTypeFirst>>>;
  saveCategory?: Maybe<Category>;
  saveUserPayCard?: Maybe<UserPayCard>;
  setUserPayCardDefault?: Maybe<UserPayCard>;
  saveUserAddress?: Maybe<UserAddress>;
  setUserAddressDefault?: Maybe<UserAddress>;
  updateNumShopCart?: Maybe<ShopCart>;
  updateShopCart?: Maybe<ShopCart>;
  saveGroupOrder?: Maybe<OrderInfo>;
};


export type MutationSaveUserListArgs = {
  userItemInput?: Maybe<Array<Maybe<UserItemInput>>>;
};


export type MutationRegisterUserArgs = {
  data?: Maybe<UserItemInput>;
};


export type MutationUpdatePasswordArgs = {
  data?: Maybe<UpdatePasswordInput>;
};


export type MutationUpdateUserInfoArgs = {
  userInfo?: Maybe<UserInfoItemInput>;
};


export type MutationSaveOrderListArgs = {
  orderInfoItemInput?: Maybe<Array<Maybe<OrderInfoItemInput>>>;
};


export type MutationSaveOrderArgs = {
  orderInfoItemInput?: Maybe<OrderInfoItemInput>;
};


export type MutationUpdateOrderArgs = {
  orderInfoItemInput?: Maybe<OrderInfoItemInput>;
};


export type MutationSaveDataConfigArgs = {
  dataConfigInput?: Maybe<DataConfigItemInput>;
};


export type MutationSaveDictTypeFirstArgs = {
  dictTypeFirstItemInput?: Maybe<Array<Maybe<DictTypeFirstItemInput>>>;
};


export type MutationSaveCategoryArgs = {
  categoryItemInput?: Maybe<CategoryItemInput>;
};


export type MutationSaveUserPayCardArgs = {
  userPayCard?: Maybe<UserPayCardItemInput>;
};


export type MutationSetUserPayCardDefaultArgs = {
  userPayCard?: Maybe<UserPayCardItemInput>;
};


export type MutationSaveUserAddressArgs = {
  userAddress?: Maybe<UserAddressItemInput>;
};


export type MutationSetUserAddressDefaultArgs = {
  userAddress?: Maybe<UserAddressItemInput>;
};


export type MutationUpdateNumShopCartArgs = {
  updateNum?: Maybe<Scalars['Float']>;
  shopCart?: Maybe<ShopCartItemInput>;
};


export type MutationUpdateShopCartArgs = {
  shopCart?: Maybe<ShopCartItemInput>;
};


export type MutationSaveGroupOrderArgs = {
  orderInfoItemInput?: Maybe<OrderInfoItemInput>;
  groupQueueItemInput?: Maybe<GroupQueueItemInput>;
  groupOrderItemInput?: Maybe<GroupOrderItemInput>;
};

export type UserInRegister = {
   __typename?: 'UserInRegister';
  token?: Maybe<Scalars['String']>;
  refreshtoken?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type UpdatePasswordInput = {
  oldPassword?: Maybe<Scalars['String']>;
  newPassword?: Maybe<Scalars['String']>;
  confirmPassword?: Maybe<Scalars['String']>;
};

export type UpdatePasswordRes = {
   __typename?: 'UpdatePasswordRes';
  authBody?: Maybe<AuthBody>;
  user?: Maybe<User>;
};

/** page type */
export type PageResult = {
   __typename?: 'PageResult';
  total?: Maybe<Scalars['Float']>;
};

