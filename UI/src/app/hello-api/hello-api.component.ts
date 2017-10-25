import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hello-api',
  templateUrl: './hello-api.component.html',
  styleUrls: ['./hello-api.component.css']
})
export class HelloApiComponent implements OnInit {

  results: string[] = ["e","f"];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Make the HTTP request:
    // http://localhost:3268/api/values
    this.http.get('http://localhost:3268/api/values').subscribe(data => {
      // Read the result field from the JSON response.
      this.results = <any>data;
    });
  }

}
