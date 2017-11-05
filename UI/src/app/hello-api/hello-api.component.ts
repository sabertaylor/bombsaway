import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { NgIf } from '@angular/common';
import { MatButton } from '@angular/material';

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
  static shipType = "🌊";
  private board1: any;
  private board2: any;
  private ships1: any;
  private ships2: any;
  private shipCounts1 : any;
  private shipCounts2 : any;
  private phase: Phase = Phase.DeployShips;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:3268/api/game/newgame').subscribe(data => {
      this.board1 = <any>data["board"];
      this.board2 = JSON.parse(JSON.stringify(data["board"]));
      this.ships1 = <any>data["ships"];
      this.ships2 = JSON.parse(JSON.stringify(data["ships"]));

      this.shipCounts1 = this.countSquares(this.board1);
      this.shipCounts2 = this.countSquares(this.board2);
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

  private countSquares(board: any) : any {
    let countByString = {
      "B": 0,
      "C": 0,
      "D": 0,
      "🌊" : 0
    };
    for (let x = 1; x <= board[0].length - 1; x++) {
      for (let y = 1; y <= board.length - 1; y++) {
        countByString[board[x][y]]++;
      }
    }
    return countByString;
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
      shipCount = this.shipCounts1;
    }
    if (which == 2) {
      board = this.board2;
      shipCount = this.shipCounts2;
    }
    
    if (this.phase == Phase.DeployShips)
    {
      if (!this.validatePlacement(HelloApiComponent.shipType, board, shipCount, x, y)) {
        return;
      }
      
      shipCount[board[y][x]]--;
      board[y][x] = HelloApiComponent.shipType;
      shipCount[HelloApiComponent.shipType]++;
    }
  }

  // Brute force.
  private validatePlacement(shipType : string, board : any, shipCount: any, x : number, y : number) : boolean {
    return this.validateCount(shipType, shipCount) && this.validateShipsInLine(shipType, shipCount, board, x, y);
  }

  private validateCount(shipType: string, shipCount: any) : boolean {
    let maxAmount = {
      "B": 5,
      "C": 3,
      "D": 2,
      "🌊": 999
    }

    return shipCount[shipType] < maxAmount[shipType];
  }

  private validateShipsInLine(shipType: string, shipCount: any, board: any, x: number, y: number) : boolean {
    if (shipType === "🌊") {
      if (board[y][x] === "🌊") {
        // Trying to place water onto water.
        return true;
      }
      // Must be on end if we are removing a ship.
      // What are neighboring ships of selected position?
      let found = this.findNeighbors(board[y][x], board, x, y);
      
      if (found.length > 1) {
        return false;
      } else {
        return true;
      }
    }

    // Find first neighbor
    let found = this.findNeighbors(shipType, board, x, y);
    if (found.length === 0) {
      // No neighbors found.
      return shipCount[shipType] === 0;
    }
      
    if (found.length > 1) {
      // Would not form a line.
      return false;
    }

    // Backtrack one neighbor and see if it is linear.
    // Previous validation means twice backtracked neighbor must be linear already.
    let backTrackFound = this.findNeighbors(shipType, board, found[0].x, found[0].y);
    // Horizontal line.
    if (found[0].y === backTrackFound[0].y && Math.abs(found[0].x - backTrackFound[0].x) == 2) {
      return true;
    }
    // Vertical line.
    if (found[0].x === backTrackFound[0].x && Math.abs(found[0].y - backTrackFound[0].y) == 2) {
      return true;
    }
    // Diagonals.
    if (Math.abs(found[0].x - backTrackFound[0].x) == 2 && Math.abs(found[0].y - backTrackFound[0].y) == 2) {
      return true;
    }
    return false;
  }

  private findNeighbors(shipType: string, board: any, x: number, y: number) : any {
    // Search neighbors but not off the board.
    let upperLeftX = x - 1;
    upperLeftX = upperLeftX < 1 ? 1 : upperLeftX;
    let upperLeftY = y - 1;
    upperLeftY = upperLeftY < 1 ? 1 : upperLeftY;

    let bottomRightX = x + 1;
    bottomRightX = bottomRightX > board[0].length - 1 ? board[0].length - 1 : bottomRightX;
    let bottomRightY = y - 1;
    bottomRightY = bottomRightY > board.length - 1 ? board.length - 1 : bottomRightY;

    let neighbors = [];
    for (let currentX = upperLeftX; currentX <= bottomRightX; currentX++) {
      for (let currentY = upperLeftY;currentY <= bottomRightY; currentY++) {
        if (currentX == x && currentY == y) {
          continue;
        }

        if (board[currentY][currentX] === shipType) {
          neighbors.push({ x: currentX, y: currentY });
        }
      }
    }

    return neighbors;
  }
}
