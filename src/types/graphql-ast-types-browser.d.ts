declare module 'graphql-ast-types-browser' {
  import {
    NameNode,
    DocumentNode,
    OperationDefinitionNode,
    VariableDefinitionNode,
    VariableNode,
    SelectionSetNode,
    FieldNode,
    ArgumentNode,
    FragmentSpreadNode,
    InlineFragmentNode,
    FragmentDefinitionNode,
    IntValueNode,
    FloatValueNode,
    StringValueNode,
    BooleanValueNode,
    NullValueNode,
    EnumValueNode,
    ListValueNode,
    ObjectValueNode,
    ObjectFieldNode,
    DirectiveNode,
    NamedTypeNode,
    ListTypeNode,
    NonNullTypeNode,
    SchemaDefinitionNode,
    OperationTypeDefinitionNode,
    ScalarTypeDefinitionNode,
    ObjectTypeDefinitionNode,
    FieldDefinitionNode,
    InputValueDefinitionNode,
    InterfaceTypeDefinitionNode,
    UnionTypeDefinitionNode,
    EnumTypeDefinitionNode,
    EnumValueDefinitionNode,
    InputObjectTypeDefinitionNode,
    TypeExtensionDefinitionNode,
    DirectiveDefinitionNode,
    OperationTypeNode,
  } from 'graphql';

  export function isAST(node: any): boolean;
  export function assertAST(node: any): boolean;

  export function isDefinition(node: any): boolean;
  export function assertDefinition(node: any): boolean;

  export function isValue(node: any): boolean;
  export function assertValue(node: any): boolean;

  export function isSelection(node: any): boolean;
  export function assertSelection(node: any): boolean;

  export function isType(node: any): boolean;
  export function assertType(node: any): boolean;

  export function isTypeSystemDefinition(node: any): boolean;
  export function assertTypeSystemDefinition(node: any): boolean;

  export function isTypeDefinition(node: any): boolean;
  export function assertTypeDefinition(node: any): boolean;

  export function name(value: string): NameNode;
  export function isName(node: any): boolean;
  export function assertName(node: any): void;

  export function document(definitions: Array<any>): DocumentNode;
  export function isDocument(node: any): boolean;
  export function assertDocument(node: any): void;

  export function operationDefinition(
    operation: OperationTypeNode | string,
    selectionSet: SelectionSetNode,
    name?: NameNode,
    variableDefinitions?: Array<VariableDefinitionNode>,
    directives?: Array<DirectiveNode>
  ): OperationDefinitionNode;
  export function isOperationDefinition(node: any): boolean;
  export function assertOperationDefinition(node: any): void;

  export function variableDefinition(
    variable: VariableNode,
    type: NamedTypeNode,
    defaultValue?: any
  ): VariableDefinitionNode;
  export function isVariableDefinition(node: any): boolean;
  export function assertVariableDefinition(node: any): void;

  export function variable(name: NameNode): VariableNode;
  export function isVariable(node: any): boolean;
  export function assertVariable(node: any): void;

  export function selectionSet(selections: Array<any>): SelectionSetNode;
  export function isSelectionSet(node: any): boolean;
  export function assertSelectionSet(node: any): void;

  export function field(
    name: NameNode,
    alias?: NameNode,
    args?: Array<ArgumentNode>,
    directives?: Array<DirectiveNode>,
    selectionSet?: SelectionSetNode
  ): FieldNode;
  export function isField(node: any): boolean;
  export function assertField(node: any): void;

  export function argument(name: NameNode, value: any): ArgumentNode;
  export function isArgument(node: any): boolean;
  export function assertArgument(node: any): void;

  export function fragmentSpread(
    name: NameNode,
    directives?: Array<DirectiveNode>
  ): FragmentSpreadNode;
  export function isFragmentSpread(node: any): boolean;
  export function assertFragmentSpread(node: any): void;

  export function inlineFragment(
    selectionSet: SelectionSetNode,
    typeCondition?: NamedTypeNode,
    directives?: Array<DirectiveNode>
  ): InlineFragmentNode;
  export function isInlineFragment(node: any): boolean;
  export function assertInlineFragment(node: any): void;

  export function fragmentDefinition(
    name: NameNode,
    typeCondition: NamedTypeNode,
    selectionSet: SelectionSetNode,
    directives?: Array<DirectiveNode>
  ): FragmentDefinitionNode;
  export function isFragmentDefinition(node: any): boolean;
  export function assertFragmentDefinition(node: any): void;

  export function intValue(value: string): IntValueNode;
  export function isIntValue(node: any): boolean;
  export function assertIntValue(node: any): void;

  export function floatValue(value: string): FloatValueNode;
  export function isFloatValue(node: any): boolean;
  export function assertFloatValue(node: any): void;

  export function stringValue(value: string): StringValueNode;
  export function isStringValue(node: any): boolean;
  export function assertStringValue(node: any): void;

  export function booleanValue(value: boolean): BooleanValueNode;
  export function isBooleanValue(node: any): boolean;
  export function assertBooleanValue(node: any): void;

  export function nullValue(): NullValueNode;
  export function isNullValue(node: any): boolean;
  export function assertNullValue(node: any): void;

  export function enumValue(value: string): EnumValueNode;
  export function isEnumValue(node: any): boolean;
  export function assertEnumValue(node: any): void;

  export function listValue(values: Array<any>): ListValueNode;
  export function isListValue(node: any): boolean;
  export function assertListValue(node: any): void;

  export function objectValue(fields: Array<any>): ObjectValueNode;
  export function isObjectValue(node: any): boolean;
  export function assertObjectValue(node: any): void;

  export function objectField(name: NameNode, value: any): ObjectFieldNode;
  export function isObjectField(node: any): boolean;
  export function assertObjectField(node: any): void;

  export function directive(
    name: NameNode,
    args?: Array<ArgumentNode>
  ): DirectiveNode;
  export function isDirective(node: any): boolean;
  export function assertDirective(node: any): void;

  export function namedType(name: NameNode): NamedTypeNode;
  export function isNamedType(node: any): boolean;
  export function assertNamedType(node: any): void;

  export function listType(type: NamedTypeNode): ListTypeNode;
  export function isListType(node: any): boolean;
  export function assertListType(node: any): void;

  export function nonNullType(type: NamedTypeNode): NonNullTypeNode;
  export function isNonNullType(node: any): boolean;
  export function assertNonNullType(node: any): void;

  export function schemaDefinition(
    directives: Array<DirectiveNode>,
    operationTypes: Array<OperationTypeDefinitionNode>
  ): SchemaDefinitionNode;
  export function isSchemaDefinition(node: any): boolean;
  export function assertSchemaDefinition(node: any): void;

  export function operationTypeDefinition(
    operation: OperationTypeNode,
    type: NamedTypeNode
  ): OperationTypeDefinitionNode;
  export function isOperationTypeDefinition(node: any): boolean;
  export function assertOperationTypeDefinition(node: any): void;

  export function scalarTypeDefinition(
    name: NameNode,
    directives?: Array<DirectiveNode>
  ): ScalarTypeDefinitionNode;
  export function isScalarTypeDefinition(node: any): boolean;
  export function assertScalarTypeDefinition(node: any): void;

  export function objectTypeDefinition(
    name: NameNode,
    fields: Array<FieldDefinitionNode>,
    interfaces?: Array<NamedTypeNode>,
    directives?: Array<DirectiveNode>
  ): ObjectTypeDefinitionNode;
  export function isObjectTypeDefinition(node: any): boolean;
  export function assertObjectTypeDefinition(node: any): void;

  export function fieldDefinition(
    name: NameNode,
    args: Array<InputValueDefinitionNode>,
    type: NamedTypeNode,
    directives?: Array<DirectiveNode>
  ): FieldDefinitionNode;
  export function isFieldDefinition(node: any): boolean;
  export function assertFieldDefinition(node: any): void;

  export function inputValueDefinition(
    name: NameNode,
    type: NamedTypeNode,
    defaultValue?: any,
    directives?: Array<DirectiveNode>
  ): InputValueDefinitionNode;
  export function isInputValueDefinition(node: any): boolean;
  export function assertInputValueDefinition(node: any): void;

  export function interfaceTypeDefinition(
    name: NameNode,
    fields: Array<FieldDefinitionNode>,
    directives?: Array<DirectiveNode>
  ): InterfaceTypeDefinitionNode;
  export function isInterfaceTypeDefinition(node: any): boolean;
  export function assertInterfaceTypeDefinition(node: any): void;

  export function unionTypeDefinition(
    name: NameNode,
    types: Array<NamedTypeNode>,
    directives?: Array<DirectiveNode>
  ): UnionTypeDefinitionNode;
  export function isUnionTypeDefinition(node: any): boolean;
  export function assertUnionTypeDefinition(node: any): void;

  export function enumTypeDefinition(
    name: NameNode,
    values: Array<EnumValueDefinitionNode>,
    directives?: Array<DirectiveNode>
  ): EnumTypeDefinitionNode;
  export function isEnumTypeDefinition(node: any): boolean;
  export function assertEnumTypeDefinition(node: any): void;

    export function enumValueDefinition(
    name: NameNode,
    directives?: Array<DirectiveNode>
  ): EnumValueDefinitionNode;
  export function isEnumValueDefinition(node: any): boolean;
  export function assertEnumValueDefinition(node: any): void;

  export function inputObjectTypeDefinition(
    name: NameNode,
    fields: Array<InputValueDefinitionNode>,
    directives?: Array<DirectiveNode>
  ): InputObjectTypeDefinitionNode;
  export function isInputObjectTypeDefinition(node: any): boolean;
  export function assertInputObjectTypeDefinition(node: any): void;

  export function typeExtensionDefinition(
    definition: ObjectTypeDefinitionNode
  ): TypeExtensionDefinitionNode;
  export function isTypeExtensionDefinition(node: any): boolean;
  export function assertTypeExtensionDefinition(node: any): void;

  export function directiveDefinition(
    name: NameNode,
    locations: Array<any>,
    args?: Array<InputValueDefinitionNode>
  ): DirectiveDefinitionNode;
  export function isDirectiveDefinition(node: any): boolean;
  export function assertDirectiveDefinition(node: any): void;
}
