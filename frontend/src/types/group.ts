import { MemberOfGroup } from './memberOfGroup';

export type Group = {
    _id: string,
    groupName: string,
    mentor: string,
    members: Array<MemberOfGroup>
  }