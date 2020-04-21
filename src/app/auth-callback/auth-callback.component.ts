import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})
export class AuthCallbackComponent implements OnInit {

  error: boolean;
  //url;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private dataService: DataService) {}

  async ngOnInit() {
   
    this.router.navigateByUrl('/adminlist');
  }

}
