import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';

enum Phase {
  DeployShips,
  BombShips
}

@Component({
  selector: 'app-hello-api',
  templateUrl: './hello-api.component.html',
  styleUrls: ['./hello-api.component.scss']
})
export class HelloApiComponent implements OnInit {
  public board1: any;
  public board2: any;
  public ships1: any;
  public ships2: any;
  public phase: Phase = Phase.DeployShips;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:3268/api/game/newgame').subscribe(data => {
      this.board1 = <any>data["board"];
      this.board2 = JSON.parse(JSON.stringify(data["board"]));
      this.ships1 = <any>data["ships"];
      this.ships2 = JSON.parse(JSON.stringify(data["ships"]));
    });

    $(document).keypress(function(e) {
      let c = e.key.toUpperCase();

      if ($.inArray(c, ["B", "C", "D"]) == -1)
      {
        window["shipType"] = "";
      }
      else {
        window["shipType"] = c;
      }
    });
  }

  private clickSquare(which : number, x : number, y: number) {
    if ((this.phase == Phase.DeployShips && which == 2) || (this.phase == Phase.BombShips && which == 1)) {
      return;
    }

    let board = this.board1;
    if (which == 2) {
      board = this.board2;
    }
    
    if (this.phase == Phase.DeployShips)
    {
      board[y][x] = window["shipType"];
    }
  }
}
