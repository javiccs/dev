/*
 * Copyright 2010-2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

var apigClientFactory = {};
apigClientFactory.newClient = function (config) {
    var apigClient = { };
    if(config === undefined) {
        config = {
            accessKey: '',
            secretKey: '',
            sessionToken: '',
            region: '',
            apiKey: undefined,
            defaultContentType: 'application/json',
            defaultAcceptType: 'application/json'
        };
    }
    if(config.accessKey === undefined) {
        config.accessKey = '';
    }
    if(config.secretKey === undefined) {
        config.secretKey = '';
    }
    if(config.apiKey === undefined) {
        config.apiKey = '';
    }
    if(config.sessionToken === undefined) {
        config.sessionToken = '';
    }
    if(config.region === undefined) {
        config.region = 'us-east-1';
    }
    //If defaultContentType is not defined then default to application/json
    if(config.defaultContentType === undefined) {
        config.defaultContentType = 'application/json';
    }
    //If defaultAcceptType is not defined then default to application/json
    if(config.defaultAcceptType === undefined) {
        config.defaultAcceptType = 'application/json';
    }

    
    // extract endpoint and path from url
    var invokeUrl = 'https://0ar8mfv57a.execute-api.us-east-1.amazonaws.com/dev';
    var endpoint = /(^https?:\/\/[^\/]+)/g.exec(invokeUrl)[1];
    var pathComponent = invokeUrl.substring(endpoint.length);

    var sigV4ClientConfig = {
        accessKey: config.accessKey,
        secretKey: config.secretKey,
        sessionToken: config.sessionToken,
        serviceName: 'execute-api',
        region: config.region,
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var authType = 'NONE';
    if (sigV4ClientConfig.accessKey !== undefined && sigV4ClientConfig.accessKey !== '' && sigV4ClientConfig.secretKey !== undefined && sigV4ClientConfig.secretKey !== '') {
        authType = 'AWS_IAM';
    }

    var simpleHttpClientConfig = {
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var apiGatewayClient = apiGateway.core.apiGatewayClientFactory.newClient(simpleHttpClientConfig, sigV4ClientConfig);
    
    
    
    apigClient.accountsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var accountsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/accounts').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(accountsGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.accountsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var accountsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/accounts').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(accountsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.aclGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var aclGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/acl').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(aclGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.aclPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var aclPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/acl').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(aclPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.aclOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var aclOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/acl').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(aclOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.aclMerchantMerchantIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['merchantId', 'posId'], ['body']);
        
        var aclMerchantMerchantIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/acl/merchant/{merchantId}').expand(apiGateway.core.utils.parseParametersToObject(params, ['merchantId', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['posId']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(aclMerchantMerchantIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.aclMerchantMerchantIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var aclMerchantMerchantIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/acl/merchant/{merchantId}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(aclMerchantMerchantIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.aclAclIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['aclId'], ['body']);
        
        var aclAclIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/acl/{aclId}').expand(apiGateway.core.utils.parseParametersToObject(params, ['aclId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(aclAclIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.aclAclIdPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['aclId'], ['body']);
        
        var aclAclIdPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/acl/{aclId}').expand(apiGateway.core.utils.parseParametersToObject(params, ['aclId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(aclAclIdPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.aclAclIdDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['aclId'], ['body']);
        
        var aclAclIdDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/acl/{aclId}').expand(apiGateway.core.utils.parseParametersToObject(params, ['aclId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(aclAclIdDeleteRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.aclAclIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var aclAclIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/acl/{aclId}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(aclAclIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.appsettingsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var appsettingsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/appsettings').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(appsettingsGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.appsettingsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var appsettingsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/appsettings').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(appsettingsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.balanceGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var balanceGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/balance').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(balanceGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.balanceOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var balanceOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/balance').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(balanceOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.contactsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['body', 'filter', 'limit'], ['body']);
        
        var contactsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/contacts').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['filter', 'limit']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(contactsGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.contactsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var contactsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/contacts').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(contactsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.credentialsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var credentialsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/credentials').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(credentialsGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.credentialsPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['body'], ['body']);
        
        var credentialsPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/credentials').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(credentialsPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.credentialsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var credentialsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/credentials').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(credentialsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.credentialsCredentialIdPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['credentialId', 'body'], ['body']);
        
        var credentialsCredentialIdPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/credentials/{credentialId}').expand(apiGateway.core.utils.parseParametersToObject(params, ['credentialId', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(credentialsCredentialIdPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.credentialsCredentialIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var credentialsCredentialIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/credentials/{credentialId}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(credentialsCredentialIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.depositclaimGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var depositclaimGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/depositclaim').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(depositclaimGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.depositclaimPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var depositclaimPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/depositclaim').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(depositclaimPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.depositclaimOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var depositclaimOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/depositclaim').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(depositclaimOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.depositclaimDepositclaimidGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['bank', 'redeemCode'], ['body']);
        
        var depositclaimDepositclaimidGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/depositclaim/depositclaimid').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['bank', 'redeemCode']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(depositclaimDepositclaimidGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.depositclaimDepositclaimidOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var depositclaimDepositclaimidOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/depositclaim/depositclaimid').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(depositclaimDepositclaimidOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.depositclaimsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var depositclaimsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/depositclaims').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(depositclaimsGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.depositclaimsPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var depositclaimsPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/depositclaims').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(depositclaimsPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.depositclaimsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var depositclaimsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/depositclaims').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(depositclaimsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.messagesGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['type'], ['body']);
        
        var messagesGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/messages').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['type']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(messagesGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.messagesPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var messagesPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/messages').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(messagesPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.messagesOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var messagesOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/messages').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(messagesOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.messagesMessageIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['messageId'], ['body']);
        
        var messagesMessageIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/messages/{messageId}').expand(apiGateway.core.utils.parseParametersToObject(params, ['messageId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(messagesMessageIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.messagesMessageIdPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['messageId'], ['body']);
        
        var messagesMessageIdPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/messages/{messageId}').expand(apiGateway.core.utils.parseParametersToObject(params, ['messageId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(messagesMessageIdPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.messagesMessageIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var messagesMessageIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/messages/{messageId}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(messagesMessageIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.ordersGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var ordersGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/orders').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(ordersGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.ordersPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['body'], ['body']);
        
        var ordersPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/orders').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(ordersPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.ordersOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var ordersOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/orders').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(ordersOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.ordersPaymentPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['body'], ['body']);
        
        var ordersPaymentPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/orders/payment').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(ordersPaymentPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.ordersPaymentOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var ordersPaymentOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/orders/payment').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(ordersPaymentOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.ordersOrderIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orderId'], ['body']);
        
        var ordersOrderIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/orders/{orderId}').expand(apiGateway.core.utils.parseParametersToObject(params, ['orderId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(ordersOrderIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.ordersOrderIdPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orderId', 'body'], ['body']);
        
        var ordersOrderIdPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/orders/{orderId}').expand(apiGateway.core.utils.parseParametersToObject(params, ['orderId', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(ordersOrderIdPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.ordersOrderIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var ordersOrderIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/orders/{orderId}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(ordersOrderIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.productsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var productsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/products').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(productsGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.productsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var productsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/products').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(productsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.productsProductIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['productId'], ['body']);
        
        var productsProductIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/products/{productId}').expand(apiGateway.core.utils.parseParametersToObject(params, ['productId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(productsProductIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.productsProductIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var productsProductIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/products/{productId}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(productsProductIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.settingsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['appType'], ['body']);
        
        var settingsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/settings').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['appType']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(settingsGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.settingsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var settingsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/settings').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(settingsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.transactionTicketsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['body'], ['body']);
        
        var transactionTicketsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/transactionTickets').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(transactionTicketsGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.transactionTicketsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var transactionTicketsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/transactionTickets').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(transactionTicketsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.transactioncashoutPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var transactioncashoutPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/transactioncashout').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(transactioncashoutPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.transactioncashoutOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var transactioncashoutOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/transactioncashout').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(transactioncashoutOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.transactioncitypagosPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var transactioncitypagosPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/transactioncitypagos').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(transactioncitypagosPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.transactioncitypagosOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var transactioncitypagosOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/transactioncitypagos').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(transactioncitypagosOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.transactionpinsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var transactionpinsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/transactionpins').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(transactionpinsGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.transactionpinsPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var transactionpinsPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/transactionpins').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(transactionpinsPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.transactionpinsPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var transactionpinsPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/transactionpins').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(transactionpinsPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.transactionpinsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var transactionpinsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/transactionpins').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(transactionpinsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.transactionsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var transactionsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/transactions').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(transactionsGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.transactionsPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['body'], ['body']);
        
        var transactionsPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/transactions').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(transactionsPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.transactionsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var transactionsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/transactions').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(transactionsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.transactionsTransactionIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['transactionId'], ['body']);
        
        var transactionsTransactionIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/transactions/{transactionId}').expand(apiGateway.core.utils.parseParametersToObject(params, ['transactionId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(transactionsTransactionIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.transactionsTransactionIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var transactionsTransactionIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/transactions/{transactionId}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(transactionsTransactionIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.transactionsettingsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var transactionsettingsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/transactionsettings').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(transactionsettingsGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.transactionsettingsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var transactionsettingsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/transactionsettings').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(transactionsettingsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.transactiontoolsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var transactiontoolsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/transactiontools').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(transactiontoolsGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.transactiontoolsPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['body'], ['body']);
        
        var transactiontoolsPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/transactiontools').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(transactiontoolsPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.transactiontoolsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var transactiontoolsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/transactiontools').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(transactiontoolsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.transactiontoolsTransactiontoolIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['transactiontoolId'], ['body']);
        
        var transactiontoolsTransactiontoolIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/transactiontools/{transactiontoolId}').expand(apiGateway.core.utils.parseParametersToObject(params, ['transactiontoolId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(transactiontoolsTransactiontoolIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.transactiontoolsTransactiontoolIdPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['transactiontoolId', 'body'], ['body']);
        
        var transactiontoolsTransactiontoolIdPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/transactiontools/{transactiontoolId}').expand(apiGateway.core.utils.parseParametersToObject(params, ['transactiontoolId', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(transactiontoolsTransactiontoolIdPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.transactiontoolsTransactiontoolIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var transactiontoolsTransactiontoolIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/transactiontools/{transactiontoolId}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(transactiontoolsTransactiontoolIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    

    return apigClient;
};
