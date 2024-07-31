# Используем официальный образ .NET SDK для сборки приложения
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG configuration=Release
WORKDIR /src

# Копируем файлы проектов и восстанавливаем зависимости
COPY ["NetCoreRedis.Api/NetCoreRedis.Api.csproj", "."]
COPY ["NetCoreRedis.Infrastructure/NetCoreRedis.Infrastructure.csproj", "src/NetCoreRedis.Infrastructure/"]
RUN dotnet restore "NetCoreRedis.Api/NetCoreRedis.Api.csproj"

# Копируем остальные файлы и собираем приложение
COPY . .
WORKDIR "/src/NetCoreRedis.Api"
RUN dotnet build "NetCoreRedis.Api.csproj" -c $configuration -o /app/build

# Публикуем приложение
FROM build AS publish
ARG configuration=Release
RUN dotnet publish "NetCoreRedis.Api.csproj" -c $configuration -o /app/publish /p:UseAppHost=false

# Используем официальный образ .NET Runtime для запуска приложения
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5198

ENV ASPNETCORE_URLS=http://+:5198

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "NetCoreRedis.Api.dll"]
