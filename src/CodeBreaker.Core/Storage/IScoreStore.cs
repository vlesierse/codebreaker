using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CodeBreaker.Core.Storage
{
    public interface IScoreStore
    {
        Task<Score[]> GetScores(int page, int size);
        Task SaveScore(Score score);
        Task<bool> ScoreExists(Guid gameId);
    }
}