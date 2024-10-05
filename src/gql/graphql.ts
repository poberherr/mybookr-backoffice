/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: any; output: any };
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.This scalar is serialized to a string in ISO 8601 format and parsed from a string in ISO 8601 format. */
  DateTimeISO: { input: any; output: any };
  File: { input: any; output: any };
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any };
};

export type Activity = {
  __typename?: "Activity";
  blockedDays: Array<Scalars["Date"]["output"]>;
  createdAt: Scalars["DateTimeISO"]["output"];
  deletedAt?: Maybe<Scalars["DateTimeISO"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  durationMinutes: Scalars["Int"]["output"];
  experience?: Maybe<Experience>;
  guestMax?: Maybe<Scalars["Int"]["output"]>;
  id: Scalars["ID"]["output"];
  medias?: Maybe<Array<Media>>;
  price: Scalars["Int"]["output"];
  title: Scalars["String"]["output"];
  updatedAt: Scalars["DateTimeISO"]["output"];
};

export type ActivityBlockedDaysArgs = {
  dateEnd?: InputMaybe<Scalars["Date"]["input"]>;
  dateStart?: InputMaybe<Scalars["Date"]["input"]>;
};

export type ActivityFilters = {
  ids?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  q?: InputMaybe<Scalars["String"]["input"]>;
};

export type Booking = {
  __typename?: "Booking";
  activity?: Maybe<Activity>;
  additionalInformation?: Maybe<Scalars["String"]["output"]>;
  bookedDate: Scalars["String"]["output"];
  booker?: Maybe<User>;
  createdAt: Scalars["DateTimeISO"]["output"];
  currency?: Maybe<Scalars["String"]["output"]>;
  deletedAt?: Maybe<Scalars["DateTimeISO"]["output"]>;
  email: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  referenceCode: Scalars["String"]["output"];
  status: BookingStatus;
  telephone: Scalars["String"]["output"];
  totalCost: Scalars["Int"]["output"];
  updatedAt: Scalars["DateTimeISO"]["output"];
};

export type BookingFilters = {
  ids?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  q?: InputMaybe<Scalars["String"]["input"]>;
};

export enum BookingStatus {
  BookingCancelled = "BOOKING_CANCELLED",
  BookingConfirmed = "BOOKING_CONFIRMED",
  DataCollected = "DATA_COLLECTED",
  PaymentFailed = "PAYMENT_FAILED",
  PaymentFinished = "PAYMENT_FINISHED",
  PaymentStarted = "PAYMENT_STARTED",
  Started = "STARTED",
}

export type Category = {
  __typename?: "Category";
  children?: Maybe<Array<Category>>;
  createdAt: Scalars["DateTimeISO"]["output"];
  deletedAt?: Maybe<Scalars["DateTimeISO"]["output"]>;
  depth: Scalars["Int"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  parent?: Maybe<Category>;
  path: Scalars["String"]["output"];
  updatedAt: Scalars["DateTimeISO"]["output"];
  weight: Scalars["Int"]["output"];
};

export type CategoryFilters = {
  ids?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  q?: InputMaybe<Scalars["String"]["input"]>;
};

export type Experience = {
  __typename?: "Experience";
  activities: Array<Activity>;
  categories?: Maybe<Array<Category>>;
  category?: Maybe<Category>;
  createdAt: Scalars["DateTimeISO"]["output"];
  deletedAt?: Maybe<Scalars["DateTimeISO"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  location: Location;
  medias?: Maybe<Array<Media>>;
  operator: User;
  slug: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
  updatedAt: Scalars["DateTimeISO"]["output"];
  weight: Scalars["Int"]["output"];
};

export type ExperienceFilters = {
  ids?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  q?: InputMaybe<Scalars["String"]["input"]>;
};

export enum ForeignEntities {
  Activities = "ACTIVITIES",
  Bookings = "BOOKINGS",
  Categories = "CATEGORIES",
  Experiences = "EXPERIENCES",
  Locations = "LOCATIONS",
  Medias = "MEDIAS",
  Operators = "OPERATORS",
  Payments = "PAYMENTS",
  Users = "USERS",
}

export type Location = {
  __typename?: "Location";
  addressLineOne?: Maybe<Scalars["String"]["output"]>;
  addressLineTwo?: Maybe<Scalars["String"]["output"]>;
  city?: Maybe<Scalars["String"]["output"]>;
  country?: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["DateTimeISO"]["output"];
  deletedAt?: Maybe<Scalars["DateTimeISO"]["output"]>;
  federalState?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  latitude?: Maybe<Scalars["Float"]["output"]>;
  longitude?: Maybe<Scalars["Float"]["output"]>;
  postalCode?: Maybe<Scalars["String"]["output"]>;
  updatedAt: Scalars["DateTimeISO"]["output"];
};

export type Log = {
  __typename?: "Log";
  action: LogActions;
  authorId: Scalars["ID"]["output"];
  date: Scalars["DateTimeISO"]["output"];
  foreignId: Scalars["ID"]["output"];
  foreignType: ForeignEntities;
  id: Scalars["ID"]["output"];
  inputValue: Scalars["JSON"]["output"];
  previousValue: Scalars["JSON"]["output"];
};

export enum LogActions {
  Create = "CREATE",
  Delete = "DELETE",
  Update = "UPDATE",
}

export type LogFilters = {
  id: Scalars["ID"]["input"];
  type: ForeignEntities;
};

export type Media = {
  __typename?: "Media";
  aspectRatio: Scalars["Float"]["output"];
  createdAt: Scalars["DateTimeISO"]["output"];
  deletedAt?: Maybe<Scalars["DateTimeISO"]["output"]>;
  hash: Scalars["String"]["output"];
  height: Scalars["Int"]["output"];
  id: Scalars["ID"]["output"];
  mediaType: MediaType;
  title: Scalars["String"]["output"];
  updatedAt: Scalars["DateTimeISO"]["output"];
  url: Scalars["String"]["output"];
  width: Scalars["Int"]["output"];
};

export enum MediaType {
  Image = "IMAGE",
  Video = "VIDEO",
}

export type Mutation = {
  __typename?: "Mutation";
  checkBookingStatus: BookingStatus;
  createActivity: Activity;
  createBooking: Booking;
  createCategory: Category;
  createExperience: Experience;
  createPayment: UpdateBookingResultType;
  createUser: User;
  deleteActivity: Activity;
  deleteBooking: Booking;
  deleteCategory: Category;
  deleteExperience: Experience;
  deleteUser: User;
  startNewBooking: StartNewBookingResultType;
  updateActivity: Activity;
  updateBooking: Booking;
  updateCategory: Category;
  updateExistingBooking: Scalars["Boolean"]["output"];
  updateExperience: Experience;
  updateUser: User;
  uploadMedia: Scalars["Boolean"]["output"];
};

export type MutationCheckBookingStatusArgs = {
  bookingFlowToken: Scalars["String"]["input"];
};

export type MutationCreateActivityArgs = {
  description: Scalars["String"]["input"];
  durationMinutes: Scalars["Int"]["input"];
  experience: Scalars["ID"]["input"];
  guestMax?: InputMaybe<Scalars["Int"]["input"]>;
  medias: Array<Scalars["ID"]["input"]>;
  price: Scalars["Int"]["input"];
  title: Scalars["String"]["input"];
};

export type MutationCreateBookingArgs = {
  activity: Scalars["ID"]["input"];
  additionalInformation?: InputMaybe<Scalars["String"]["input"]>;
  bookedDate: Scalars["Date"]["input"];
  booker: Scalars["ID"]["input"];
  currency: Scalars["String"]["input"];
  email: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  referenceCode: Scalars["String"]["input"];
  status: BookingStatus;
  telephone: Scalars["String"]["input"];
  totalCost?: Scalars["Int"]["input"];
};

export type MutationCreateCategoryArgs = {
  name: Scalars["String"]["input"];
  path: Scalars["String"]["input"];
  weight?: InputMaybe<Scalars["Int"]["input"]>;
};

export type MutationCreateExperienceArgs = {
  categories: Array<Scalars["ID"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  location: Scalars["ID"]["input"];
  medias: Array<Scalars["ID"]["input"]>;
  operator: Scalars["ID"]["input"];
  slug: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
  weight?: Scalars["Int"]["input"];
};

export type MutationCreatePaymentArgs = {
  bookingFlowToken: Scalars["String"]["input"];
  redirectOrigin: Scalars["String"]["input"];
};

export type MutationCreateUserArgs = {
  email: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
};

export type MutationDeleteActivityArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteBookingArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteCategoryArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteExperienceArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteUserArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationStartNewBookingArgs = {
  data: StartNewBooking;
};

export type MutationUpdateActivityArgs = {
  description: Scalars["String"]["input"];
  durationMinutes: Scalars["Int"]["input"];
  experience: Scalars["ID"]["input"];
  guestMax?: InputMaybe<Scalars["Int"]["input"]>;
  id: Scalars["ID"]["input"];
  medias: Array<Scalars["ID"]["input"]>;
  price: Scalars["Int"]["input"];
  title: Scalars["String"]["input"];
};

export type MutationUpdateBookingArgs = {
  activity: Scalars["ID"]["input"];
  additionalInformation?: InputMaybe<Scalars["String"]["input"]>;
  bookedDate: Scalars["Date"]["input"];
  booker: Scalars["ID"]["input"];
  currency: Scalars["String"]["input"];
  email: Scalars["String"]["input"];
  id: Scalars["ID"]["input"];
  name: Scalars["String"]["input"];
  referenceCode: Scalars["String"]["input"];
  status: BookingStatus;
  telephone: Scalars["String"]["input"];
  totalCost?: Scalars["Int"]["input"];
};

export type MutationUpdateCategoryArgs = {
  id: Scalars["ID"]["input"];
  name: Scalars["String"]["input"];
  path: Scalars["String"]["input"];
  weight?: InputMaybe<Scalars["Int"]["input"]>;
};

export type MutationUpdateExistingBookingArgs = {
  data: UpdateExistingBooking;
};

export type MutationUpdateExperienceArgs = {
  categories: Array<Scalars["ID"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
  location: Scalars["ID"]["input"];
  medias: Array<Scalars["ID"]["input"]>;
  operator: Scalars["ID"]["input"];
  slug: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
  weight?: Scalars["Int"]["input"];
};

export type MutationUpdateUserArgs = {
  email: Scalars["String"]["input"];
  id: Scalars["ID"]["input"];
  name: Scalars["String"]["input"];
};

export type MutationUploadMediaArgs = {
  file: Array<Scalars["File"]["input"]>;
};

export type Operator = {
  __typename?: "Operator";
  contactEmail: Scalars["String"]["output"];
  contactWhatsapp: Scalars["String"]["output"];
  createdAt: Scalars["DateTimeISO"]["output"];
  deletedAt?: Maybe<Scalars["DateTimeISO"]["output"]>;
  description: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  logo?: Maybe<Media>;
  media?: Maybe<Media>;
  name: Scalars["String"]["output"];
  updatedAt: Scalars["DateTimeISO"]["output"];
  user?: Maybe<User>;
  website: Scalars["String"]["output"];
  websiteBooking: Scalars["String"]["output"];
  xenditUserId?: Maybe<Scalars["String"]["output"]>;
};

export type OperatorFilters = {
  ids?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  q?: InputMaybe<Scalars["String"]["input"]>;
};

export type PageInfo = {
  __typename?: "PageInfo";
  endCursor?: Maybe<Scalars["String"]["output"]>;
  hasNextPage: Scalars["Boolean"]["output"];
  hasPreviousPage: Scalars["Boolean"]["output"];
  startCursor?: Maybe<Scalars["String"]["output"]>;
};

export type Payment = {
  __typename?: "Payment";
  amount: Scalars["Int"]["output"];
  booking?: Maybe<Booking>;
  createdAt: Scalars["DateTimeISO"]["output"];
  currency: Scalars["String"]["output"];
  date: Scalars["Date"]["output"];
  deletedAt?: Maybe<Scalars["DateTimeISO"]["output"]>;
  externalPaymentId: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  metadata: Scalars["JSON"]["output"];
  origin: Scalars["String"]["output"];
  paymentProvider: PaymentProvider;
  status: PaymentStatus;
  updatedAt: Scalars["DateTimeISO"]["output"];
};

export enum PaymentProvider {
  Stripe = "STRIPE",
  Xendit = "XENDIT",
}

export enum PaymentStatus {
  Expired = "Expired",
  Paid = "Paid",
  Pending = "Pending",
  Settled = "Settled",
  XenditEnumDefaultFallback = "XenditEnumDefaultFallback",
}

export type Query = {
  __typename?: "Query";
  activity?: Maybe<Activity>;
  allActivities: QueryAllActivitiesConnection;
  allBookings: QueryAllBookingsConnection;
  allCategories: QueryAllCategoriesConnection;
  allExperiences: QueryAllExperiencesConnection;
  allLocations: QueryAllLocationsConnection;
  allLogs: QueryAllLogsConnection;
  allMedia: QueryAllMediaConnection;
  allOperators: QueryAllOperatorsConnection;
  allPayments: QueryAllPaymentsConnection;
  allUsers: QueryAllUsersConnection;
  booking?: Maybe<Booking>;
  category?: Maybe<Category>;
  currency: QueryCurrencyResultType;
  experience?: Maybe<Experience>;
  experienceAvailableActivities?: Maybe<Experience>;
  filterExperiences: QueryFilterExperiencesConnection;
  location?: Maybe<Location>;
  log?: Maybe<Log>;
  me?: Maybe<User>;
  media?: Maybe<Media>;
  operator?: Maybe<Operator>;
  payment?: Maybe<Payment>;
  user?: Maybe<User>;
};

export type QueryActivityArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryAllActivitiesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  filter?: InputMaybe<ActivityFilters>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  sortField?: InputMaybe<Scalars["String"]["input"]>;
  sortOrder?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryAllBookingsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  filter?: InputMaybe<BookingFilters>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  sortField?: InputMaybe<Scalars["String"]["input"]>;
  sortOrder?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryAllCategoriesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  filter?: InputMaybe<CategoryFilters>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  sortField?: InputMaybe<Scalars["String"]["input"]>;
  sortOrder?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryAllExperiencesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  filter?: InputMaybe<ExperienceFilters>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  sortField?: InputMaybe<Scalars["String"]["input"]>;
  sortOrder?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryAllLocationsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  sortField?: InputMaybe<Scalars["String"]["input"]>;
  sortOrder?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryAllLogsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  filter: LogFilters;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryAllMediaArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  sortField?: InputMaybe<Scalars["String"]["input"]>;
  sortOrder?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryAllOperatorsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  filter?: InputMaybe<OperatorFilters>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  sortField?: InputMaybe<Scalars["String"]["input"]>;
  sortOrder?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryAllPaymentsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  sortField?: InputMaybe<Scalars["String"]["input"]>;
  sortOrder?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryAllUsersArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  filter?: InputMaybe<UserFilters>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  sortField?: InputMaybe<Scalars["String"]["input"]>;
  sortOrder?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryBookingArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryCategoryArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
  path?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryExperienceArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryExperienceAvailableActivitiesArgs = {
  dateEnd?: InputMaybe<Scalars["Date"]["input"]>;
  dateStart?: InputMaybe<Scalars["Date"]["input"]>;
  id: Scalars["ID"]["input"];
};

export type QueryFilterExperiencesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  categories?: InputMaybe<Array<Scalars["String"]["input"]>>;
  dateEnd?: InputMaybe<Scalars["Date"]["input"]>;
  dateStart?: InputMaybe<Scalars["Date"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryLocationArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryLogArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryMediaArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryOperatorArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryPaymentArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryUserArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryAllActivitiesConnection = {
  __typename?: "QueryAllActivitiesConnection";
  edges: Array<Maybe<QueryAllActivitiesConnectionEdge>>;
  pageInfo: PageInfo;
};

export type QueryAllActivitiesConnectionEdge = {
  __typename?: "QueryAllActivitiesConnectionEdge";
  cursor: Scalars["String"]["output"];
  node: Activity;
};

export type QueryAllBookingsConnection = {
  __typename?: "QueryAllBookingsConnection";
  edges: Array<Maybe<QueryAllBookingsConnectionEdge>>;
  pageInfo: PageInfo;
};

export type QueryAllBookingsConnectionEdge = {
  __typename?: "QueryAllBookingsConnectionEdge";
  cursor: Scalars["String"]["output"];
  node: Booking;
};

export type QueryAllCategoriesConnection = {
  __typename?: "QueryAllCategoriesConnection";
  edges: Array<Maybe<QueryAllCategoriesConnectionEdge>>;
  pageInfo: PageInfo;
};

export type QueryAllCategoriesConnectionEdge = {
  __typename?: "QueryAllCategoriesConnectionEdge";
  cursor: Scalars["String"]["output"];
  node: Category;
};

export type QueryAllExperiencesConnection = {
  __typename?: "QueryAllExperiencesConnection";
  edges: Array<Maybe<QueryAllExperiencesConnectionEdge>>;
  pageInfo: PageInfo;
};

export type QueryAllExperiencesConnectionEdge = {
  __typename?: "QueryAllExperiencesConnectionEdge";
  cursor: Scalars["String"]["output"];
  node: Experience;
};

export type QueryAllLocationsConnection = {
  __typename?: "QueryAllLocationsConnection";
  edges: Array<Maybe<QueryAllLocationsConnectionEdge>>;
  pageInfo: PageInfo;
};

export type QueryAllLocationsConnectionEdge = {
  __typename?: "QueryAllLocationsConnectionEdge";
  cursor: Scalars["String"]["output"];
  node: Location;
};

export type QueryAllLogsConnection = {
  __typename?: "QueryAllLogsConnection";
  edges: Array<Maybe<QueryAllLogsConnectionEdge>>;
  pageInfo: PageInfo;
};

export type QueryAllLogsConnectionEdge = {
  __typename?: "QueryAllLogsConnectionEdge";
  cursor: Scalars["String"]["output"];
  node: Log;
};

export type QueryAllMediaConnection = {
  __typename?: "QueryAllMediaConnection";
  edges: Array<Maybe<QueryAllMediaConnectionEdge>>;
  pageInfo: PageInfo;
};

export type QueryAllMediaConnectionEdge = {
  __typename?: "QueryAllMediaConnectionEdge";
  cursor: Scalars["String"]["output"];
  node: Media;
};

export type QueryAllOperatorsConnection = {
  __typename?: "QueryAllOperatorsConnection";
  edges: Array<Maybe<QueryAllOperatorsConnectionEdge>>;
  pageInfo: PageInfo;
};

export type QueryAllOperatorsConnectionEdge = {
  __typename?: "QueryAllOperatorsConnectionEdge";
  cursor: Scalars["String"]["output"];
  node: Operator;
};

export type QueryAllPaymentsConnection = {
  __typename?: "QueryAllPaymentsConnection";
  edges: Array<Maybe<QueryAllPaymentsConnectionEdge>>;
  pageInfo: PageInfo;
};

export type QueryAllPaymentsConnectionEdge = {
  __typename?: "QueryAllPaymentsConnectionEdge";
  cursor: Scalars["String"]["output"];
  node: Payment;
};

export type QueryAllUsersConnection = {
  __typename?: "QueryAllUsersConnection";
  edges: Array<Maybe<QueryAllUsersConnectionEdge>>;
  pageInfo: PageInfo;
};

export type QueryAllUsersConnectionEdge = {
  __typename?: "QueryAllUsersConnectionEdge";
  cursor: Scalars["String"]["output"];
  node: User;
};

export type QueryCurrencyResultType = {
  __typename?: "QueryCurrencyResultType";
  idr: Scalars["Int"]["output"];
};

export type QueryFilterExperiencesConnection = {
  __typename?: "QueryFilterExperiencesConnection";
  edges: Array<Maybe<QueryFilterExperiencesConnectionEdge>>;
  pageInfo: PageInfo;
};

export type QueryFilterExperiencesConnectionEdge = {
  __typename?: "QueryFilterExperiencesConnectionEdge";
  cursor: Scalars["String"]["output"];
  node: Experience;
};

export type StartNewBooking = {
  activityId: Scalars["ID"]["input"];
  additionalInformation?: InputMaybe<Scalars["String"]["input"]>;
  /** Date of the booking */
  bookedDate: Scalars["Date"]["input"];
  email?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  telephone?: InputMaybe<Scalars["String"]["input"]>;
};

export type StartNewBookingResultType = {
  __typename?: "StartNewBookingResultType";
  bookingFlowToken: Scalars["String"]["output"];
  referenceCode: Scalars["String"]["output"];
};

export type UpdateBookingResultType = {
  __typename?: "UpdateBookingResultType";
  url: Scalars["String"]["output"];
};

export type UpdateExistingBooking = {
  activityId: Scalars["ID"]["input"];
  additionalInformation?: InputMaybe<Scalars["String"]["input"]>;
  /** Date of the booking */
  bookedDate: Scalars["Date"]["input"];
  bookingFlowToken: Scalars["String"]["input"];
  email?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  telephone?: InputMaybe<Scalars["String"]["input"]>;
};

export type User = {
  __typename?: "User";
  createdAt: Scalars["DateTimeISO"]["output"];
  deletedAt?: Maybe<Scalars["DateTimeISO"]["output"]>;
  email: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  role: Scalars["String"]["output"];
  updatedAt: Scalars["DateTimeISO"]["output"];
};

export type UserFilters = {
  ids?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  q?: InputMaybe<Scalars["String"]["input"]>;
};
