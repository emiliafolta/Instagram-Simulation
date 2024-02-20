import { ShapeType } from "@ldo/ldo";
import { solidProfileSchema } from "./solidProfile.schema";
import { solidProfileContext } from "./solidProfile.context";
import {
  SolidProfileShape,
  Category,
  CategoryLikes,
} from "./solidProfile.typings";

/**
 * =============================================================================
 * LDO ShapeTypes solidProfile
 * =============================================================================
 */

/**
 * SolidProfileShape ShapeType
 */
export const SolidProfileShapeShapeType: ShapeType<SolidProfileShape> = {
  schema: solidProfileSchema,
  shape: "https://shaperepo.com/schemas/solidProfile#SolidProfileShape",
  context: solidProfileContext,
};

/**
 * Category ShapeType
 */
export const CategoryShapeType: ShapeType<Category> = {
  schema: solidProfileSchema,
  shape: "https://shaperepo.com/schemas/solidProfile#Category",
  context: solidProfileContext,
};

/**
 * CategoryLikes ShapeType
 */
export const CategoryLikesShapeType: ShapeType<CategoryLikes> = {
  schema: solidProfileSchema,
  shape: "https://shaperepo.com/schemas/solidProfile#CategoryLikes",
  context: solidProfileContext,
};
