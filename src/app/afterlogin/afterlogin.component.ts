import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-afterlogin',
  templateUrl: './afterlogin.component.html',
  styleUrls: ['./afterlogin.component.css'],
})
export class AfterloginComponent implements OnInit {
  accessToken: string = '';
  accessTokenDecoded: string = '';
  idToken: string = '';
  idTokenDecoded: string = '';
  refreshToken: string = '';
  expiresIn: string = '';
  tokenType: string = '';

  options = {
    headers: new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    ),
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  async ngOnInit() {
    this.route.queryParams.subscribe(async (params) => {
      if (params['code']) {
        const code = params['code'];
        console.log('code: ' + code);

        try {
          const token: any = {}; // call token endpoint

          console.log('token: ' + JSON.stringify(token));

          this.accessToken = token['access_token'];
          this.idToken = token['id_token'];
          this.refreshToken = token['refresh_token'];
          this.expiresIn = token['expires_in'];
          this.tokenType = token['token_type'];

          this.idTokenDecoded = JSON.stringify(jwtDecode(this.idToken));

          this.accessTokenDecoded = JSON.stringify(jwtDecode(this.accessToken));
        } catch (error) {
          console.log(error);
          this.router.navigate(['/home']);
        }
      }
    });
  }

  async refresh() {
    const token: any = {}; // call refresh token endpoint

    console.log('token: ' + JSON.stringify(token));

    this.accessToken = token['access_token'];
    this.idToken = token['id_token'];
    this.expiresIn = token['expires_in'];
    this.tokenType = token['token_type'];

    this.idTokenDecoded = JSON.stringify(jwtDecode(this.idToken));

    this.accessTokenDecoded = JSON.stringify(jwtDecode(this.accessToken));
  }
}
