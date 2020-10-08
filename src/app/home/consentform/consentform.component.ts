import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-consentform',
  templateUrl: './consentform.component.html',
  styleUrls: ['./consentform.component.css']
})
export class ConsentformComponent implements OnInit {

  constructor(private router: Router) {}


  consent = false;
  submitted = false;

  ngOnInit() {
  }

  submit() {
    this.submitted = true;
    this.router.navigateByUrl('/questionnaire', {skipLocationChange: true});
  }
}
