using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace webapi.Game
{
    public class Board
    {
        public static string[,] NewBoard()
        {
            var result = new string[11, 11];

            BlankBoard(result);
            AddBorder(result);

            return result;
        }

        public static void BlankBoard(string[,] board)
        {
            for (int x = 0; x <= board.GetLength(0) - 1; x++)
            {
                for (int y = 0; y <= board.GetLength(1) - 1; y++)
                {
                    board[x, y] = string.Empty;
                }
            }
        }

        public static void AddBorder(string[,] board)
        {
            for (int i = 1; i <= board.GetLength(0) - 1; i++)
            {
                board[0, i] = (i - 1).ToString();
                board[i, 0] = ((char)((int)'A' + i - 1)).ToString();
            }
        }
    }
}
