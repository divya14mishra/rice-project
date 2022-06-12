import { jsonObject, jsonMember, jsonArrayMember, jsonMapMember, TypedJSON } from 'typedjson';

export class FileDTO {
     public fileId: string;
     public fileName: string;
     public status: string;
     public diceOutput: string;
     public share: string;
     public imageUrl: string;
     public matUrl: string;
     public fileDetail: FileDetail;

}

export class FileDetail {
     public metaData: string[];
     public scanParameter: string[];
     public analyticsOutput: string[];
     public shareStatus: string[];
}

export class RecommendationDTO {
     public actionId: string;
     public actionMessage: string;
     public actionsOptions: RecommendationActionsDTO[];

}

export class RecommendationActionsDTO {
     public actionOptionId: string;
     public actionName: string;
     public semCommand: SemCommandDTO;

}

export class SemCommandDTO {

}