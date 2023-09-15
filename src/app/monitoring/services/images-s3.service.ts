import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { S3Client, ListObjectsV2Command , GetObjectCommand } from "@aws-sdk/client-s3";



@Injectable({
  providedIn: 'root'
})
export class ImagesS3Service {

  private client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: environment.region,
      credentials: {
        accessKeyId: environment.awsKeyId,
        secretAccessKey: environment.awsSecretKey
      }
    });
  }

  
  async downloadImageFromS3(bucketName: string, imageName: string): Promise<string | undefined> {

    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: imageName
    });

    try {
      const response = await this.client.send(command);
      if (response.Body) {
        const arrayBuffer = await response.Body.transformToByteArray();
        const file = new Blob([arrayBuffer], { type: response.ContentType });
        const imageUrl = URL.createObjectURL(file);
        return imageUrl;
      } else {
        console.error('El contenido del archivo es indefinido.');
      }
    } catch (error) {
      console.error(error);
      throw new Error('No se pudo descargar la imagen desde S3.');
    }
    return undefined;
  }


  async listObjectsInDirectory(bucketName: string, directoryPath: string): Promise<string[]> {
    
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: directoryPath
    });
  
    try {
      const response = await this.client.send(command);
      if (response?.Contents) {
        const objectKeys = response.Contents.map((object) => object.Key);

        //console.log('Objetos en el directorio:', objectKeys);
        const filteredKeys = objectKeys
        .filter((key) => key !== undefined && (key.endsWith('.jpg') || (key.endsWith('.png'))))// Filtrar los valores undefined y nos quedamos solo con las imágenes *.jpg
        .map(key=> key?.split('/').pop()); // a continuación nos quedamos solo con el nombre de los archivos.
        return filteredKeys as string[]; // Convertir el resultado a string[]
      } else {
        console.log('No se encontraron objetos en el directorio.');
        return []; // Retornar un array vacío
      }
    } catch (error) {
      console.error('Error al listar los objetos del directorio:', error);
      throw error; // Lanzar el error para que sea manejado en el nivel superior
    }
  }

}

