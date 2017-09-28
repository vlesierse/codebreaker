FROM microsoft/dotnet:2.0-runtime

WORKDIR /app
COPY ./out/ /app

ENTRYPOINT ["dotnet", "CodeBreaker.WebApp.dll"]