import { registerEnumType } from '@nestjs/graphql';

export enum TagType {
  HOT = 'HOT',
  FRESH = 'FRESH',
  BEST = 'BEST',
}

registerEnumType(TagType, {
  name: 'TagType',
  description: 'The supported tag',
});
