const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const fs = require('fs');
const path = require('path');
const openapiSchemaParser = require('..');
const parser = require('@asyncapi/parser');

chai.use(chaiAsPromised);
const expect = chai.expect;

const inputWithOpenAPI = fs.readFileSync(path.resolve(__dirname, './asyncapi-openapi.yaml'), 'utf8');
const outputWithOpenAPI = '{"asyncapi":"2.0.0","info":{"title":"My API","version":"1.0.0"},"channels":{"mychannel":{"publish":{"message":{"payload":{"type":["object","null"],"properties":{"name":{"type":"string"},"discriminatorTest":{"discriminator":"objectType","oneOf":[{"type":"object","properties":{"objectType":{"type":"string"},"prop1":{"type":"string"}}},{"type":"object","properties":{"objectType":{"type":"string"},"prop2":{"type":"string"}}}]},"test":{"type":"object","properties":{"testing":{"type":"string"}}}},"examples":[{"name":"Fran"}],"x-parser-schema-id":"<anonymous-schema-1>"},"x-parser-original-schema-format":"application/vnd.oai.openapi;version=3.0.0","x-parser-original-payload":{"type":"object","nullable":true,"example":{"name":"Fran"},"properties":{"name":{"type":"string"},"discriminatorTest":{"discriminator":"objectType","oneOf":[{"type":"object","properties":{"objectType":{"type":"string"},"prop1":{"type":"string"}}},{"type":"object","properties":{"objectType":{"type":"string"},"prop2":{"type":"string"}}}]},"test":{"type":"object","properties":{"testing":{"type":"string"}}}},"x-parser-schema-id":"testSchema"},"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-name":"testMessage"}}}},"components":{"messages":{"testMessage":{"payload":{"type":["object","null"],"properties":{"name":{"type":"string"},"discriminatorTest":{"discriminator":"objectType","oneOf":[{"type":"object","properties":{"objectType":{"type":"string"},"prop1":{"type":"string"}}},{"type":"object","properties":{"objectType":{"type":"string"},"prop2":{"type":"string"}}}]},"test":{"type":"object","properties":{"testing":{"type":"string"}}}},"examples":[{"name":"Fran"}],"x-parser-schema-id":"<anonymous-schema-1>"},"x-parser-original-schema-format":"application/vnd.oai.openapi;version=3.0.0","x-parser-original-payload":{"type":"object","nullable":true,"example":{"name":"Fran"},"properties":{"name":{"type":"string"},"discriminatorTest":{"discriminator":"objectType","oneOf":[{"type":"object","properties":{"objectType":{"type":"string"},"prop1":{"type":"string"}}},{"type":"object","properties":{"objectType":{"type":"string"},"prop2":{"type":"string"}}}]},"test":{"type":"object","properties":{"testing":{"type":"string"}}}},"x-parser-schema-id":"testSchema"},"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-name":"testMessage"}},"schemas":{"testSchema":{"type":"object","nullable":true,"example":{"name":"Fran"},"properties":{"name":{"type":"string"},"discriminatorTest":{"discriminator":"objectType","oneOf":[{"type":"object","properties":{"objectType":{"type":"string"},"prop1":{"type":"string"}}},{"type":"object","properties":{"objectType":{"type":"string"},"prop2":{"type":"string"}}}]},"test":{"type":"object","properties":{"testing":{"type":"string"}}}},"x-parser-schema-id":"testSchema"}}}}';

parser.registerSchemaParser(openapiSchemaParser);

describe('parse()', function() {
  it('should parse OpenAPI schemas', async function() {
    const result = await parser.parse(inputWithOpenAPI, { path: __filename });
    await expect(JSON.stringify(result.json())).to.equal(outputWithOpenAPI);
  });
});
