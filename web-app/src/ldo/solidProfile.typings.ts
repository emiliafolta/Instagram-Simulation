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
  webId: string;
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
  gender?: number;
  /**
   * A list of categories that the user selected as their interests
   */
  userSelectedCategories?: string[];
  /**
   * A list of categories that the user liked and the number of likes
   */
  categoryInteractions?: CategoryLikes[];
  /**
   * A list of strings which specify the category index and number of likes
   */
  categoryLikes?: string[];
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
 * CategoryLikes Type
 */
export interface CategoryLikes {
  "@id"?: string;
  "@context"?: ContextDefinition;
  categoryName: string;
  likes: number;
}
