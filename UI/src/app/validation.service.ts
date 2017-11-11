import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class ValidationService {

  public shipCounts1 : any;
  public shipCounts2 : any;

  constructor() { }

  public validatePlacement(shipType : string, board: any, which: number, x : number, y : number) : boolean {
    let shipCount;
    if (which == 1) {
      shipCount = this.shipCounts1;
    }
    if (which == 2) {
      shipCount = this.shipCounts2;
    }

    return this.validateCount(shipType, shipCount) && this.validateShipsInLine(shipType, shipCount, board, x, y)
            && this.validateNotCuttingOtherShip(shipType, board, x, y);
  }

  public countSquares(board: any, which: number) : any {
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
    if (which === 1) {
      this.shipCounts1 = countByString;
    } else if (which === 2) {
      this.shipCounts2 = countByString;
    }
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

  private validateNotCuttingOtherShip(shipType: string, board: any, x: number, y: number) : boolean {
    if (board[y][x] == "🌊") {
      return true;
    }

    let count = this.findNeighbors(board[y][x], board, x, y).length;
    if (count > 1) {
      return false;
    }

    return true;
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
      // No neighbors found. Validate that we are the first square.
      return shipCount[shipType] === 0;
    }
      
    if (found.length > 1) {
      // Only add on the end.
      return false;
    }

    // Backtrack first neighbor and see if it is linear.
    let backTrackFound = this.findNeighbors(shipType, board, found[0].x, found[0].y);

    // Nothing found.
    if (backTrackFound.length == 0) {
      return true;
    }
    // Horizontal line.
    if (y === found[0].y && found[0].y === backTrackFound[0].y && Math.abs(x - backTrackFound[0].x) === 2) {
      return true;
    }
    // Vertical line.
    if (x === found[0].x && found[0].x === backTrackFound[0].x && Math.abs(y - backTrackFound[0].y) === 2) {
      return true;
    }
    // Diagonals.
    if ((Math.abs(x - backTrackFound[0].x) == 2 && Math.abs(y - backTrackFound[0].y) === 2) &&
        (Math.abs(x - found[0].x) === 1 && Math.abs(y - found[0].y) === 1)) {
      return true;
    }
    return false;
  }

  private findNeighbors(shipType: string, board: any, x: number, y: number) : Array<any> {
    // Search neighbors but not off the board.
    let upperLeftX = x - 1;
    upperLeftX = upperLeftX < 1 ? 1 : upperLeftX;
    let upperLeftY = y - 1;
    upperLeftY = upperLeftY < 1 ? 1 : upperLeftY;

    let bottomRightX = x + 1;
    bottomRightX = bottomRightX > board[0].length - 1 ? board[0].length - 1 : bottomRightX;
    let bottomRightY = y + 1;
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
