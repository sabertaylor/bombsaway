import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { NgIf } from '@angular/common';
import { MatButton } from '@angular/material';
import { ValidationService } from '../validation.service';

enum Phase {
  DeployShips,
  BombShips
}

@Component({
  selector: 'app-hello-api',
  providers: [ValidationService],
  templateUrl: './hello-api.component.html',
  styleUrls: ['./hello-api.component.scss']
})
export class HelloApiComponent implements OnInit {
  static shipType = "🌊";
  private board1: any;
  private board2: any;
  private ships1: any;
  private ships2: any;
  private phase: Phase = Phase.DeployShips;

  constructor(private http: HttpClient, private validationService: ValidationService) { }

  ngOnInit() {
    this.http.get('http://localhost:3268/api/game/newgame').subscribe(data => {
      this.board1 = <any>data["board"];
      this.board2 = JSON.parse(JSON.stringify(data["board"]));
      this.ships1 = <any>data["ships"];
      this.ships2 = JSON.parse(JSON.stringify(data["ships"]));

      this.validationService.countSquares(this.board1, 1);
      this.validationService.countSquares(this.board2, 2);
    });

    $(document).keypress(function(e) {
      let c = e.key.toUpperCase();

      if ($.inArray(c, ["B", "C", "D"]) == -1) {
        HelloApiComponent.shipType = "🌊";
      }
      else {
        HelloApiComponent.shipType = c;
      }
    });
  }

  private clickSquare(which : number, x : number, y: number) {
    if ((this.phase == Phase.DeployShips && which == 2) || (this.phase == Phase.BombShips && which == 1) ||
        (x == 0) || (y == 0)) {
      return;
    }

    let board;
    let shipCount;
    if (which == 1) {
      board = this.board1;
      shipCount = this.validationService.shipCounts1;
    }
    if (which == 2) {
      board = this.board2;
      shipCount = this.validationService.shipCounts2;
    }
    
    if (this.phase == Phase.DeployShips)
    {
      if (!this.validationService.validatePlacement(HelloApiComponent.shipType, board, which, x, y)) {
        return;
      }
      
      shipCount[board[y][x]]--;
      board[y][x] = HelloApiComponent.shipType;
      shipCount[HelloApiComponent.shipType]++;
    }
  }
}
