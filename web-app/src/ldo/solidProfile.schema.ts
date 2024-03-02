import { Schema } from "shexj";

/**
 * =============================================================================
 * solidProfileSchema: ShexJ Schema for solidProfile
 * =============================================================================
 */
export const solidProfileSchema: Schema = {
  type: "Schema",
  shapes: [
    {
      id: "https://shaperepo.com/schemas/solidProfile#SolidProfileShape",
      type: "Shape",
      expression: {
        type: "EachOf",
        expressions: [
          {
            type: "TripleConstraint",
            predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
            valueExpr: {
              type: "NodeConstraint",
              values: ["http://xmlns.com/foaf/0.1/Person"],
            },
            annotations: [
              {
                type: "Annotation",
                predicate: "http://www.w3.org/2000/01/rdf-schema#comment",
                object: {
                  value: "Defines the node as a Person (from foaf)",
                },
              },
            ],
          },
          {
            type: "TripleConstraint",
            predicate: "http://xmlns.com/foaf/0.1/name",
            valueExpr: {
              type: "NodeConstraint",
              datatype: "http://www.w3.org/2001/XMLSchema#string",
            },
            min: 0,
            max: 1,
            annotations: [
              {
                type: "Annotation",
                predicate: "http://www.w3.org/2000/01/rdf-schema#comment",
                object: {
                  value: "Define a person's name.",
                },
              },
            ],
          },
          {
            type: "TripleConstraint",
            predicate: "https://shaperepo.com/schemas/solidProfile#web_id",
            valueExpr: {
              type: "NodeConstraint",
              datatype: "http://www.w3.org/2001/XMLSchema#string",
            },
            annotations: [
              {
                type: "Annotation",
                predicate: "http://www.w3.org/2000/01/rdf-schema#comment",
                object: {
                  value: "User's username which is the Solid webID",
                },
              },
            ],
          },
          {
            type: "TripleConstraint",
            predicate: "https://shaperepo.com/schemas/solidProfile#location",
            valueExpr: {
              type: "NodeConstraint",
              datatype: "http://www.w3.org/2001/XMLSchema#string",
            },
            min: 0,
            max: 1,
            annotations: [
              {
                type: "Annotation",
                predicate: "http://www.w3.org/2000/01/rdf-schema#comment",
                object: {
                  value: "User's location (optional)",
                },
              },
            ],
          },
          {
            type: "TripleConstraint",
            predicate: "https://shaperepo.com/schemas/solidProfile#age",
            valueExpr: {
              type: "NodeConstraint",
              datatype: "http://www.w3.org/2001/XMLSchema#integer",
            },
            min: 0,
            max: 1,
            annotations: [
              {
                type: "Annotation",
                predicate: "http://www.w3.org/2000/01/rdf-schema#comment",
                object: {
                  value: "User's age (optional)",
                },
              },
            ],
          },
          {
            type: "TripleConstraint",
            predicate: "https://shaperepo.com/schemas/solidProfile#gender",
            valueExpr: {
              type: "NodeConstraint",
              datatype: "http://www.w3.org/2001/XMLSchema#integer",
            },
            min: 0,
            max: 1,
            annotations: [
              {
                type: "Annotation",
                predicate: "http://www.w3.org/2000/01/rdf-schema#comment",
                object: {
                  value: "User's gender (optional)",
                },
              },
            ],
          },
          {
            type: "TripleConstraint",
            predicate:
              "https://shaperepo.com/schemas/solidProfile#user_selected_categories",
            valueExpr: {
              type: "NodeConstraint",
              datatype: "http://www.w3.org/2001/XMLSchema#string",
            },
            min: 0,
            max: -1,
            annotations: [
              {
                type: "Annotation",
                predicate: "http://www.w3.org/2000/01/rdf-schema#comment",
                object: {
                  value:
                    "A list of categories that the user selected as their interests",
                },
              },
            ],
          },
          {
            type: "TripleConstraint",
            predicate:
              "https://shaperepo.com/schemas/solidProfile#category_interactions",
            valueExpr:
              "https://shaperepo.com/schemas/solidProfile#CategoryLikes",
            min: 0,
            max: -1,
            annotations: [
              {
                type: "Annotation",
                predicate: "http://www.w3.org/2000/01/rdf-schema#comment",
                object: {
                  value:
                    "A list of categories that the user liked and the number of likes",
                },
              },
            ],
          },
          {
            type: "TripleConstraint",
            predicate: "http://www.w3.org/ns/pim/space#storage",
            valueExpr: {
              type: "NodeConstraint",
              nodeKind: "iri",
            },
            min: 0,
            max: -1,
            annotations: [
              {
                type: "Annotation",
                predicate: "http://www.w3.org/2000/01/rdf-schema#comment",
                object: {
                  value:
                    "The location of a Solid storage server related to this WebId",
                },
              },
            ],
          },
          {
            type: "TripleConstraint",
            predicate: "http://www.w3.org/ns/solid/terms#account",
            valueExpr: {
              type: "NodeConstraint",
              nodeKind: "iri",
            },
            min: 0,
            max: 1,
            annotations: [
              {
                type: "Annotation",
                predicate: "http://www.w3.org/2000/01/rdf-schema#comment",
                object: {
                  value: "The user's account",
                },
              },
            ],
          },
          {
            type: "TripleConstraint",
            predicate: "http://www.w3.org/ns/solid/terms#privateTypeIndex",
            valueExpr: {
              type: "NodeConstraint",
              nodeKind: "iri",
            },
            min: 0,
            max: -1,
            annotations: [
              {
                type: "Annotation",
                predicate: "http://www.w3.org/2000/01/rdf-schema#comment",
                object: {
                  value:
                    "A registry of all types used on the user's Pod (for private access only)",
                },
              },
            ],
          },
          {
            type: "TripleConstraint",
            predicate: "http://www.w3.org/ns/solid/terms#publicTypeIndex",
            valueExpr: {
              type: "NodeConstraint",
              nodeKind: "iri",
            },
            min: 0,
            max: -1,
            annotations: [
              {
                type: "Annotation",
                predicate: "http://www.w3.org/2000/01/rdf-schema#comment",
                object: {
                  value:
                    "A registry of all types used on the user's Pod (for public access)",
                },
              },
            ],
          },
        ],
      },
      extra: ["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"],
    },
    {
      id: "https://shaperepo.com/schemas/solidProfile#CategoryLikes",
      type: "Shape",
      expression: {
        type: "EachOf",
        expressions: [
          {
            type: "TripleConstraint",
            predicate:
              "https://shaperepo.com/schemas/solidProfile#category_name",
            valueExpr: {
              type: "NodeConstraint",
              datatype: "http://www.w3.org/2001/XMLSchema#string",
            },
          },
          {
            type: "TripleConstraint",
            predicate: "https://shaperepo.com/schemas/solidProfile#likes",
            valueExpr: {
              type: "NodeConstraint",
              datatype: "http://www.w3.org/2001/XMLSchema#integer",
            },
          },
        ],
      },
    },
  ],
};
