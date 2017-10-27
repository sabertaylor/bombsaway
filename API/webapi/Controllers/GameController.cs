using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using webapi.Game;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    public class GameController : Controller
    {
        [HttpGet("newgame")]
        public Dictionary<string, object> NewBoard()
        {
            return new Dictionary<string, object>()
            {
                { "board", Game.Board.NewBoard() },
                { "ships", Game.Ships.NewShips() }
            };
        }
    }
}
