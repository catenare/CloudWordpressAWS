import { Stack, StackProps } from 'aws-cdk-lib';
import * as crypto from 'crypto';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';

export class CmsParamsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const params_list = [
      'AUTH_KEY',
      'SECURE_AUTH_KEY',
      'LOGGED_IN_KEY',
      'NONCE_KEY',
      'AUTH_SALT',
      'SECURE_AUTH_SALT',
      'LOGGED_IN_SALT',
      'NONCE_SALT',
      'MY_KEY'
    ];

    params_list.forEach((param) => {
      let secret_value = Math.random().toString(36).substring(0, 5);
      let description = `Value for ${param.toLowerCase()}`;
      let param_name = `/cms/wp-${param.toLowerCase()}`;
      let hasher = crypto.createHmac("md5", secret_value);
      let value = hasher.update(description).digest("hex");

      new ssm.StringParameter(this, param, {
        parameterName: param_name,
        stringValue: value.toString(),
        description: description
      });
    })

    new ssm.StringParameter(this, 'WP_Debug', {
      parameterName: '/cms/wp-debug',
      stringValue: 'false',
      description: 'Enable WordPress debugging mode'
    })

    new ssm.StringParameter(this, 'WP_MULTISITE', {
      parameterName: '/cms/wp-multisite',
      stringValue: 'false',
      description: 'Enable WordPress multisite mode'
    });
  }
}