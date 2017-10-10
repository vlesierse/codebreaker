FROM microsoft/aspnetcore:2.0

WORKDIR /app
COPY ./out/ .
COPY start.sh .

ENTRYPOINT ["./start.sh"]