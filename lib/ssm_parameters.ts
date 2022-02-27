import * as cdk from 'aws-cdk-lib';
import * as crypto from 'crypto';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';



export class SsmParameters extends Construct {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {

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

    params_list.forEach((param) => {
      let secret_value = Math.random().toString(36).substring(0, 5);
      let description = `Value for ${param.toLowerCase()}`;
      let param_name = `/cms/wp-${param.toLowerCase()}`;
      let hasher = crypto.createHmac("md5", secret_value);
      let value = hasher.update(description).digest("hex");

      new ssm.StringParameter(this, param, {
        parameterName: param_name,
        stringValue: value.toString(),
        description: description,
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

// $values['salt'] = hash_hmac('md5', $scheme, $values['key']);
//     // }
// * hash_hmac( 'md5', $scheme, $values['key'] )
// WORDPRESS_DB_HOST = db: 3306
// WORDPRESS_DB_USER = wordpress
// WORDPRESS_DB_PASSWORD = wordpress
// WORDPRESS_DB_NAME = wordpress
// AUTH_KEY = c3def60d6b870cb9ddfd5a37e5cc4cb2
// SECURE_AUTH_KEY = a8ee42c175b2b516d1f81ff992db030b
// LOGGED_IN_KEY = bcedc450f8481e89b1445069acdc3dd9
// NONCE_KEY = cb584e44c43ed6bd0bc2d9c7e242837d
// AUTH_SALT = 22b938073218c4d8f0f10a3d36d352b8
// SECURE_AUTH_SALT = 4e3baa46296d1358ea19f237ee1a5d19
// LOGGED_IN_SALT = 1321b53ca4bc07e4d53fa198e59af3e7
// NONCE_SALT = 283a64ff44db59568cc77dba8196046b
// MY_KEY = 5931acc50be4d738a0f530dc4709d156
// WP_DEBUG = true
// WP_MULTISITE = false
// MYSQL_ROOT_PASSWORD = wordpress
// MYSQL_DATABASE = wordpress
// MYSQL_USER = wordpress
// MYSQL_PASSWORD = wordpress