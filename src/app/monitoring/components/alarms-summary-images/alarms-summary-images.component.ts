import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Alarm } from '../../model/Alarm';
import { ImagesS3Service } from '../../services/images-s3.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-alarms-summary-images',
  templateUrl: './alarms-summary-images.component.html',
  styleUrls: ['./alarms-summary-images.component.css']
})
export class AlarmsSummaryImagesComponent implements OnInit {


  @Input()
  dataInput!: Observable<Alarm>;

  imagesUrl: (string | undefined)[] = [];
  imageUrl:any;
  loading:boolean = false;

  constructor(private imagesS3Service: ImagesS3Service) {}

  
  ngOnInit(): void {
    this.loading = true;
    this.dataInput.subscribe(alarm => { 
      let url = `alarms/${alarm.id}`;
      this.downloadImage(url)
    })
  }

  async downloadImage(imageDirectory:string): Promise<void> {

    const bucketName = environment.s3;

    this.imagesS3Service.listObjectsInDirectory(bucketName, imageDirectory).then(
      async key => {
        key.forEach(async id => {
          const imageUrl = await this.imagesS3Service.downloadImageFromS3(bucketName, imageDirectory +'/'+ id);
          this.imagesUrl.push(imageUrl);
        })
      }
    ).finally(()=>
      this.loading = false
    )
  }
}

