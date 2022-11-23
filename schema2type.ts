import ts from 'typescript';
import { createContext, getTypeFromSchema, ParserOptions } from '@spec2ts/jsonschema/lib/core-parser.js';
import { TypegenFunction } from 'generate-it';

const LINEBREAK = '\n';

const schema2type: TypegenFunction = async (
  name,
  schema,
  config
) => {
  const parsedSchema = schema ? JSON.parse(schema) : {};
  const typegenOptions: ParserOptions = (config?.nodegenRc as any)?.typegenOptions || {
    enableDate: true
  };

  const context = await createContext(parsedSchema, typegenOptions);
  const file = ts.createSourceFile('types.ts', '', ts.ScriptTarget.Latest, false, ts.ScriptKind.TS);
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  const typeDef = printer.printNode(
    ts.EmitHint.Unspecified,
    getTypeFromSchema(
      parsedSchema,
      context
    ),
    file
  );

  return {
    outputString: `${LINEBREAK}export type ${name} = ${typeDef};${LINEBREAK}${LINEBREAK}`
  };
};

export default schema2type;
