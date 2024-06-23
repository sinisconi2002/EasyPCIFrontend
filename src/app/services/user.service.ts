import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, ReplaySubject, Subject, tap } from "rxjs";
import { User } from "../models/user";
import { AuthenticatedResponse } from "../models/authenticatedResponse";

@Injectable({providedIn: 'root'})

export class UserService {
    private httpService: HttpClient;

    constructor(httpService: HttpClient) {
        this.httpService = httpService;
    }

    //user-side
    register(userData: User): Observable<User> {
        return this.httpService.post<User>('https://easpyciapi.azurewebsites.net/users/add_user', userData);
    }

    getUser(userId: string): Observable<User> {
        return this.httpService.get<User>('https://easpyciapi.azurewebsites.net/users/' + userId);
    }

    authenticate(userLogin: User): Observable<AuthenticatedResponse> {
        return this.httpService.post<AuthenticatedResponse>('https://easpyciapi.azurewebsites.net/users/login', userLogin, 
               { headers: new HttpHeaders({ "Content-Type": "application/json"}) });
    }

}