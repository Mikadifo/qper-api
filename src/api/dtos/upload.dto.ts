export interface UploadDto {
  projectId: string;
  issueId: string;
  file: Express.Multer.File;
}
