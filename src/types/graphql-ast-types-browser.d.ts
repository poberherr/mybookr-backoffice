declare module "graphql-ast-types-browser" {
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
  } from "graphql";

  export function isAST(node: unknown): boolean;
  export function assertAST(node: unknown): boolean;

  export function isDefinition(node: unknown): boolean;
  export function assertDefinition(node: unknown): boolean;

  export function isValue(node: unknown): boolean;
  export function assertValue(node: unknown): boolean;

  export function isSelection(node: unknown): boolean;
  export function assertSelection(node: unknown): boolean;

  export function isType(node: unknown): boolean;
  export function assertType(node: unknown): boolean;

  export function isTypeSystemDefinition(node: unknown): boolean;
  export function assertTypeSystemDefinition(node: unknown): boolean;

  export function isTypeDefinition(node: unknown): boolean;
  export function assertTypeDefinition(node: unknown): boolean;

  export function name(value: string): NameNode;
  export function isName(node: unknown): boolean;
  export function assertName(node: unknown): void;

  export function document(definitions: Array<unknown>): DocumentNode;
  export function isDocument(node: unknown): boolean;
  export function assertDocument(node: unknown): void;

  export function operationDefinition(
    operation: OperationTypeNode | string,
    selectionSet: SelectionSetNode,
    name?: NameNode,
    variableDefinitions?: Array<VariableDefinitionNode>,
    directives?: Array<DirectiveNode>,
  ): OperationDefinitionNode;
  export function isOperationDefinition(node: unknown): boolean;
  export function assertOperationDefinition(node: unknown): void;

  export function variableDefinition(
    variable: VariableNode,
    type: NamedTypeNode,
    defaultValue?: unknown,
  ): VariableDefinitionNode;
  export function isVariableDefinition(node: unknown): boolean;
  export function assertVariableDefinition(node: unknown): void;

  export function variable(name: NameNode): VariableNode;
  export function isVariable(node: unknown): boolean;
  export function assertVariable(node: unknown): void;

  export function selectionSet(selections: Array<unknown>): SelectionSetNode;
  export function isSelectionSet(node: unknown): boolean;
  export function assertSelectionSet(node: unknown): void;

  export function field(
    name: NameNode,
    alias?: NameNode,
    args?: Array<ArgumentNode>,
    directives?: Array<DirectiveNode>,
    selectionSet?: SelectionSetNode,
  ): FieldNode;
  export function isField(node: unknown): boolean;
  export function assertField(node: unknown): void;

  export function argument(name: NameNode, value: unknown): ArgumentNode;
  export function isArgument(node: unknown): boolean;
  export function assertArgument(node: unknown): void;

  export function fragmentSpread(
    name: NameNode,
    directives?: Array<DirectiveNode>,
  ): FragmentSpreadNode;
  export function isFragmentSpread(node: unknown): boolean;
  export function assertFragmentSpread(node: unknown): void;

  export function inlineFragment(
    selectionSet: SelectionSetNode,
    typeCondition?: NamedTypeNode,
    directives?: Array<DirectiveNode>,
  ): InlineFragmentNode;
  export function isInlineFragment(node: unknown): boolean;
  export function assertInlineFragment(node: unknown): void;

  export function fragmentDefinition(
    name: NameNode,
    typeCondition: NamedTypeNode,
    selectionSet: SelectionSetNode,
    directives?: Array<DirectiveNode>,
  ): FragmentDefinitionNode;
  export function isFragmentDefinition(node: unknown): boolean;
  export function assertFragmentDefinition(node: unknown): void;

  export function intValue(value: string): IntValueNode;
  export function isIntValue(node: unknown): boolean;
  export function assertIntValue(node: unknown): void;

  export function floatValue(value: string): FloatValueNode;
  export function isFloatValue(node: unknown): boolean;
  export function assertFloatValue(node: unknown): void;

  export function stringValue(value: string): StringValueNode;
  export function isStringValue(node: unknown): boolean;
  export function assertStringValue(node: unknown): void;

  export function booleanValue(value: boolean): BooleanValueNode;
  export function isBooleanValue(node: unknown): boolean;
  export function assertBooleanValue(node: unknown): void;

  export function nullValue(): NullValueNode;
  export function isNullValue(node: unknown): boolean;
  export function assertNullValue(node: unknown): void;

  export function enumValue(value: string): EnumValueNode;
  export function isEnumValue(node: unknown): boolean;
  export function assertEnumValue(node: unknown): void;

  export function listValue(values: Array<unknown>): ListValueNode;
  export function isListValue(node: unknown): boolean;
  export function assertListValue(node: unknown): void;

  export function objectValue(fields: Array<unknown>): ObjectValueNode;
  export function isObjectValue(node: unknown): boolean;
  export function assertObjectValue(node: unknown): void;

  export function objectField(name: NameNode, value: unknown): ObjectFieldNode;
  export function isObjectField(node: unknown): boolean;
  export function assertObjectField(node: unknown): void;

  export function directive(
    name: NameNode,
    args?: Array<ArgumentNode>,
  ): DirectiveNode;
  export function isDirective(node: unknown): boolean;
  export function assertDirective(node: unknown): void;

  export function namedType(name: NameNode): NamedTypeNode;
  export function isNamedType(node: unknown): boolean;
  export function assertNamedType(node: unknown): void;

  export function listType(type: NamedTypeNode): ListTypeNode;
  export function isListType(node: unknown): boolean;
  export function assertListType(node: unknown): void;

  export function nonNullType(type: NamedTypeNode): NonNullTypeNode;
  export function isNonNullType(node: unknown): boolean;
  export function assertNonNullType(node: unknown): void;

  export function schemaDefinition(
    directives: Array<DirectiveNode>,
    operationTypes: Array<OperationTypeDefinitionNode>,
  ): SchemaDefinitionNode;
  export function isSchemaDefinition(node: unknown): boolean;
  export function assertSchemaDefinition(node: unknown): void;

  export function operationTypeDefinition(
    operation: OperationTypeNode,
    type: NamedTypeNode,
  ): OperationTypeDefinitionNode;
  export function isOperationTypeDefinition(node: unknown): boolean;
  export function assertOperationTypeDefinition(node: unknown): void;

  export function scalarTypeDefinition(
    name: NameNode,
    directives?: Array<DirectiveNode>,
  ): ScalarTypeDefinitionNode;
  export function isScalarTypeDefinition(node: unknown): boolean;
  export function assertScalarTypeDefinition(node: unknown): void;

  export function objectTypeDefinition(
    name: NameNode,
    fields: Array<FieldDefinitionNode>,
    interfaces?: Array<NamedTypeNode>,
    directives?: Array<DirectiveNode>,
  ): ObjectTypeDefinitionNode;
  export function isObjectTypeDefinition(node: unknown): boolean;
  export function assertObjectTypeDefinition(node: unknown): void;

  export function fieldDefinition(
    name: NameNode,
    args: Array<InputValueDefinitionNode>,
    type: NamedTypeNode,
    directives?: Array<DirectiveNode>,
  ): FieldDefinitionNode;
  export function isFieldDefinition(node: unknown): boolean;
  export function assertFieldDefinition(node: unknown): void;

  export function inputValueDefinition(
    name: NameNode,
    type: NamedTypeNode,
    defaultValue?: unknown,
    directives?: Array<DirectiveNode>,
  ): InputValueDefinitionNode;
  export function isInputValueDefinition(node: unknown): boolean;
  export function assertInputValueDefinition(node: unknown): void;

  export function interfaceTypeDefinition(
    name: NameNode,
    fields: Array<FieldDefinitionNode>,
    directives?: Array<DirectiveNode>,
  ): InterfaceTypeDefinitionNode;
  export function isInterfaceTypeDefinition(node: unknown): boolean;
  export function assertInterfaceTypeDefinition(node: unknown): void;

  export function unionTypeDefinition(
    name: NameNode,
    types: Array<NamedTypeNode>,
    directives?: Array<DirectiveNode>,
  ): UnionTypeDefinitionNode;
  export function isUnionTypeDefinition(node: unknown): boolean;
  export function assertUnionTypeDefinition(node: unknown): void;

  export function enumTypeDefinition(
    name: NameNode,
    values: Array<EnumValueDefinitionNode>,
    directives?: Array<DirectiveNode>,
  ): EnumTypeDefinitionNode;
  export function isEnumTypeDefinition(node: unknown): boolean;
  export function assertEnumTypeDefinition(node: unknown): void;

  export function enumValueDefinition(
    name: NameNode,
    directives?: Array<DirectiveNode>,
  ): EnumValueDefinitionNode;
  export function isEnumValueDefinition(node: unknown): boolean;
  export function assertEnumValueDefinition(node: unknown): void;

  export function inputObjectTypeDefinition(
    name: NameNode,
    fields: Array<InputValueDefinitionNode>,
    directives?: Array<DirectiveNode>,
  ): InputObjectTypeDefinitionNode;
  export function isInputObjectTypeDefinition(node: unknown): boolean;
  export function assertInputObjectTypeDefinition(node: unknown): void;

  export function typeExtensionDefinition(
    definition: ObjectTypeDefinitionNode,
  ): TypeExtensionDefinitionNode;
  export function isTypeExtensionDefinition(node: unknown): boolean;
  export function assertTypeExtensionDefinition(node: unknown): void;

  export function directiveDefinition(
    name: NameNode,
    locations: Array<unknown>,
    args?: Array<InputValueDefinitionNode>,
  ): DirectiveDefinitionNode;
  export function isDirectiveDefinition(node: unknown): boolean;
  export function assertDirectiveDefinition(node: unknown): void;
}
