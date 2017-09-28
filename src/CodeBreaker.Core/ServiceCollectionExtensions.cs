using CodeBreaker.Core;
using CodeBreaker.Core.Storage;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddCodeBreaker(this IServiceCollection collection)
        {
            return collection
                .AddTransient<IGameManager, GameManager>()
                .AddSingleton<IGameStateStore, InMemoryGameStateStore>();
        }
    }
}