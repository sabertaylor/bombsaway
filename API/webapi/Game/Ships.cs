using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace webapi.Game
{
    public class Ships
    {
        public static string[][] NewShips()
        {
            var result = new string[3][];

            result[0] = new string[6];
            result[1] = new string[4];
            result[2] = new string[3];

            BlankShips(result);
            AddBorder(result);

            return result;
        }

        public static void BlankShips(string[][] grid)
        {
            foreach (var row in grid)
            {
                for (int i = 0; i <= row.Length - 1; i++)
                {
                    row[i] = "✓";
                }
            }
        }

        public static void AddBorder(string[][] grid)
        {
            grid[0][0] = "B";
            grid[1][0] = "C";
            grid[2][0] = "D";
        }
    }
}
