using System;
using CodeBreaker.Core;
using CodeBreaker.WebApp.Contracts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CodeBreaker.WebApp.Controllers
{
    [Route("api/[controller]")]
    public class GameController : Controller
    {
        private readonly IGameManager _gameManager;
        private readonly ILogger _logger;
        public GameController(IGameManager gameManager, ILoggerFactory loggerFactory)
        {
            _gameManager = gameManager;
            _logger = loggerFactory.CreateLogger<GameController>();
        }

        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
            var game = _gameManager.LoadGame(id);
            if (game == null)
            {
                return NotFound();
            }
            _logger.LogInformation($"Game {game.Id} created: Code [{game.Code}]");
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
            return Ok(new EnterCodeResult(result, game));
        }

        [HttpPost]
        public IActionResult Create()
        {
            var game = _gameManager.NewGame();
            _logger.LogInformation($"Game {game.Id} created: Code [{game.Code}]");
            return CreatedAtAction("Get", new { id = game.Id }, new GameResult(game));
        }
    }
}