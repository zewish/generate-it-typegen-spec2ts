import schema2type from './schema2type';

const mockObjectSchema = {
  type: 'object',
  required: [
    'prop2',
    'prop3',
    'prop4'
  ],
  properties: {
    prop1: {
      type: 'string'
    },
    prop2: {
      type: 'string',
      format: 'date-time'
    },
    prop3: {
      type: 'string',
      nullable: true
    },
    prop4: {
      type: ''
    }
  }
};

describe('schema2type', () => {
  it('transforms an object', async () => {
    expect(await schema2type(
      'MyObjectOne',
      JSON.stringify(mockObjectSchema),
      {} as any
    )).toEqual({
      outputString: (
        '\nexport type MyObjectOne = {'
        + '\n    prop1?: string;'
        + '\n    prop2: Date;'
        + '\n    prop3: string | null;'
        + '\n    prop4: any;'
        + '\n};\n\n'
      )
    });
  });

  it('it respects nodegenrc overrides', async () => {
    expect(await schema2type(
      'MyObjectTwo',
      JSON.stringify({
        ...mockObjectSchema,
        prop4: {
          type: 'array'
        }
      }),
      {
        nodegenRc: {
          typegenOptions: {
            avoidAny: true,
            enableDate: false
          }
        }
      } as any
    )).toEqual({
      outputString: (
        '\nexport type MyObjectTwo = {'
        + '\n    prop1?: string;'
        + '\n    prop2: string;'
        + '\n    prop3: string | null;'
        + '\n    prop4: unknown;'
        + '\n};\n\n'
      )
    });
  });

  it('transforms an array', async () => {
    expect(await schema2type(
      'ArrayOne',
      JSON.stringify({
        type: 'array',
        items: {
          type: 'number'
        }
      }),
      {} as any
    )).toEqual({
      outputString: (
        '\nexport type ArrayOne = number[];\n\n'
      )
    });
  });


  it('does not break on empty schema', async () => {
    expect(await schema2type(
      'BrokenJson',
      '',
      {} as any
    )).toEqual({
      outputString: (
        '\nexport type BrokenJson = any;\n\n'
      )
    });
  });
});
