using CodeBreaker.Core.Storage;
using CodeBreaker.WebApp.Storage;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddStorage(this IServiceCollection services)
        {
            return services.AddTransient<IScoreStore, ScoreStore>();
        }
    }
}