
export class del_img_id{
     _id:String
}

export class Signup {
     username: String
     email: String;
     firstname: String;
     lastname: String;
     address: String;
     contact: Number;
     inputState: String;
     inputCity: String;
     inputZip: String;
     inputCountry: String;
     usertype: String;
}
export class UpdateProfile {
     id:String;
     username: String
     firstname: String;
     lastname: String;
     address: String;
     contact: Number;
     inputState: String;
     inputCity: String;
     inputZip: String;
     inputCountry: String;
}
export class Login {
     email: String;
     userPassword: String;
}

export class userManagement{
     id:String;
     flag:Number;
}

export class adminRequest{
     id:String;
}

export class image_analysis{
    filename:String;
    filepath:String;
}

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