export type S3FileUploadPaylodResponse = {
    key: string;
    url: string;
    name: string;
    fieldName: string;
};

export type SignedUrlViewResponse = string;

export interface SignedUrlViewResponseType {
  key: string;
  url: string;
}

export interface CategoryResponse {
  id: string;
  name: string;
};