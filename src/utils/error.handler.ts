export class GenericErrorHandler {
  constructor(error: Error) {
    const apiResponseHeader = {
      'Content-Type': 'application/json',
      'X-Requested-With': '*',
      'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST,GET,OPTIONS,PUT',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '-1',
    };
    let statusCode: number;
    let body = error.message || null;
    if (error.message.includes('Bad Request')) {
      statusCode = 400;
    } else if (error.message.toLowerCase().includes('validation failed')) {
      statusCode = 400;
      body = `Bad Request. Invalid .`;
    } else if (error.message === 'Unauthorized') {
      statusCode = 401;
    } else if (error.message === 'Not Found') {
      statusCode = 404;
    } else if (error.message.indexOf('409') > -1) {
      statusCode = 409;
    } else if (error.message === 'Internal Error') {
      statusCode = 500;
    } else if (error.message.indexOf('422') > -1) {
      statusCode = 422;
      body = error.message;
    } else {
      console.error('Unhandled error', error);
      statusCode = 500;
    }
    return {
      statusCode: statusCode,
      body: JSON.stringify(body),
      headers: apiResponseHeader,
    };
  }
}
