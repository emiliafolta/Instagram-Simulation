import { ShapeType } from "ldo";
import { solidProfileSchema } from "./solidProfile.schema";
import { solidProfileContext } from "./solidProfile.context";
import { SolidProfileShape, CategoryLikes } from "./solidProfile.typings";

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
 * CategoryLikes ShapeType
 */
export const CategoryLikesShapeType: ShapeType<CategoryLikes> = {
  schema: solidProfileSchema,
  shape: "https://shaperepo.com/schemas/solidProfile#CategoryLikes",
  context: solidProfileContext,
};
