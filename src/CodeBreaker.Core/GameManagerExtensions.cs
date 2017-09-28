namespace CodeBreaker.Core
{
    public static class GameManagerExtensions
    {
        public static Game NewGame(this IGameManager gameManager)
        {
            return gameManager.NewGame(GameOptions.Default);
        }
    }
}