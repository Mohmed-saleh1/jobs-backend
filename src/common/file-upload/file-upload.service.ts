import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; // Import ConfigService
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FileUploadService {
  constructor(private readonly configService: ConfigService) {} // Inject ConfigService

  /**
   * Generates a unique folder name for an application.
   * @returns A unique folder name (e.g., "application-abc123").
   */
  generateApplicationFolderName(): string {
    return `application-${Date.now()}`;
  }

  getApplicationFolderPath(
    userFolderPath: string,
    applicationFolderName: string,
  ): string {
    return path.join(userFolderPath, applicationFolderName);
  }

  /**
   * Creates a folder for a user if it doesn't exist.
   * @param userId - The ID of the user.
   * @param userName - The name of the user.
   * @returns The path to the user's folder.
   */
  createUserFolder(userId: number, userName: string): string {
    if (!userId || !userName) {
      throw new BadRequestException('User ID or User Name is missing');
    }

    // Sanitize the userName to create a safe folder name
    const sanitizedUserName = this.sanitizeFolderName(userName);

    // Create the user folder name
    const userFolderName = `${sanitizedUserName}-${userId}`;
    const userFolderPath = path.join('uploads', 'resumes', userFolderName);

    // Create the folder if it doesn't exist
    if (!fs.existsSync(userFolderPath)) {
      fs.mkdirSync(userFolderPath, { recursive: true });
    }

    return userFolderPath;
  }

  /**
   * Sanitizes a string to create a safe folder name.
   * @param name - The input string (e.g., user name).
   * @returns A sanitized string safe for use as a folder name.
   */
  private sanitizeFolderName(name: string): string {
    // Replace spaces and special characters with underscores
    return name.replace(/[^a-zA-Z0-9-_]/g, '-').toLowerCase();
  }

  /**
   * Creates a folder for an application inside the user's folder.
   * @param userFolderPath - The path to the user's folder.
   * @param applicationFolderName - The name of the application folder.
   * @returns The path to the application folder.
   */
  createApplicationFolder(
    userFolderPath: string,
    applicationFolderName: string,
  ): string {
    const applicationFolderPath = path.join(
      userFolderPath,
      applicationFolderName,
    );

    if (!fs.existsSync(applicationFolderPath)) {
      fs.mkdirSync(applicationFolderPath, { recursive: true });
    }

    return applicationFolderPath;
  }

  /**
   * Moves a file to the specified folder.
   * @param file - The file object (Express.Multer.File).
   * @param destinationFolder - The folder where the file should be moved.
   * @param newFileName - The new name for the file (optional).
   * @returns The path to the moved file.
   */
  moveFileToFolder(
    file: Express.Multer.File,
    destinationFolder: string,
    newFileName?: string,
  ): string {
    if (!file || !file.path || !file.originalname) {
      throw new BadRequestException('Invalid file object');
    }

    const fileExtension = path.extname(file.originalname);
    const fileName = newFileName
      ? `${newFileName}${fileExtension}`
      : file.originalname;

    // Normalize the path to use forward slashes
    const filePath = path.join(destinationFolder, fileName).replace(/\\/g, '/'); // Replace backslashes with forward slashes

    // Ensure the destination folder exists
    this.ensureDirectoryExists(destinationFolder);

    // Move the file from the temporary location to the new path
    fs.renameSync(file.path, filePath);

    // Prepend the DOMAIN_URI from the environment file
    const domainUri = this.configService.get<string>('DOMAIN_URI');
    return `${domainUri}/${filePath}`;
  }

  /**
   * Ensures that the specified directory exists. If not, it creates the directory.
   * @param directory - The directory path to check/create.
   */
  ensureDirectoryExists(directory: string): void {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
  }

  /**
   * Deletes a file or folder recursively.
   * @param path - The path to the file or folder.
   */
  deleteFileOrFolder(path: string): void {
    if (fs.existsSync(path)) {
      if (fs.lstatSync(path).isDirectory()) {
        fs.readdirSync(path).forEach((file) => {
          this.deleteFileOrFolder(path + '/' + file);
        });
        fs.rmdirSync(path);
      } else {
        fs.unlinkSync(path);
      }
    }
  }

  /**
   * Validates the file type based on the allowed MIME types.
   * @param file - The file object (Express.Multer.File).
   * @param allowedMimeTypes - An array of allowed MIME types (e.g., ['image/jpeg', 'application/pdf']).
   * @throws Error if the file type is not allowed.
   */
  validateFileType(
    file: Express.Multer.File,
    allowedMimeTypes: string[],
  ): void {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new Error(`File type ${file.mimetype} is not allowed`);
    }
  }

  /**
   * Validates the file size.
   * @param file - The file object (Express.Multer.File).
   * @param maxSizeInBytes - The maximum allowed file size in bytes.
   * @throws Error if the file size exceeds the limit.
   */
  validateFileSize(file: Express.Multer.File, maxSizeInBytes: number): void {
    if (file.size > maxSizeInBytes) {
      throw new BadRequestException(
        `File size exceeds the limit of ${maxSizeInBytes} bytes`,
      );
    }
  }
}
