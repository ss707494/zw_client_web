import { Maybe } from "../graphqlTypes/types";

export const ls = (key: Maybe<string>) => key ?? ''
