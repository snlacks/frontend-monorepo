export const templateArgs = (template: string[], ...keys: number[]) => {
  return (...values: (string)[]) => {
    const result = [template[0]];

    keys.forEach((key, i) => {
      result.push(values[key], template[i + 1])
    })
    return result.join('')
  }
}
/**
 * Example Usage:
 * const textMessage = templateArgs`Hello, ${0}!`
 * textMessage('Falcon')
 * // 'Hello, Falcon!'
 *
 *
 * const textMessage2 = templateArgs`${1} - ${0}`
 * textMessage2('Iceman', 'Falcon')
 * // 'Falcon - Iceman'
 */

export const templateDictionary = <T extends Record<string, string>>(template: string[], ...keys: (keyof T)[]) => {
  return (dictionary: T) => {
    const result = [template[0]];

    keys.forEach((key, i) => {
      result.push(dictionary[key], template[i + 1])
    })
    return result.join('')
  }
}
/**
 * Example Usage:
 * const textMessage = templateArgs`Hello, ${'first'}!`
 * textMessage({ first: 'Steven' })
 * // 'Hello, Steven!'
 *
 * const textMessage2 = templateArgs`${'champion'} - ${'challenger'}`
 * textMessage({ challenger: 'Falcon', champion: 'Iceman' })
 * // 'Iceman - Falcon'
 */
