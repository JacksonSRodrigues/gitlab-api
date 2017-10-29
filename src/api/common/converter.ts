export namespace REST {
  export namespace QueryParam {
    export function join(params: string[]) {
      return params.filter(value => value != undefined).join('&');
    }

    export function createQuery(key: string, value: string): string {
      return (value) ? `${key}=${value}` : undefined;
    }
  }
}