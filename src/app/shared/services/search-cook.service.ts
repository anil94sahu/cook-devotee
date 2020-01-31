import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../constants/apis.constant';
import { FirebaseService } from './crud.firebase.service';
import { createClient, Entry } from 'contentful';

@Injectable({providedIn: 'root'})
export class SearchCookService {
    tableName: string = API.RegisterTableName;

    private client = createClient({
        space : 'rp5lhyr7koh4',
        accessToken: '3OjKubTGn8hoR8i6RHt_RU0GkerYq7WKXcNOXww3vTs'
      });

    constructor(private fbs: FirebaseService) {

    }

    public getCooks() {
        return this.fbs.get(this.tableName);
    }

    getData = async() => {
        let response:any
        try {
             response = await this.client.getEntries({
            content_type: "beachResortRoomExample",
            order: 'sys.createdAt'   
            })
        } 
        catch (error) {
            console.log(error);
        }

        return response
    }
}
