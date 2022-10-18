import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Song } from '../model/song';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getSongs() {
    return this.http.get(this.baseUrl+'/find-all'); 
  }

  getOneSong(title: string) {
    return this.http.get(this.baseUrl+'/find-one/'+title); 
  }

  deleteSong(id: string) {
    return this.http.delete(this.baseUrl+'/delete/'+id);
  }

  addSong(song: Song) {
  
    return this.http.post(this.baseUrl+'/add', JSON.stringify(song));
  }

  updateSong(id:string ,song: Song) {
    return this.http.put(this.baseUrl+'/update/'+id, JSON.stringify(song));
  }







}
