using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CodeBreaker.Core;
using CodeBreaker.Core.Storage;
using Microsoft.EntityFrameworkCore;

namespace CodeBreaker.WebApp.Storage
{
    public class ScoreStore : IScoreStore
    {
        private readonly CodeBreakerDbContext _dbContext;
        public ScoreStore(CodeBreakerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Score[]> GetScores(int page, int size)
        {
            var scores =  await _dbContext.Scores.ToListAsync();
            return scores
                .OrderBy(s => s.Attempts)
                .ThenBy(s => s.Duration)
                .Skip(page * size).Take(size)
                .ToArray();
        }

        public async Task SaveScore(Score score)
        {
            await _dbContext.Scores.AddAsync(score);
            await _dbContext.SaveChangesAsync();
        }

        public Task<bool> ScoreExists(Guid gameId)
        {
           return _dbContext.Scores.AnyAsync(s => s.GameId == gameId);
        }
    }
}