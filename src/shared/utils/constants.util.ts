export class ConstantsUtil {
  public static getConstraintValue(field: string, constraint: string): string {
    const values = {
      'password.minLength': '8',
      'password.maxLength': '100',
      'email.maxLength': '50',
      'name.maxLength': '20',
      'name.minLength': '2',
      'last_name.maxLength': '20',
      'last_name.minLength': '2',
      'token_fcm.maxLength': '150',
      'code.isLength': '6',
      'current_password.minLength': '8',
      'current_password.maxLength': '150',
      'newPassword.minLength': '8',
      'newPassword.maxLength': '150',
      'phone.max': '999999999',
      'phone.min': '100000000',
      'limit.min': '1',
      'page.min': '1',
    }
    const key = `${field.toLowerCase().trim()}.${constraint.trim()}`;
    return values[key] || '';
  };
}