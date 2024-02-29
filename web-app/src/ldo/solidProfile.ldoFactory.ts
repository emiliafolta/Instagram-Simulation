import { LdoFactory } from "ldo";
import {
  SolidProfileShapeShapeType,
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
 * CategoryLikes LdoFactory
 */
export const CategoryLikesFactory = new LdoFactory(CategoryLikesShapeType);
