import { Maybe } from "../graphqlTypes/types";

export const ll = (key: Maybe<string> | undefined) => key ?? ''
