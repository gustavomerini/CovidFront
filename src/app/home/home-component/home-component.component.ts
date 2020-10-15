import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FileUploader, FileUploaderOptions} from 'ng2-file-upload';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { DeviceDetectorService } from 'ngx-device-detector';



@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {

  mRecorder: any;
  recording: boolean;
  recordingVowels: boolean;
  private baseUrl = 'https://covid.udl.cat/recorder';
  registerForm: FormGroup;

  cardio = false;
  fibro = false;
  drogodep = false;
  pneumo = false;
  apnea = false;
  asma = false;
  bronchitis = false;
  other = false;

  submitted = false;
  loading: any;

  isMobile = false;


  @ViewChild('successmodal', {static: false}) private responsePopup;
  @ViewChild('content', {static: false}) private asd;

  public uploader: FileUploader = new FileUploader({url: this.baseUrl, itemAlias: 'soundBlob'});

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private deviceService: DeviceDetectorService) { }


  ngOnInit() {
    this.recording = false;
    this.recordingVowels = false;
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    this.registerForm = this.formBuilder.group({
      gender: ['', Validators.required],
      age: ['', Validators.required],
      smoker: ['', Validators.required],
      covid: ['', Validators.required],
    });

    this.isMobile = this.deviceService.isMobile() || this.deviceService.isTablet();
  }

  blobToFile(theBlob: Blob, fileName: string): File {
    return new File([theBlob], fileName);

  }

  get f() { return this.registerForm.controls; }

  openModal(content, id) {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    if (id === 'modal-basic-title') {
      this.modalService.open(content, {ariaLabelledBy: id, backdrop: 'static'}).result.then(asd  => {
        const element = this.isMobile ? 'ExampleGifMobile' : 'ExampleGifDesktop';
        const videoElement = document.getElementById(element) as HTMLVideoElement;
        videoElement.play();
        videoElement.pause();
      });
    } else {
      this.modalService.open(content, {ariaLabelledBy: id, backdrop: 'static'}).result.then();
    }
  }

  recordAudio() {
    this.recording = true;

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        // @ts-ignore
        this.mRecorder = new MediaRecorder(stream);
        this.mRecorder.start();
        this.recording = true;


        const audioChunks = [];
        this.mRecorder.addEventListener('dataavailable', event => {
          audioChunks.push(event.data);
        });

        this.mRecorder.addEventListener('stop', () => {
          const today = new Date();
          let filename = this.registerForm.get('gender').value + '_' +
            this.registerForm.get('age').value + '_' +
            this.registerForm.get('smoker').value + '_' +
            this.registerForm.get('covid').value + '_';

          if (this.cardio) {
            filename += 'cardio_';
          }

          if (this.drogodep) {
            filename += 'drogodep_';
          }

          if (this.pneumo) {
            filename += 'pneumo_';
          }

          if (this.fibro) {
            filename += 'fibro_';
          }

          if (this.asma) {
            filename += 'asma_';
          }

          if (this.apnea) {
            filename += 'apnea_';
          }

          if (this.bronchitis) {
            filename += 'bronq_';
          }
          if (this.other) {
            filename += 'other_';
          }

          // this.modalService.dismissAll();
          const audioBlob = new Blob(audioChunks);


          const dd = String(today.getDate()).padStart(2, '0');
          const mm = String(today.getMonth() + 1).padStart(2, '0');
          const sec = String(today.getSeconds()).padStart(2, '0');
          const min = String(today.getMinutes()).padStart(2, '0');
          const hour = String(today.getHours()).padStart(2, '0');
          const yyyy = today.getFullYear();

          filename += yyyy + mm + dd + '-' + hour + min + sec + '.wav';
          this.uploader.addToQueue([this.blobToFile(audioBlob, filename)]);
          const uo: FileUploaderOptions = {};
          this.uploader.setOptions(uo);
          this.uploader.uploadAll();
          /*
          this.openModal(this.responsePopup, 'modal-success');
*/
          stream.getTracks()
            .forEach( track => track.stop() ); // stop each of them
        });
      });
  }

  stopRecording() {
    this.recording = false;
    this.recordingVowels = false;
    this.mRecorder.stop();
  }

  closeModal(reason: string) {
    if (confirm('Are you sure?')) {
      this.modalService.dismissAll(reason);
    }
  }

  showTutorial() {
    const element = this.isMobile ? 'ExampleGifMobile' : 'ExampleGifDesktop';
    const x = document.getElementById(element);
    const videoElement = document.getElementById(element) as HTMLVideoElement;

    if (x.style.display === 'none') {
      videoElement.play();
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
      videoElement.pause();
    }
  }
}
