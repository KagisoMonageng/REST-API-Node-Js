import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/model/song';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {

  songs : any

  constructor(private songServ: SongService) { }

  ngOnInit(): void {
    this.songServ.getSongs().subscribe((data)=>{
      this.songs = data;
      console.log(data);
    })
  }



}
