import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private endPoint = '';
  data: any = {};
  title = 'text-summarisation-frontend';
  rForm: FormGroup;
  post: any;
  summarisedText: any;
  gifUrl: any;

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.rForm = fb.group({
      'longText': [null, Validators.required]
      });
  }

  getResponse(data: any): any {
    return this.httpClient.post(this.endPoint, data)
      .subscribe(
        (res: any) => {
          this.summarisedText = res.summarisedText;
          this.gifUrl = res.gifUrl;
          console.log(this.summarisedText);
      }
    );
  }

  ngOnInit() {
    // this.rForm.get('checkPhone').valueChanges.subscribe(
    //   (checkPhone) => {
    //       if (checkPhone === '1') {
    //           this.rForm.get('longText').setValidators([Validators.nullValidator]);
    //           this.phoneAlert = 'You need to add text to proceed';
    //       } else {
    //           this.rForm.get('phone').setValidators(Validators.required);
    //       }
    //       this.rForm.get('phone').updateValueAndValidity();

    //   });
  }

  addPost(post) {
    console.log(post);
    const data = {
      text : post.longText
    };

    this.getResponse(data);
  }

  backToForm() {
    this.summarisedText = null;
    this.rForm.reset();
  }

}
