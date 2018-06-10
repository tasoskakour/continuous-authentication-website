import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, RequestMethod } from '@angular/http';

import { User } from '../_models/index';

@Injectable()
export class UserService {
    CONT_AUTH_SERVER_URL_FOR_KEY_PROFILE = 'https://evening-dusk-17545.herokuapp.com/misc/mykeyprofile';
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(user: User) {
        // console.log(user);
        return this.http.post('/api/users', user, this.jwt()).map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    // Get Keystroke Profile of User from the cont auth server
    getKeystrokeProfile(username: string) {

        // The url from the continuous authentication server
        const contAuthServerUrl = this.CONT_AUTH_SERVER_URL_FOR_KEY_PROFILE;

        // object of data body (track_code is loaded from the global variable of idndex.html)
        const myReqInfo = { track_code: window['track_code'], subject: username };

        // Construct headers
        // This is a CORS request so adjust content-type
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('user-key-profile-request', JSON.stringify(myReqInfo));

        // Perfrom the request and map the response as json
        return this.http.get(contAuthServerUrl, new RequestOptions({ headers: headers })).map((response: Response) => response.json());

    }

    /* Get random quote */
    getRandomQuote() {
        // Append timestamp to url to amke it unique
        const timestamp = Date.now();
        const url =
            'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&jsonp=mycallback/' + String(timestamp);
        const headers = new Headers();
        // headers.append('Access-Control-Allow-Headers', 'Cache-Control');
        // headers.append('Cache-Control', 'no-cache');
        // headers.append('Cache-Control', 'no-store');
        // headers.append('Cache-Control', 'must-revalidate');
        // headers.append('Pragma', 'no-cache');
        // headers.append('Expires', '0');
        return this.http.get(url).map((response: Response) => response.json());
    }


    // private helper methods
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers();
            headers.append('x-access-token', currentUser.token);
            return new RequestOptions({ headers: headers });
        }
    }
}