import { GraphQLResolveInfo } from 'graphql';
import { InsiderTrade as DBInsiderTrade } from '@prisma/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type InsiderTrade = {
  __typename?: 'InsiderTrade';
  amendment: Scalars['Boolean'];
  amendmentDetails: Scalars['String'];
  closelyAssociated: Scalars['Boolean'];
  currency: Scalars['String'];
  id: Scalars['String'];
  initialNotification: Scalars['String'];
  instrumentName: Scalars['String'];
  instrumentType: Scalars['String'];
  isin: Scalars['String'];
  issuer: Scalars['String'];
  leiCode: Scalars['String'];
  managerialResponsibilities: Scalars['String'];
  notifier: Scalars['String'];
  position: Scalars['String'];
  price: Scalars['Float'];
  publicationDateTime: Scalars['String'];
  shareOrOptionProgram: Scalars['Boolean'];
  status: Scalars['String'];
  transactionDateTime: Scalars['String'];
  transactionType: Scalars['String'];
  unit: Scalars['String'];
  venue: Scalars['String'];
  volume: Scalars['Float'];
};

export type InsiderTradeConnection = {
  __typename?: 'InsiderTradeConnection';
  edges: Array<InsiderTradeEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type InsiderTradeEdge = {
  __typename?: 'InsiderTradeEdge';
  cursor: Scalars['String'];
  node: InsiderTrade;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  insider: InsiderTradeConnection;
};


export type QueryInsiderArgs = {
  cursor?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  InsiderTrade: ResolverTypeWrapper<DBInsiderTrade>;
  InsiderTradeConnection: ResolverTypeWrapper<Omit<InsiderTradeConnection, 'edges'> & { edges: Array<ResolversTypes['InsiderTradeEdge']> }>;
  InsiderTradeEdge: ResolverTypeWrapper<Omit<InsiderTradeEdge, 'node'> & { node: ResolversTypes['InsiderTrade'] }>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Float: Scalars['Float'];
  InsiderTrade: DBInsiderTrade;
  InsiderTradeConnection: Omit<InsiderTradeConnection, 'edges'> & { edges: Array<ResolversParentTypes['InsiderTradeEdge']> };
  InsiderTradeEdge: Omit<InsiderTradeEdge, 'node'> & { node: ResolversParentTypes['InsiderTrade'] };
  Int: Scalars['Int'];
  PageInfo: PageInfo;
  Query: {};
  String: Scalars['String'];
};

export type InsiderTradeResolvers<ContextType = any, ParentType extends ResolversParentTypes['InsiderTrade'] = ResolversParentTypes['InsiderTrade']> = {
  amendment?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  amendmentDetails?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  closelyAssociated?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  initialNotification?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  instrumentName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  instrumentType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isin?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  issuer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  leiCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  managerialResponsibilities?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  notifier?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  position?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  publicationDateTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  shareOrOptionProgram?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transactionDateTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transactionType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  unit?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  venue?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  volume?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InsiderTradeConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['InsiderTradeConnection'] = ResolversParentTypes['InsiderTradeConnection']> = {
  edges?: Resolver<Array<ResolversTypes['InsiderTradeEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InsiderTradeEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['InsiderTradeEdge'] = ResolversParentTypes['InsiderTradeEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['InsiderTrade'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  insider?: Resolver<ResolversTypes['InsiderTradeConnection'], ParentType, ContextType, RequireFields<QueryInsiderArgs, never>>;
};

export type Resolvers<ContextType = any> = {
  InsiderTrade?: InsiderTradeResolvers<ContextType>;
  InsiderTradeConnection?: InsiderTradeConnectionResolvers<ContextType>;
  InsiderTradeEdge?: InsiderTradeEdgeResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

