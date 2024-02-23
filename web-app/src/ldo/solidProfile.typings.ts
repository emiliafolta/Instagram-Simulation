import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * Typescript Typings for solidProfile
 * =============================================================================
 */

/**
 * SolidProfileShape Type
 */
export interface SolidProfileShape {
  "@id"?: string;
  "@context"?: ContextDefinition;
  /**
   * Defines the node as a Person (from foaf)
   */
  type: {
    "@id": "Person";
  };
  /**
   * Define a person's name.
   */
  name?: string;
  /**
   * User's username which is the Solid webID
   */
  username: string;
  /**
   * User's location (optional)
   */
  location?: string;
  /**
   * User's age (optional)
   */
  age?: number;
  /**
   * User's gender (optional)
   */
  gender?: string;
  /**
   * A list of categories that the user selected as their interests
   */
  categories?: Category[];
  /**
   * A list of categories that the user liked and the number of likes
   */
  likedCategories?: CategoryLikes[];
  /**
   * The location of a Solid storage server related to this WebId
   */
  storage?: {
    "@id": string;
  }[];
  /**
   * The user's account
   */
  account?: {
    "@id": string;
  };
  /**
   * A registry of all types used on the user's Pod (for private access only)
   */
  privateTypeIndex?: {
    "@id": string;
  }[];
  /**
   * A registry of all types used on the user's Pod (for public access)
   */
  publicTypeIndex?: {
    "@id": string;
  }[];
}

/**
 * Category Type
 */
export interface Category {
  "@id"?: string;
  "@context"?: ContextDefinition;
}

/**
 * CategoryLikes Type
 */
export interface CategoryLikes {
  "@id"?: string;
  "@context"?: ContextDefinition;
  categoryName: string;
  likes: number;
}
