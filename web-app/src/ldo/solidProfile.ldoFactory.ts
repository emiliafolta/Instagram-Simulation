import { LdoFactory } from "ldo";
import {
  SolidProfileShapeShapeType,
  CategoryShapeType,
  CategoryLikesShapeType,
} from "./solidProfile.shapeTypes";

/**
 * =============================================================================
 * LDO Factories for solidProfile
 * =============================================================================
 */

/**
 * SolidProfileShape LdoFactory
 */
export const SolidProfileShapeFactory = new LdoFactory(
  SolidProfileShapeShapeType
);

/**
 * Category LdoFactory
 */
export const CategoryFactory = new LdoFactory(CategoryShapeType);

/**
 * CategoryLikes LdoFactory
 */
export const CategoryLikesFactory = new LdoFactory(CategoryLikesShapeType);
