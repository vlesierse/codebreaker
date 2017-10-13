using System;
using System.Linq;
using System.Threading.Tasks;
using CodeBreaker.Core;
using CodeBreaker.Core.Storage;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CodeBreaker.WebApp.Controllers
{
    [Route("api/[controller]")]
    public class ScoresController : Controller
    {
        private readonly ILogger _logger;
        private readonly IScoreStore _scoreStore;
        private readonly IGameManager _gameManager;

        public ScoresController(IGameManager gameManager, IScoreStore scoreStore, ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<ScoresController>();
            _gameManager = gameManager;
            _scoreStore = scoreStore;
        }

        [HttpGet]
        public async Task<IActionResult> ListScores(int page = 0, int size = 10)
        {
            return Ok(await _scoreStore.GetScores(page, size));
            //return Ok(Enumerable.Empty<Score>());
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> Register(Guid id, [FromBody] string name)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (await _scoreStore.ScoreExists(id))
            {
                return BadRequest();
            }
            var game = _gameManager.LoadGame(id);
            if (game == null)
            {
                return NotFound();
            }
            game.Score.Name = name;
            await _scoreStore.SaveScore(game.Score);
            _logger.LogInformation($"Registered {name} for game {game}");
            return Accepted();
        }
    }
}