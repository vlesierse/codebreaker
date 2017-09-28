using System;

namespace CodeBreaker.Core
{
    public interface IGameManager
    {
        Game NewGame(GameOptions options);
        Game LoadGame(Guid id);
        Game SaveGame(Game game);
    }
}