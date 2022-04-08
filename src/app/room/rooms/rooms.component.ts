import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Room } from '../RoomClass';
import { DataService } from 'src/app/api/data.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  roomList: Room[] = [];

  constructor(private route: ActivatedRoute, private data: DataService) { }

  ngOnInit(): void {
    this.data.getRooms().subscribe(list => this.roomList = list);
  }
}
