using System;
using CodeBreaker.Core;
using CodeBreaker.WebApp.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace CodeBreaker.WebApp.Controllers
{
    [Route("api/[controller]")]
    public class GameController : Controller
    {
        private readonly IGameManager _gameManager;
        public GameController(IGameManager gameManager)
        {
            _gameManager = gameManager;
        }

        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
            var game = _gameManager.LoadGame(id);
            if (game == null)
            {
                return NotFound();
            }
            return Ok(new GameResult(game));
        }

        [HttpPost("{id}/code")]
        public IActionResult EnterCode(Guid id, [FromBody]int[] code)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var game = _gameManager.LoadGame(id);
            if (game == null)
            {
                return NotFound();
            }
            if (game.Code.Digits.Length != code.Length)
            {
                return BadRequest($"Code length doesn't match. Expecting {game.Code.Digits.Length} digits.");
            }

            var result = game.EnterCode(new Code(code));
            _gameManager.SaveGame(game);
            return Ok(result);
        }

        [HttpPost]
        public IActionResult Create()
        {
            var game = _gameManager.NewGame();
            return CreatedAtAction("Get", new { id = game.Id }, new GameResult(game));
        }
    }
}