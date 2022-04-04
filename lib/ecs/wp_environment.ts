import * as ssm from 'aws-cdk-lib/aws-ssm';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class WpEnvParams extends Construct {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id);

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

    // WORDPRESS_DB_HOST: ssm.StringParameter.fromStringParameterAttributes(this, 'DbHost', {
    //   parameterName: '/cms/db-resource-arn'
    // }).stringValue,
    let enviroment_vars = {};
    for (const param of params_list) {
      let param_name = `/cms/wp-${param.toLowerCase()}`;
      enviroment_vars[param] = ssm.StringParameter.fromStringParameterAttributes(this, param, {
        parameterName: param_name
      }).stringValue;

    }
    // const params_list.forEach(param) => {
    //   let param_name = `/cms/wp-${param.toLowerCase()}`;
    //   param: ssm.StringParameter.fromStringParameterAttributes(this, param, {
    //     parameterName: param_name
    //   }).stringValue
    // }

  }

}