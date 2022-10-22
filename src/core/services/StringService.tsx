import classnames, { Argument } from 'classnames'

export default class StringService {
    static logicConcat(...args: Argument[]): string {
        return classnames(...args)
    }
}
