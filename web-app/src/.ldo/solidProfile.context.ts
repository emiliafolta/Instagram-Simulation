import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * solidProfileContext: JSONLD Context for solidProfile
 * =============================================================================
 */
export const solidProfileContext: ContextDefinition = {
  username: {
    "@id": "https://shaperepo.com/schemas/solidProfile#username",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  location: {
    "@id": "https://shaperepo.com/schemas/solidProfile#location",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  age: {
    "@id": "https://shaperepo.com/schemas/solidProfile#age",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  gender: {
    "@id": "https://shaperepo.com/schemas/solidProfile#gender",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  categories: {
    "@id": "https://shaperepo.com/schemas/solidProfile#categories",
    "@type": "@id",
    "@container": "@set",
  },
  categoryName: {
    "@id": "https://shaperepo.com/schemas/solidProfile#category_name",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  likedCategories: {
    "@id": "https://shaperepo.com/schemas/solidProfile#liked_categories",
    "@type": "@id",
    "@container": "@set",
  },
  likes: {
    "@id": "https://shaperepo.com/schemas/solidProfile#likes",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  storage: {
    "@id": "http://www.w3.org/ns/pim/space#storage",
    "@type": "@id",
    "@container": "@set",
  },
  account: {
    "@id": "http://www.w3.org/ns/solid/terms#account",
    "@type": "@id",
  },
  privateTypeIndex: {
    "@id": "http://www.w3.org/ns/solid/terms#privateTypeIndex",
    "@type": "@id",
    "@container": "@set",
  },
  publicTypeIndex: {
    "@id": "http://www.w3.org/ns/solid/terms#publicTypeIndex",
    "@type": "@id",
    "@container": "@set",
  },
};
