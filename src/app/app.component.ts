import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  activeLang = 'es';

  constructor(private translator: TranslateService) {
    this.translator.setDefaultLang(this.activeLang);
  }

  ngOnInit() { }

  changeLanguage(lang) {
    this.activeLang = lang;
    this.translator.use(lang);
  }
}
