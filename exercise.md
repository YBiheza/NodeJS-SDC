+ Create a fastify application for a pizza production backend service;
+ Create a healthcheck controller that returns 'OK' text response;
+ Create pizza ingredients stock management controller that receives request with a       body that provides details of a received ingredient shipment
+ Implement validation for the request body, using one of the following:
    Built-in Fastify validator;
    Zod;
    fastify-typeprovider-zod -> BONUS POINTS;
    fastify-api-contracts -> BONUS POINTS.
+ Implement an automated test (see USEFUL_REFERENCES.md for some tips) that makes requests to the stock management endpoint, cover the following scenarios:
    400 response to an invalid request;
    200 response to a valid request;