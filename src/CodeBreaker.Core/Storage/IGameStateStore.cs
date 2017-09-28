using System;

namespace CodeBreaker.Core.Storage
{
    public interface IGameStateStore
    {
         Game GetGameById(Guid id);
         Game AddGame(Game game);
    }
}