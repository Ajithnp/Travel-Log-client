
export type S3FileUploadPaylod = {
    fileName: string,
    contentType: string
    fieldName: string
};

export interface S3UploadParams {
  url: string;
  file: File;
}