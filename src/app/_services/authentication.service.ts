import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

// ~~
declare var keyGuardLoginProcedureStart: any;
declare var keyGuardLogoutProcedureStart: any;
//~~

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(username: string, password: string) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        // console.log('post request with: ' + JSON.stringify({ username: username, password: password }));
        return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }), { headers: headers })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                //  console.log(response.json().message);
                const user = response.json();
                //console.log('apantisi apton server sto authenticate:', user);
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    sessionStorage.setItem('currentUser', JSON.stringify(user));

                    // ~~ KEYGUARD ~~
                    keyGuardLoginProcedureStart(user.token);
                    // ~~ KEYGUARD ~~
                }
                return response.json(); // return the observable (as response.json)
            });


    }

    logout() {
        // ~~ KEYGUARD ~~
        if (sessionStorage.getItem('currentUser') !== null) {
            keyGuardLogoutProcedureStart();
        }
        // ~~ KEYGUARD ~~
        // remove user from local storage to log user out
        sessionStorage.removeItem('currentUser');
    }

    isUserLoggedIn() {
        if (sessionStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        } else {
            return false;
        }

    }


    // Get random text
    // type: 'period', 'paragraph'
    // size: number of words if type = 'period'
    // else number of paragraphs if type="paragraph"
    getMyRandomText(type: string, size: number) {

        let loremRoute;
        if (type === 'period') {
            loremRoute = '/random-text-' + size.toString();
        } else if (type === 'paragraph') {
            loremRoute = '/text-random-' + size.toString();
        } else {
            console.log('Wrong Input');
            return;
        }
        return this.http.post('mylorem', { 'loremRoute': loremRoute })
            .map((response: Response) => {
                const resp = response.json();
                console.log('apantisi apton server sto lorem:', resp);
                return response.json(); // return the observable (as response.json)
            });
    }

    // Get a Random Image
    getMyRandomImage() {

        // Options for ArrayBuffer
        const options = new RequestOptions({
            responseType: ResponseContentType.ArrayBuffer
        });

        // Perform Get Request
        return this.http.get('/mylorem/img', options)
            .map((response: Response) => {
                console.log('Image Received.');
                // console.log(response);
                const resp = response.arrayBuffer();
                return resp;
            });
    }
}
