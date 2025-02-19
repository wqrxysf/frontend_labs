import { EditorType } from "./EditorType";
import Ajv from "ajv";
import { defaultData } from "./defaultData";

const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    presentation: {
      type: "object",
      properties: {
        title: { type: "string" },
        slideCollection: {
          type: "object",
          properties: {
            slides: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  background: {
                    oneOf: [
                      {
                        type: "object",
                        properties: {
                          color: { type: "string" },
                          type: { type: "string", enum: ["solid"] },
                        },
                        required: ["color", "type"],
                      },
                      {
                        type: "object",
                        properties: {
                          src: { type: "string" },
                          type: { type: "string", enum: ["image"] },
                        },
                        required: ["src", "type"],
                      },
                    ],
                  },
                  contents: {
                    type: "array",
                    items: {
                      oneOf: [
                        {
                          type: "object",
                          properties: {
                            type: { type: "string", enum: ["text"] },
                            contentId: { type: "string" },
                            x: { type: "number" },
                            y: { type: "number" },
                            width: { type: "number" },
                            height: { type: "number" },
                            field: { type: "string" },
                            fontSize: { type: "number" },
                            fontFamily: { type: "string" },
                          },
                          required: ["type", "contentId", "x", "y", "field"],
                        },
                        {
                          type: "object",
                          properties: {
                            type: { type: "string", enum: ["image"] },
                            contentId: { type: "string" },
                            x: { type: "number" },
                            y: { type: "number" },
                            width: { type: "number" },
                            height: { type: "number" },
                            src: { type: "string" },
                          },
                          required: ["type", "contentId", "x", "y", "src"],
                        },
                      ],
                    },
                  },
                },
                required: ["id", "background", "contents"],
              },
            },
          },
          required: ["slides"],
        },
      },
      required: ["title"],
    },
    selection: {
      type: "object",
      properties: {
        selectedSlideId: { type: "string" },
        selectedContentId: { type: "string" },
      },
    },
  },
  required: ["presentation"],
  additionalProperties: false,
};

const validate = ajv.compile(schema);

function importPresentation(editorData: string): EditorType {
  console.log("import");

  try {
    const jsonData = JSON.parse(editorData);

    const valid = validate(jsonData);
    if (!valid) {
      console.error("Ошибка валидации:", validate.errors);
      return defaultData;
    }

    return jsonData;
  } catch (error) {
    console.error("Ошибка при импорте редактора:", error);
    return defaultData;
  }
}

export { importPresentation, schema };
