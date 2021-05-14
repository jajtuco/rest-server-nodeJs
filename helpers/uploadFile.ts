import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { v4 as uuidv4 } from 'uuid';
import path from 'path'

export const uploadFile = async (file: UploadedFile, validExtensions: string[] = ['jpg', 'png', 'jpeg', 'gif'], folder: string = ""): Promise<string> => {

  return new Promise((resolve, reject) => {

    const splittedName = file.name.split('.');
    const fileExtension = splittedName[splittedName.length - 1];


    // Verify extension
    if (!validExtensions.includes(fileExtension)) {
      return reject(`The extension ${fileExtension} is not valid - ${validExtensions}`);
    }

    //TODO: Create a env variable to define the folder, and creates it if dosen't exist
    const fileName = `${uuidv4()}_${file.name}`;
    const uploadPath = path.join(__dirname, '../uploads/', folder, fileName);

    file.mv(uploadPath, (err) => {
      if (err) {
        return reject(err);
      }

      return resolve(fileName);

    });


  });


};
