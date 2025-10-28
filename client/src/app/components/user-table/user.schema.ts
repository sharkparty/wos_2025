import Ajv from "ajv";
import { JTDDataType } from "ajv/dist/jtd";
import formats from "ajv-formats";

const ajv = new Ajv();

formats(ajv);

export const userSchema = {
  type: "object",
  properties: {
    id: {
      description: "The unique identifier for the user.",
      type: "string",
      format: "uuid",
    },
    createdAt: {
      description: "The timestamp when the record was created (ISO 8601).",
      type: "string",
      format: "date-time",
    },
    updatedAt: {
      description: "The timestamp when the record was last updated (ISO 8601).",
      type: "string",
      format: "date-time",
    },
    first: {
      description: "The user's first name.",
      type: "string",
      minLength: 1,
    },
    last: {
      description: "The user's last name.",
      type: "string",
      minLength: 1,
    },
    roleId: {
      description: "The unique identifier for the user's role.",
      type: "string",
      format: "uuid",
    },
    role: {
      description: "The friendly name for the user's role.",
      type: "string",
      minLength: 1,
    },
    photo: {
      description: "A URL pointing to the user's profile photo.",
      type: "string",
      format: "url",
    },
  },
  required: [
    "id",
    // "createdAt",
    // "updatedAt",
    // "first",
    // "last",
    // "roleId",
    // "photo",
  ],
} as const;

export type UserSchema = JTDDataType<typeof userSchema>;

export const userCollection = {
  title: "User Collection",
  description: "Schema for an array (collection) of user objects.",
  type: "array",
  items: userSchema,
} as const;

export type UserSchemaCollection = JTDDataType<typeof userCollection>;

export const validateUserCollection = ajv.compile(userCollection);
