FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
# Setup NodeJs
RUN apt-get update -qq && \
    apt-get install -qq -y wget && \
    apt-get install -qq -y gnupg2 && \
    wget -qO- https://deb.nodesource.com/setup_8.x | bash - && \
    apt-get install -qq -y build-essential nodejs && \
    apt-get install -qq -y nginx
# End setup

WORKDIR /app

EXPOSE 5050

FROM microsoft/dotnet:2.2-sdk AS build
# Setup NodeJs
RUN apt-get update -qq && \
    apt-get install -qq -y wget && \
    apt-get install -qq -y gnupg2 && \
    wget -qO- https://deb.nodesource.com/setup_8.x | bash - && \
    apt-get install -qq -y build-essential nodejs && \
    apt-get install -qq -y nginx
# End setup

WORKDIR /src
COPY ["src/CodeBreaker.Core/CodeBreaker.Core.csproj", "src/CodeBreaker.Core/"]
COPY ["src/CodeBreaker.WebApp/CodeBreaker.WebApp.csproj", "src/CodeBreaker.WebApp/"]

RUN dotnet restore "src/CodeBreaker.WebApp/CodeBreaker.WebApp.csproj"
COPY ["src/CodeBreaker.WebApp/package.json", "src/CodeBreaker.WebApp/"]

RUN npm i --silent --prefix src/CodeBreaker.WebApp

COPY . .
RUN dotnet build "src/CodeBreaker.WebApp/CodeBreaker.WebApp.csproj" -c Release -o /app

FROM build AS publish

RUN dotnet publish "src/CodeBreaker.WebApp/CodeBreaker.WebApp.csproj" -c Release -o /app

FROM base

WORKDIR /app
COPY --from=publish /app .

ENTRYPOINT [ "dotnet", "CodeBreaker.WebApp.dll" ]